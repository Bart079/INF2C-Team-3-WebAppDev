using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IItemHoldService
{
    Task<List<ItemHoldDto>> GetAllAsync();
    Task<ItemHoldDto?> GetByIdAsync(int id);
}