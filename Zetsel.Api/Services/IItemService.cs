using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemService
{
    Task<List<ItemDto>> GetAllAsync();
    Task<ItemDto?> GetByIdAsync(int id);
}