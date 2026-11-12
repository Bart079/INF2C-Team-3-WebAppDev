using Zetsel.Api.Dtos;

namespace Zetsel.Api.Services;

public interface IMemberService
{
    Task<List<MemberDto>> GetAllAsync();
    Task<MemberDto?> GetByIdAsync(int id);
    Task<MemberDto> CreateAsync(CreateMemberDto dto);
    Task<bool> DeleteAsync(int id);
    Task<MemberDto?> UpdateAsync(int id, UpdateMemberDto dto);
}
