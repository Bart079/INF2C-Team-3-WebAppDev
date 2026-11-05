using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(TastingId), nameof(Position), IsUnique = true)]
[Index(nameof(TastingId), nameof(BeanId), IsUnique = true)]
public class TastingLineup : IEntity
{
    public int Id { get; set; }

    public int TastingId { get; set; }
    public Tasting Tasting { get; set; } = null!;

    public int BeanId { get; set; }
    public Bean Bean { get; set; } = null!;

    public int Position { get; set; }

    public ICollection<TastingScore> Scores { get; set; } = new List<TastingScore>();
}
