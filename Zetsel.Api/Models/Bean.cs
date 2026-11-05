using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(Roaster), nameof(Name), IsUnique = true)]
public class Bean : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Roaster { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string RoastLevel { get; set; } = string.Empty;
    public int FreshnessWeeks { get; set; }

    public ICollection<GroupOrder> GroupOrders { get; set; } = new List<GroupOrder>();
    public ICollection<TastingLineup> TastingLineups { get; set; } = new List<TastingLineup>();
}
