namespace Zetsel.Api.Models;

public class ItemHold : IEntity
{
    public int Id { get; set; }

    public int ItemId { get; set; }
    public Item Item { get; set; } = null!;

    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public DateTime StartedAt { get; set; } // Opslaan als UTC.
    public DateTime? EndedAt { get; set; }  // null = nog in bezit.
}
