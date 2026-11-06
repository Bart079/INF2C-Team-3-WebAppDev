namespace Zetsel.Api.Dtos;

public record TastingSignupDto
{
    public int Id { get; init; }
    public int TastingId { get; init; }
    public int MemberId { get; init; }
    public string Status { get; init; } = string.Empty;
    public DateTime SignedUpAt { get; init; }
}
public record CreateTastingSignupDto
{
    public int TastingId { get; init; } 
    public int MemberId { get; init; }
    public string Status { get; init; } = string.Empty;
    public DateTime SignedUpAt { get; init; }
}
public record UpdateTastingSignupDto
{
    public int TastingId { get; init; } 
    public int MemberId { get; init; }
    public string Status { get; init; } = string.Empty;
    public DateTime SignedUpAt { get; init; }
}