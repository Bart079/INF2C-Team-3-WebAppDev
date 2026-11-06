using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class ItemHoldService : IItemHoldService
{
    private readonly IRepository<ItemHold> _itemHolds;

    public ItemHoldService(IRepository<ItemHold> itemHolds)
    {
        _itemHolds = itemHolds;
    }

    public async Task<List<ItemHoldDto>> GetAllAsync()
    {
        var itemHolds = await _itemHolds.GetAllAsync();
        return itemHolds.Select(ToDto).ToList();
    }

    public async Task<ItemHoldDto?> GetByIdAsync(int id)
    {
        var itemHold = await _itemHolds.GetByIdAsync(id);
        return itemHold is null ? null : ToDto(itemHold);
    }

    private static ItemHoldDto ToDto(ItemHold itemHold) => new()
    {
        Id = itemHold.Id,
        ItemId = itemHold.ItemId,
        MemberId = itemHold.MemberId,
        StartedAt = itemHold.StartedAt,
        EndsAt = itemHold.EndsAt
    };
}