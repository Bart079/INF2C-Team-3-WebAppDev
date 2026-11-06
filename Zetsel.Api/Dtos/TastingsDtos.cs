namespace Zetsel.Api.Dtos;

public record TastingDto
{
    public int Id { get; init; }
    public int HostId { get; init; }
    public DateOnly Date { get; init; }
    public TimeOnly Time { get; init; }
    public int Capacity { get; init; }
    public bool Cancelled { get; init; }
    public string KeyStatus { get; init; } = string.Empty;
}
public record CreateTastingDto
{
    public int HostId { get; init; } 
    public DateOnly Date { get; init; }
    public TimeOnly Time { get; init; }
    public int Capacity { get; init; }
    public bool Cancelled { get; init; }
    public string KeyStatus { get; init; } = string.Empty;
}