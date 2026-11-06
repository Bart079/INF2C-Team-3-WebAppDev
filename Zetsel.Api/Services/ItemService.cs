using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class ItemService : IItemService
{
    private readonly IRepository<Item> _items;

    public ItemService(IRepository<Item> items)
    {
        _items = items;
    }

    public async Task<List<ItemDto>> GetAllAsync()
    {
        var items = await _items.GetAllAsync();
        return items.Select(ToDto).ToList();
    }

    public async Task<ItemDto?> GetByIdAsync(int id)
    {
        var item = await _items.GetByIdAsync(id);
        return item is null ? null : ToDto(item);
    }

    private static ItemDto ToDto(Item item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Kind = item.Kind,
        Condition = item.Condition,
        Status = item.Status,
        Brand = item.Brand,
        Description = item.Description, 
        Instructions = item.Instructions,
        Image = item.Image,
        IsOutOfService = item.IsOutOfService
    };
}
