
using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IGroupOrderService
{
    Task<List<GroupOrderDto>> GetAllAsync();
    Task<GroupOrderDto?> GetByIdAsync(int id);
}
