namespace Zetsel.Api.Dtos;

public record BeanDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Roaster { get; init; }= string.Empty;
    public string Origin { get; init; }= string.Empty;
    public string Roastlevel { get; init; }= string.Empty;
    public int Freshnessweeks { get; init; }
}