namespace Zetsel.Api.Dtos;

public record TastingScoreDto
{
    public int Id { get; init; }
    public int LineupId { get; init; }
    public int MemberId { get; init; }
    public int Points { get; init; }
    public string? Remark { get; init; }
}
public record CreateTastingScoreDto
{
    public int LineupId { get; init; } 
    public int MemberId { get; init; }
    public int Points { get; init; }
    public string? Remark { get; init; } = string.Empty;
}