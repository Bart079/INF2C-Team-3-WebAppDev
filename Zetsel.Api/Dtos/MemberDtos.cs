namespace Zetsel.Api.Dtos;

public record MemberDto
{
    public int Id { get; init; }
    public string Username { get; init; } = string.Empty;
    public bool IsCommittee { get; init; }
}

public record CreateMemberDto
{
    public string Title { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public bool IsCommittee { get; init; }
}

public record UpdateMemberDto
{
    public string Title { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public bool IsCommittee { get; init; }
}