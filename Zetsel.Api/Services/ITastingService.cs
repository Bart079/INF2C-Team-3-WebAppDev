using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface ITastingService
{
    Task<List<TastingDto>> GetAllAsync();
    Task<TastingDto?> GetByIdAsync(int id);
}
