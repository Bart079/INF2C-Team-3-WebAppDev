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

    private static ItemRequestDto ToDto(ItemRequest itemRequest) => new()
    {
        Id = itemRequest.Id,
        ItemId = itemRequest.ItemId,
        MemberId = itemRequest.MemberId,
        RequestedAt = itemRequest.RequestedAt,
        Status = itemRequest.Status
    };
}

