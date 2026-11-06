using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IGroupOrderService
{
    Task<List<GroupOrderDto>> GetAllAsync();
    Task<GroupOrderDto?> GetByIdAsync(int id);

    Task<GroupOrderDto> CreateAsync(CreateGroupOrderDto dto);
    Task<GroupOrderDto?> UpdateAsync(int id, UpdateGroupOrderDto dto);
    Task<bool> DeleteAsync(int id);
}
