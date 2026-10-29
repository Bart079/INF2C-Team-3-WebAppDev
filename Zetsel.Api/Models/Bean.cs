namespace Zetsel.Api.Models;

public class Bean : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Roaster { get; set; }= string.Empty;
    public string Origin { get; set; }= string.Empty;
    public string Roastlevel { get; set; }= string.Empty;
    public int Freshnessweeks { get; set; }
}