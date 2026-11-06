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
    public async Task<ItemHoldDto> CreateAsync(CreateItemHoldDto dto)
    {
        var itemHold = new ItemHold
        {
            ItemId = dto.ItemId,
            MemberId = dto.MemberId,
            StartedAt = dto.StartedAt,
            EndsAt = dto.EndsAt
        };

        _itemHolds.Add(itemHold);
        await _itemHolds.SaveChangesAsync();

        return ToDto(itemHold);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var itemHold = await _itemHolds.GetByIdAsync(id);
        if (itemHold is null) return false;

        _itemHolds.Delete(itemHold);
        await _itemHolds.SaveChangesAsync();

        return true;
    }

    public async Task<ItemHoldDto?> UpdateAsync(int id, UpdateItemHoldDto dto)
    {
        var itemHold = await _itemHolds.GetByIdAsync(id);
        if (itemHold is null) return null;

        itemHold.ItemId = dto.ItemId;
        itemHold.MemberId = dto.MemberId;
        itemHold.StartedAt = dto.StartedAt;
        itemHold.EndsAt = dto.EndsAt;
        await _itemHolds.SaveChangesAsync();
        return ToDto(itemHold);
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