using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IOrderShareService
{
    Task<List<OrderShareDto>> GetAllAsync();
    Task<OrderShareDto?> GetByIdAsync(int id);
}
