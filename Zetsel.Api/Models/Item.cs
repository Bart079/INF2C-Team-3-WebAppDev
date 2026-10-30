namespace Zetsel.Api.Models;

public class Item : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Kind { get; set; } = string.Empty;
    public string Condition { get; set; } = string.Empty;
    public string? Brand { get; set; }
    public string? Description { get; set; }
    public string? Instructions { get; set; }
    public string? Image { get; set; }
    public bool IsOutOfService { get; set; } = false;

    public ICollection<ItemRequest> Requests { get; set; } = new List<ItemRequest>();
    public ICollection<ItemHold> Holds { get; set; } = new List<ItemHold>();
}
