using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class TastingService : ITastingService
{
    private readonly IRepository<Tasting> _tastings;

    public TastingService(IRepository<Tasting> tastings)
    {
        _tastings = tastings;
    }

    public async Task<List<TastingDto>> GetAllAsync()
    {
        var tastings = await _tastings.GetAllAsync();
        return tastings.Select(ToDto).ToList();
    }

    public async Task<TastingDto?> GetByIdAsync(int id)
    {
        var tasting = await _tastings.GetByIdAsync(id);
        return tasting is null ? null : ToDto(tasting);
    }

    public async Task<TastingDto> CreateAsync(CreateTastingDto dto)
    {
        var tasting = new Tasting
        {
            HostId = dto.HostId,
            Date = dto.Date,
            Time = dto.Time,
            Capacity = dto.Capacity,
            Cancelled = dto.Cancelled,
            KeyStatus = dto.KeyStatus
        };

        _tastings.Add(tasting);
        await _tastings.SaveChangesAsync();

        return ToDto(tasting);
    }

     public async Task<bool> DeleteAsync(int id)
    {
        var tasting = await _tastings.GetByIdAsync(id);
        if (tasting is null) return false;

        _tastings.Delete(tasting);
        await _tastings.SaveChangesAsync();

        return true;
    }
    public async Task<TastingDto?> UpdateAsync(int id, UpdateTastingDto dto)
    {
        var tasting = await _tastings.GetByIdAsync(id);
        if (tasting is null) return null;

        tasting.HostId = dto.HostId;
        tasting.Date = dto.Date;
        tasting.Time = dto.Time;
        tasting.Capacity = dto.Capacity;
        tasting.Cancelled = dto.Cancelled;
        tasting.KeyStatus = dto.KeyStatus;
        await _tastings.SaveChangesAsync();
        return ToDto(tasting);
    }
    private static TastingDto ToDto(Tasting tasting) => new()
    {
        Id = tasting.Id,
        HostId = tasting.HostId,
        Date = tasting.Date,
        Time = tasting.Time,
        Capacity = tasting.Capacity,
        Cancelled = tasting.Cancelled,
        KeyStatus = tasting.KeyStatus
    };
}
