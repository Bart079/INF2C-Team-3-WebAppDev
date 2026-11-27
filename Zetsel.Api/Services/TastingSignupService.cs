using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class TastingSignupService : ITastingSignupService
{
    private readonly IRepository<TastingSignup> _signups;
    private readonly IRepository<Tasting> _tastings;

    public TastingSignupService(
        IRepository<TastingSignup> signups,
        IRepository<Tasting> tastings)
    {
        _signups = signups;
        _tastings = tastings;
    }

    public async Task<List<TastingSignupDto>> GetAllAsync()
    {
        var signups = await _signups.GetAllAsync();
        var queuePositions = GetQueuePositions(signups);
        return signups
            .Select(signup => ToDto(
                signup,
                queuePositions.TryGetValue(signup.Id, out var position)
                    ? position
                    : null))
            .ToList();
    }

    public async Task<TastingSignupDto?> GetByIdAsync(int id)
    {
        var signup = await _signups.GetByIdAsync(id);
        if (signup is null)
        {
            return null;
        }

        var signups = await _signups.GetAllAsync();
        var queuePositions = GetQueuePositions(signups);
        return ToDto(
            signup,
            queuePositions.TryGetValue(signup.Id, out var position)
                ? position
                : null);
    }

    public async Task<TastingSignupDto?> CreateAsync(CreateTastingSignupDto dto)
    {
        var tasting = await _tastings.GetByIdAsync(dto.TastingId);
        if (tasting is null)
        {
            return null;
        }

        var signups = await _signups.GetAllAsync();
        var confirmedCount = signups.Count(signup =>
            signup.TastingId == dto.TastingId &&
            signup.Status == "confirmed");
        var waitingSignups = signups
            .Where(signup =>
                signup.TastingId == dto.TastingId &&
                signup.Status == "waiting")
            .ToList();
        var status = confirmedCount < tasting.Capacity && waitingSignups.Count == 0
            ? "confirmed"
            : "waiting";

        var signup = new TastingSignup
        {
            TastingId = dto.TastingId,
            MemberId = dto.MemberId,
            Status = status,
            SignedUpAt = DateTime.UtcNow
        };

        _signups.Add(signup);
        await _signups.SaveChangesAsync();

        return ToDto(
            signup,
            status == "waiting" ? waitingSignups.Count + 1 : null);
    }


     public async Task<bool> DeleteAsync(int id)
    {
        var signup = await _signups.GetByIdAsync(id);
        if (signup is null) return false;

        _signups.Delete(signup);
        await _signups.SaveChangesAsync();

        return true;
    }

    public async Task<TastingSignupDto?> UpdateAsync(int id, UpdateTastingSignupDto dto)
    {
        var signup = await _signups.GetByIdAsync(id);
        if (signup is null) return null;

        signup.TastingId = dto.TastingId;
        signup.MemberId = dto.MemberId;
        signup.Status = dto.Status;
        signup.SignedUpAt = dto.SignedUpAt;
        await _signups.SaveChangesAsync();

        var signups = await _signups.GetAllAsync();
        var queuePositions = GetQueuePositions(signups);
        return ToDto(
            signup,
            queuePositions.TryGetValue(signup.Id, out var position)
                ? position
                : null);
    }

    private static Dictionary<int, int> GetQueuePositions(
        IEnumerable<TastingSignup> signups)
        => signups
            .Where(signup => signup.Status == "waiting")
            .GroupBy(signup => signup.TastingId)
            .SelectMany(group => group
                .OrderBy(signup => signup.SignedUpAt)
                .ThenBy(signup => signup.Id)
                .Select((signup, index) => new
                {
                    signup.Id,
                    Position = index + 1
                }))
            .ToDictionary(entry => entry.Id, entry => entry.Position);

    private static TastingSignupDto ToDto(
        TastingSignup signup,
        int? queuePosition = null) => new()
    {
        Id = signup.Id,
        TastingId = signup.TastingId,
        MemberId = signup.MemberId,
        Status = signup.Status,
        SignedUpAt = signup.SignedUpAt,
        QueuePosition = queuePosition
    };
}
