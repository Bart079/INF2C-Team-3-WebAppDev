using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class TastingSignupService : ITastingSignupService
{
    private readonly IRepository<TastingSignup> _signups;

    public TastingSignupService(IRepository<TastingSignup> signups)
    {
        _signups = signups;
    }

    public async Task<List<TastingSignupDto>> GetAllAsync()
    {
        var signups = await _signups.GetAllAsync();
        return signups.Select(ToDto).ToList();
    }

    public async Task<TastingSignupDto?> GetByIdAsync(int id)
    {
        var signup = await _signups.GetByIdAsync(id);
        return signup is null ? null : ToDto(signup);
    }

    private static TastingSignupDto ToDto(TastingSignup signup) => new()
    {
        Id = signup.Id,
        TastingId = signup.TastingId,
        MemberId = signup.MemberId,
        Status = signup.Status,
        SignedUpAt = signup.SignedUpAt
    };
}
