using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(LineupId), nameof(MemberId), IsUnique = true)]
public class TastingScore : IEntity
{
    public int Id { get; set; }

    public int LineupId { get; set; }
    public TastingLineup Lineup { get; set; } = null!;

    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public int Points { get; set; }
    public string? Remark { get; set; }
}
