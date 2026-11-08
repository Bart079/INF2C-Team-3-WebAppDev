using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IBeanService
{
    Task<List<BeanDto>> GetAllAsync();
    Task<BeanDto?> GetByIdAsync(int id);
    Task<BeanDto> CreateAsync(CreateBeanDto dto);
    Task<bool> DeleteAsync(int id);
    Task<BeanDto?> UpdateAsync(int id, UpdateBeanDto dto);
}