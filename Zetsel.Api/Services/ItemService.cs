using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class ItemService : IItemService
{
    private readonly IRepository<Bean> _beans;

    public ItemService(IRepository<Bean> beans)
    {
        _beans = beans;
    }

    public async Task<List<ItemDto>> GetAllAsync()
    {
        var beans = await _beans.GetAllAsync();
        return beans.Select(ToDto).ToList();
    }

    public async Task<ItemDto?> GetByIdAsync(int id)
    {
        var bean = await _beans.GetByIdAsync(id);
        return bean is null ? null : ToDto(bean);
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
