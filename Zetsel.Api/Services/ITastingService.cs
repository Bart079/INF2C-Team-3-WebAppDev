using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface ITastingService
{
    Task<List<TastingDto>> GetAllAsync();
    Task<TastingDto?> GetByIdAsync(int id);
    Task<TastingDto> CreateAsync(CreateTastingDto dto);
    Task<bool> DeleteAsync(int id);
    Task<TastingDto?> UpdateAsync(int id, UpdateTastingDto dto);

}
