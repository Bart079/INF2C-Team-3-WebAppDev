namespace Zetsel.Api.Dtos;

public record ItemHoldDto
{
    public int Id { get; init; }
    public int ItemId { get; init; }

    public int MemberId { get; init; }
    public DateOnly StartedAt { get; init; }
    public DateOnly EndsAt { get; init; }
}
public record CreateItemHoldDto
{
    public int ItemId { get; init; }

    public int MemberId { get; init; }
    public DateOnly StartedAt { get; init; }
    public DateOnly EndsAt { get; init; }
}

public record UpdateItemHoldDto
{
    public int ItemId { get; init; }

    public int MemberId { get; init; }
    public DateOnly StartedAt { get; init; }
    public DateOnly EndsAt { get; init; }
}

