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
    
    public async Task<TastingLineupDto> CreateAsync(CreateTastingLineupDto dto)
    {
        var lineup = new TastingLineup
        {
            TastingId = dto.TastingId,
            BeanId = dto.BeanId,
            Position = dto.Position
        };

        _lineups.Add(lineup);
        await _lineups.SaveChangesAsync();

        return ToDto(lineup);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var lineup = await _lineups.GetByIdAsync(id);
        if (lineup is null) return false;

        _lineups.Delete(lineup);
        await _lineups.SaveChangesAsync();

        return true;
    }

    public async Task<TastingLineupDto?> UpdateAsync(int id, UpdateTastingLineupDto dto)
    {
        var lineup = await _lineups.GetByIdAsync(id);
        if (lineup is null) return null;

        lineup.TastingId = dto.TastingId;
        lineup.BeanId = dto.BeanId;
        lineup.Position = dto.Position;
        await _lineups.SaveChangesAsync();
        return ToDto(lineup);
    }


    internal static TastingLineupDto ToDto(TastingLineup lineup) => new()
    {
        Id = lineup.Id,
        TastingId = lineup.TastingId,
        BeanId = lineup.BeanId,
        Position = lineup.Position
    };
}
