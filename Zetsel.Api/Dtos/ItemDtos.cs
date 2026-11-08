namespace Zetsel.Api.Dtos;

public record ItemDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Kind { get; init; } = string.Empty;
    public string Condition { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public string? Brand { get; init; }
    public string? Description { get; init; }
    public string? Instructions { get; init; }
    public string? Image { get; init; }
    public bool IsOutOfService { get; init; } = false;
}

public record CreateItemDto
{
    public string Name { get; init; } = string.Empty;
    public string Kind { get; init; } = string.Empty;
    public string Condition { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public string? Brand { get; init; }
    public string? Description { get; init; }
    public string? Instructions { get; init; }
    public string? Image { get; init; }
    public bool IsOutOfService { get; init; } = false;
}

public record UpdateItemDto
{
    public string Name { get; init; } = string.Empty;
    public string Kind { get; init; } = string.Empty;
    public string Condition { get; init; } = string.Empty;
    public string Status { get; init; } = string.Empty;
    public string? Brand { get; init; }
    public string? Description { get; init; }
    public string? Instructions { get; init; }
    public string? Image { get; init; }
    public bool IsOutOfService { get; init; } = false;
}