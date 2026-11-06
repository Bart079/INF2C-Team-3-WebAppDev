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

    private static TastingScoreDto ToDto(TastingScore score) => new()
    {
        Id = score.Id,
        LineupId = score.LineupId,
        MemberId = score.MemberId,
        Points = score.Points,
        Remark = score.Remark
    };
}
