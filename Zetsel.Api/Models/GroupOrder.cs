namespace Zetsel.Api.Models;

public class GroupOrder : IEntity
{
    public int Id { get; set; }

    public int BeanId { get; set; }
    public Bean Bean { get; set; } = null!;

    public int StartedById { get; set; }
    public Member StartedBy { get; set; } = null!;

    public int MinimumGrams { get; set; }
    public DateOnly ClosingDate { get; set; }
    public string Status { get; set; } = "Open";

    // Het totaal aantal gram wordt berekend uit de shares, niet opgeslagen.
    public ICollection<OrderShare> OrderShares { get; set; } = new List<OrderShare>();
}
