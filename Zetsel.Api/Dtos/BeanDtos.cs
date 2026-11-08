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

public record CreateBeanDto
{
    public string Name { get; init; } = string.Empty;
    public string Roaster { get; init; }= string.Empty;
    public string Origin { get; init; }= string.Empty;
    public string RoastLevel { get; init; }= string.Empty;
    public int FreshnessWeeks { get; init; }
}

public record UpdateBeanDto
{
    public string Name { get; init; } = string.Empty;
    public string Roaster { get; init; }= string.Empty;
    public string Origin { get; init; }= string.Empty;
    public string Roastlevel { get; init; }= string.Empty;
    public int Freshnessweeks { get; init; }
}