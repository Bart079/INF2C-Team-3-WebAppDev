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

    public async Task<ItemDto> CreateAsync(CreateItemDto dto)
    {
        var item = new Item
        {
            Name = dto.Name,
            Kind = dto.Kind,
            Condition = dto.Condition,
            Status = dto.Status,
            Brand = dto.Brand,
            Description = dto.Description,
            Instructions = dto.Instructions,
            Image = dto.Image,
            IsOutOfService = dto.IsOutOfService
        };

        _items.Add(item);
        await _items.SaveChangesAsync();

        return ToDto(item);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await _items.GetByIdAsync(id);
        if (item is null) return false;

        _items.Delete(item);
        await _items.SaveChangesAsync();

        return true;
    }

    public async Task<ItemDto?> UpdateAsync(int id, UpdateItemDto dto)
    {
        var item = await _items.GetByIdAsync(id);
        if (item is null) return null;

        item.Name = dto.Name;
        item.Kind = dto.Kind;
        item.Condition = dto.Condition;
        item.Status = dto.Status;
        item.Brand = dto.Brand;
        item.Description = dto.Description;
        item.Instructions = dto.Instructions;
        item.Image = dto.Image;
        item.IsOutOfService = dto.IsOutOfService;
        await _items.SaveChangesAsync();
        return ToDto(item);
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