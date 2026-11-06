using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface ITastingLineupService
{
    Task<List<TastingLineupDto>> GetAllAsync();
    Task<TastingLineupDto?> GetByIdAsync(int id);
}
