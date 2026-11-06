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
