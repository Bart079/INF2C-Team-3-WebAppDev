using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IOrderShareService
{
    Task<List<OrderShareDto>> GetAllAsync();
    Task<OrderShareDto?> GetByIdAsync(int id);

    Task<OrderShareDto> CreateAsync(CreateOrderShareDto dto);
    Task<OrderShareDto?> UpdateAsync(int id, UpdateOrderShareDto dto);
    Task<bool> DeleteAsync(int id);
}
