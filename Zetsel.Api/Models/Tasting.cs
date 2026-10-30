namespace Zetsel.Api.Models;

public class Tasting : IEntity
{
    public int Id { get; set; }

    public int HostId { get; set; }
    public Member Host { get; set; } = null!;

    public DateOnly Date { get; set; }
    public TimeOnly Time { get; set; }
    public int Capacity { get; set; }
    public bool Cancelled { get; set; } = false;
    public string KeyStatus { get; set; } = "awaiting";

    public ICollection<TastingLineup> Lineups { get; set; } = new List<TastingLineup>();
    public ICollection<TastingSignup> Signups { get; set; } = new List<TastingSignup>();
}
