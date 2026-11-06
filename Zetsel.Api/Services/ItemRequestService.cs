using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class ItemRequestService : IItemRequestService
{
    private readonly IRepository<ItemRequest> _itemRequests;

    public ItemRequestService(IRepository<ItemRequest> itemRequests)
    {
        _itemRequests = itemRequests;
    }

    public async Task<List<ItemRequestDto>> GetAllAsync()
    {
        var itemRequests = await _itemRequests.GetAllAsync();
        return itemRequests.Select(ToDto).ToList();
    }

    public async Task<ItemRequestDto?> GetByIdAsync(int id)
    {
        var itemRequest = await _itemRequests.GetByIdAsync(id);
        return itemRequest is null ? null : ToDto(itemRequest);
    }

    public async Task<ItemRequestDto> CreateAsync(CreateItemRequestDto dto)
    {
        var itemRequest = new ItemRequest
        {
            ItemId = dto.ItemId,
            MemberId = dto.MemberId,
            RequestedAt = dto.RequestedAt,
            Status = dto.Status
        };

        _itemRequests.Add(itemRequest);
        await _itemRequests.SaveChangesAsync();

        return ToDto(itemRequest);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var itemRequest = await _itemRequests.GetByIdAsync(id);
        if (itemRequest is null) return false;

        _itemRequests.Delete(itemRequest);
        await _itemRequests.SaveChangesAsync();

        return true;
    }

    public async Task<ItemRequestDto?> UpdateAsync(int id, UpdateItemRequestDto dto)
    {
        var itemRequest = await _itemRequests.GetByIdAsync(id);
        if (itemRequest is null) return null;

        itemRequest.ItemId = dto.ItemId;
        itemRequest.MemberId = dto.MemberId;
        itemRequest.RequestedAt = dto.RequestedAt;
        itemRequest.Status = dto.Status;
        await _itemRequests.SaveChangesAsync();
        return ToDto(itemRequest);
    }

    private static ItemRequestDto ToDto(ItemRequest itemRequest) => new()
    {
        Id = itemRequest.Id,
        ItemId = itemRequest.ItemId,
        MemberId = itemRequest.MemberId,
        RequestedAt = itemRequest.RequestedAt,
        Status = itemRequest.Status
    };
}

