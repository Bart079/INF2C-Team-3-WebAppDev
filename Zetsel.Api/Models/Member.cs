using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Models;

[Index(nameof(Username), IsUnique = true)]
public class Member : IEntity
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public bool IsCommittee { get; set; } = false;
    public string? PasswordHash { get; set; }

    public ICollection<GroupOrder> StartedOrders { get; set; } = new List<GroupOrder>();
    public ICollection<OrderShare> OrderShares { get; set; } = new List<OrderShare>();
    public ICollection<Tasting> HostedTastings { get; set; } = new List<Tasting>();
    public ICollection<TastingSignup> TastingSignups { get; set; } = new List<TastingSignup>();
    public ICollection<TastingScore> TastingScores { get; set; } = new List<TastingScore>();
    public ICollection<ItemRequest> ItemRequests { get; set; } = new List<ItemRequest>();
    public ICollection<ItemHold> ItemHolds { get; set; } = new List<ItemHold>();
}
