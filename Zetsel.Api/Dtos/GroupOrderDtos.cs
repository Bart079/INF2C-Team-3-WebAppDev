namespace Zetsel.Api.Dtos;

// Gegevens die de API terugstuurt
public record GroupOrderDto
{
    public int Id { get; init; }
    public int BeanId { get; init; }
    public int StartedById { get; init; }
    public int MinimumGrams { get; init; }
    public DateOnly ClosingDate { get; init; }
    public string Status { get; init; } = string.Empty;
    public int TotalGrams { get; init; }
}

// Gegevens voor een nieuwe bestelling
public record CreateGroupOrderDto
{
    public int BeanId { get; init; }
    public int StartedById { get; init; }
    public int MinimumGrams { get; init; }
    public DateOnly ClosingDate { get; init; }
}

// Gegevens voor het aanpassen van een bestelling
public record UpdateGroupOrderDto
{
    public int MinimumGrams { get; init; }
    public DateOnly ClosingDate { get; init; }
}
