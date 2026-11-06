using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IMemberService
{
    Task<List<MemberDto>> GetAllAsync();
    Task<MemberDto?> GetByIdAsync(int id);
}
