using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemHoldService
{
    Task<List<ItemHoldDto>> GetAllAsync();
    Task<ItemHoldDto?> GetByIdAsync(int id);
    Task<ItemHoldDto> CreateAsync(CreateItemHoldDto dto);
    Task<bool> DeleteAsync(int id);
    Task<ItemHoldDto?> UpdateAsync(int id, UpdateItemHoldDto dto);
}