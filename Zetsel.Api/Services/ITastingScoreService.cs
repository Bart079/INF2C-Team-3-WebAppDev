using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface ITastingScoreService
{
    Task<List<TastingScoreDto>> GetAllAsync();
    Task<TastingScoreDto?> GetByIdAsync(int id);
    Task<TastingScoreDto> CreateAsync(CreateTastingScoreDto dto);
    Task<bool> DeleteAsync(int id);
    Task<TastingScoreDto?> UpdateAsync(int id, UpdateTastingScoreDto dto);

}
