namespace Zetsel.Api.Dtos;

public record TastingSignupDto
{
    public int Id { get; init; }
    public int TastingId { get; init; }
    public int MemberId { get; init; }
    public string Status { get; init; } = string.Empty;
    public DateTime SignedUpAt { get; init; }
}