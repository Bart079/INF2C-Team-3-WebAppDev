using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemService
{
    Task<List<ItemDto>> GetAllAsync();
    Task<ItemDto?> GetByIdAsync(int id);
    Task<ItemDto> CreateAsync(CreateItemDto dto);
    Task<bool> DeleteAsync(int id);
    Task<ItemDto?> UpdateAsync(int id, UpdateItemDto dto);
}