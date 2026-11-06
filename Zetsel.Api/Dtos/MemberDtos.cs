namespace Zetsel.Api.Dtos;

public record MemberDto
{
    public int Id { get; init; }
    public string Username { get; init; } = string.Empty;
    public bool IsCommittee { get; init; }
}
