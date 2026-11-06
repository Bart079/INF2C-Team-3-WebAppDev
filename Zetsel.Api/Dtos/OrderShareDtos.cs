namespace Zetsel.Api.Dtos;

// Gegevens die de API terugstuurt
public record OrderShareDto
{
    public int Id { get; init; }
    public int OrderId { get; init; }
    public int MemberId { get; init; }
    public int Grams { get; init; }
}

// Gegevens voor een nieuw share
public record CreateOrderShareDto
{
    public int OrderId { get; init; }
    public int MemberId { get; init; }
    public int Grams { get; init; }
}

// Gegevens voor het aanpassen van een share
public record UpdateOrderShareDto
{
    public int Grams { get; init; }
}
