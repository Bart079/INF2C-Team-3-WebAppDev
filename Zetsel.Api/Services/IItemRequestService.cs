using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemRequestService
{
    Task<List<ItemRequestDto>> GetAllAsync();
    Task<ItemRequestDto?> GetByIdAsync(int id);
    Task<ItemRequestDto> CreateAsync(CreateItemRequestDto dto);
    Task<bool> DeleteAsync(int id);
    Task<ItemRequestDto?> UpdateAsync(int id, UpdateItemRequestDto dto);
}