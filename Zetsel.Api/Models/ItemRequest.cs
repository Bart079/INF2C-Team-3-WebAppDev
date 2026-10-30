namespace Zetsel.Api.Models;

public class ItemRequest : IEntity
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public DateTime RequestedAt { get; set; } // Opslaan als UTC.
    public string Status { get; set; } = "Open";
}
