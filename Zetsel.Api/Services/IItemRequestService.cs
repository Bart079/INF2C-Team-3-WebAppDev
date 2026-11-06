using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemRequestService
{
    Task<List<ItemRequestDto>> GetAllAsync();
    Task<ItemRequestDto?> GetByIdAsync(int id);
}