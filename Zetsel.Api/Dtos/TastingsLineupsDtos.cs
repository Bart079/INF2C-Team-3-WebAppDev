namespace Zetsel.Api.Dtos;

public record TastingLineupDto
{
    public int Id { get; init; }
    public int TastingId { get; init; }
    public int BeanId { get; init; }
    public int Position { get; init; }
}