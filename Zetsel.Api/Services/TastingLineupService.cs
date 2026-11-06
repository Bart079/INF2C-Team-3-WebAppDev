using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class TastingLineupService : ITastingLineupService
{
    private readonly IRepository<TastingLineup> _lineups;

    public TastingLineupService(IRepository<TastingLineup> lineups)
    {
        _lineups = lineups;
    }

    public async Task<List<TastingLineupDto>> GetAllAsync()
    {
        var lineups = await _lineups.GetAllAsync();
        return lineups.Select(ToDto).ToList();
    }

    public async Task<TastingLineupDto?> GetByIdAsync(int id)
    {
        var lineup = await _lineups.GetByIdAsync(id);
        return lineup is null ? null : ToDto(lineup);
    }

    internal static TastingLineupDto ToDto(TastingLineup lineup) => new()
    {
        Id = lineup.Id,
        TastingId = lineup.TastingId,
        BeanId = lineup.BeanId,
        Position = lineup.Position
    };
}
