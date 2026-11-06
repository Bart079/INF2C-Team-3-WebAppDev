using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class TastingScoreService : ITastingScoreService
{
    private readonly IRepository<TastingScore> _scores;

    public TastingScoreService(IRepository<TastingScore> scores)
    {
        _scores = scores;
    }

    public async Task<List<TastingScoreDto>> GetAllAsync()
    {
        var scores = await _scores.GetAllAsync();
        return scores.Select(ToDto).ToList();
    }

    public async Task<TastingScoreDto?> GetByIdAsync(int id)
    {
        var score = await _scores.GetByIdAsync(id);
        return score is null ? null : ToDto(score);
    }

    public async Task<TastingScoreDto> CreateAsync(CreateTastingScoreDto dto)
    {
        var score = new TastingScore
        {
            LineupId = dto.LineupId,
            MemberId = dto.MemberId,
            Points = dto.Points,
            Remark = dto.Remark
        };

        _scores.Add(score);
        await _scores.SaveChangesAsync();

        return ToDto(score);
    }


     public async Task<bool> DeleteAsync(int id)
    {
        var score = await _scores.GetByIdAsync(id);
        if (score is null) return false;

        _scores.Delete(score);
        await _scores.SaveChangesAsync();

        return true;
    }

    public async Task<TastingScoreDto?> UpdateAsync(int id, UpdateTastingScoreDto dto)
    {
        var score = await _scores.GetByIdAsync(id);
        if (score is null) return null;

        score.LineupId = dto.LineupId;
        score.MemberId = dto.MemberId;
        score.Points = dto.Points;
        score.Remark = dto.Remark;
        await _scores.SaveChangesAsync();
        return ToDto(score);
    }



    private static TastingScoreDto ToDto(TastingScore score) => new()
    {
        Id = score.Id,
        LineupId = score.LineupId,
        MemberId = score.MemberId,
        Points = score.Points,
        Remark = score.Remark
    };
}
