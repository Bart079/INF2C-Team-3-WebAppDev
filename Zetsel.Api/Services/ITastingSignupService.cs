using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface ITastingSignupService
{
    Task<List<TastingSignupDto>> GetAllAsync();
    Task<TastingSignupDto?> GetByIdAsync(int id);
}
