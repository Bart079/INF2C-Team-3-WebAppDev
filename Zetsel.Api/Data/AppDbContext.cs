using Microsoft.EntityFrameworkCore;
using Zetsel.Api.Models;

namespace Zetsel.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    // Gedeelde tabellen
    public DbSet<Bean> Beans => Set<Bean>();
    public DbSet<Member> Members => Set<Member>();

    // Group Orders
    public DbSet<GroupOrder> GroupOrders => Set<GroupOrder>();
    public DbSet<OrderShare> OrderShares => Set<OrderShare>();

    // Tastings
    public DbSet<Tasting> Tastings => Set<Tasting>();
    public DbSet<TastingLineup> TastingLineups => Set<TastingLineup>();
    public DbSet<TastingSignup> TastingSignups => Set<TastingSignup>();
    public DbSet<TastingScore> TastingScores => Set<TastingScore>();

    // Grinders & Scales
    public DbSet<Item> Items => Set<Item>();
    public DbSet<ItemRequest> ItemRequests => Set<ItemRequest>();
    public DbSet<ItemHold> ItemHolds => Set<ItemHold>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Een item mag maar één actieve houder hebben
        modelBuilder.Entity<ItemHold>()
            .HasIndex(hold => hold.ItemId)
            .IsUnique()
            .HasFilter("\"EndedAt\" IS NULL");
    }
}
