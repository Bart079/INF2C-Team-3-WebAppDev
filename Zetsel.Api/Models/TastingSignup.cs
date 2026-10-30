using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(TastingId), nameof(MemberId), IsUnique = true)]
public class TastingSignup : IEntity
{
    public int Id { get; set; }

    public int TastingId { get; set; }
    public Tasting Tasting { get; set; } = null!;

    public int MemberId { get; set; }
    public Member Member { get; set; } = null!;

    public string Status { get; set; } = string.Empty; // confirmed / waiting
    public DateTime SignedUpAt { get; set; } // Opslaan als UTC.
}
