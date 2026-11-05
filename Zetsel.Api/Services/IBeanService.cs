using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IBeanService
{
    Task<List<BeanDto>> GetAllAsync();
    Task<BeanDto?> GetByIdAsync(int id);
}