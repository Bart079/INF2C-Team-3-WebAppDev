namespace Zetsel.Api.Dtos;

public record ItemRequestDto
{
    public int Id { get; init; }

    public int ItemId { get; init; }

    public int MemberId { get; init; }

    public DateTime RequestedAt { get; init; } // Opslaan als UTC.
    public string Status { get; init; } = "Open";
}