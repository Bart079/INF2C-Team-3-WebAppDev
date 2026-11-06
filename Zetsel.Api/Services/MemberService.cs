using Zetsel.Api.Dtos;
using Zetsel.Api.Models;
using Zetsel.Api.Repositories;

namespace Zetsel.Api.Services;

public class MemberService : IMemberService
{
    private readonly IRepository<Member> _members;

    public MemberService(IRepository<Member> members)
    {
        _members = members;
    }

    public async Task<List<MemberDto>> GetAllAsync()
    {
        var members = await _members.GetAllAsync();
        return members.Select(ToDto).ToList();
    }

    public async Task<MemberDto?> GetByIdAsync(int id)
    {
        var member = await _members.GetByIdAsync(id);
        return member is null ? null : ToDto(member);
    }

    private static MemberDto ToDto(Member member) => new()
    {
        Id = member.Id,
        Username = member.Username,
        IsCommittee = member.IsCommittee
    };
}
