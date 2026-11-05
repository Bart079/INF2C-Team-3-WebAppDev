using Zetsel.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        var seedBeans = new[]
        {
            new Bean { Id = 1, Name = "Ethiopia Yirgacheffe", Roaster = "Hans", Origin = "Ethiopia", RoastLevel = "light", FreshnessWeeks = 3 },
            new Bean { Id = 2, Name = "Colombia Supremo", Roaster = "Herman", Origin = "Colombia", RoastLevel = "medium", FreshnessWeeks = 2 },
            new Bean { Id = 3, Name = "Kenya AA", Roaster = "Anne", Origin = "Kenya", RoastLevel = "medium", FreshnessWeeks = 5 },
            new Bean { Id = 4, Name = "Brazil Santos", Roaster = "Max", Origin = "Brazil", RoastLevel = "light", FreshnessWeeks = 3 },
            new Bean { Id = 5, Name = "Guatemala Antigua", Roaster = "Guatemala", Origin = "Guatemala", RoastLevel = "medium", FreshnessWeeks = 3 },
            new Bean { Id = 6, Name = "Costa Rica Tarrazú", Roaster = "Costa Rica", Origin = "Costa Rica", RoastLevel = "light", FreshnessWeeks = 3 },
            new Bean { Id = 7, Name = "Sumatra Mandheling", Roaster = "Sumatra", Origin = "Indonesia", RoastLevel = "dark", FreshnessWeeks = 3 }
        };
        var existingBeanIds = await context.Beans
            .Select(bean => bean.Id)
            .ToHashSetAsync();
        context.Beans.AddRange(seedBeans.Where(bean => !existingBeanIds.Contains(bean.Id)));

        if (!await context.Members.AnyAsync())
        {
            context.Members.AddRange(
                new Member { Id = 1, Username = "lid1" },
                new Member { Id = 2, Username = "lid2" },
                new Member { Id = 3, Username = "commissielid1", IsCommittee = true },
                new Member { Id = 4, Username = "commissielid2", IsCommittee = true },
                new Member { Id = 5, Username = "commissielid3", IsCommittee = true }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.Tastings.AnyAsync())
        {
            context.Tastings.AddRange(
            new Tasting { Id = 1, HostId = 1, Date = new DateOnly(2026, 10, 18), Time = new TimeOnly(19, 0), Capacity = 4, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 2, HostId = 1, Date = new DateOnly(2026, 10, 4), Time = new TimeOnly(19, 0), Capacity = 5, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 3, HostId = 2, Date = new DateOnly(2026, 10, 25), Time = new TimeOnly(15, 0), Capacity = 8, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 4, HostId = 1, Date = new DateOnly(2026, 11, 1), Time = new TimeOnly(19, 30), Capacity = 6, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 5, HostId = 2, Date = new DateOnly(2026, 11, 8), Time = new TimeOnly(14, 0), Capacity = 10, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 6, HostId = 1, Date = new DateOnly(2026, 11, 15), Time = new TimeOnly(19, 0), Capacity = 3, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 7, HostId = 2, Date = new DateOnly(2026, 11, 22), Time = new TimeOnly(15, 30), Capacity = 12, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 8, HostId = 1, Date = new DateOnly(2026, 12, 6), Time = new TimeOnly(19, 0), Capacity = 8, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 9, HostId = 2, Date = new DateOnly(2026, 12, 13), Time = new TimeOnly(14, 30), Capacity = 6, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 10, HostId = 1, Date = new DateOnly(2026, 12, 20), Time = new TimeOnly(19, 0), Capacity = 10, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 11, HostId = 1, Date = new DateOnly(2026, 10, 20), Time = new TimeOnly(19, 0), Capacity = 8, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 12, HostId = 2, Date = new DateOnly(2026, 11, 5), Time = new TimeOnly(19, 30), Capacity = 6, Cancelled = true, KeyStatus = "available" },
            new Tasting { Id = 13, HostId = 1, Date = new DateOnly(2026, 12, 1), Time = new TimeOnly(14, 0), Capacity = 10, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 14, HostId = 2, Date = new DateOnly(2027, 1, 10), Time = new TimeOnly(15, 0), Capacity = 5, Cancelled = true, KeyStatus = "available" }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.TastingLineups.AnyAsync())
        {
            context.TastingLineups.AddRange(
            new TastingLineup { TastingId = 1, BeanId = 1, Position = 1 },
            new TastingLineup { TastingId = 1, BeanId = 2, Position = 2 },
            new TastingLineup { TastingId = 1, BeanId = 3, Position = 3 },
            new TastingLineup { TastingId = 1, BeanId = 4, Position = 4 },
            new TastingLineup { TastingId = 2, BeanId = 2, Position = 1 },
            new TastingLineup { TastingId = 2, BeanId = 3, Position = 2 },
            new TastingLineup { TastingId = 2, BeanId = 5, Position = 3 },
            new TastingLineup { TastingId = 3, BeanId = 1, Position = 1 },
            new TastingLineup { TastingId = 3, BeanId = 5, Position = 2 },
            new TastingLineup { TastingId = 3, BeanId = 3, Position = 3 },
            new TastingLineup { TastingId = 3, BeanId = 2, Position = 4 },
            new TastingLineup { TastingId = 3, BeanId = 4, Position = 5 },
            new TastingLineup { TastingId = 4, BeanId = 4, Position = 1 },
            new TastingLineup { TastingId = 4, BeanId = 2, Position = 2 },
            new TastingLineup { TastingId = 4, BeanId = 5, Position = 3 },
            new TastingLineup { TastingId = 5, BeanId = 1, Position = 1 },
            new TastingLineup { TastingId = 5, BeanId = 3, Position = 2 },
            new TastingLineup { TastingId = 5, BeanId = 5, Position = 3 },
            new TastingLineup { TastingId = 5, BeanId = 4, Position = 4 },
            new TastingLineup { TastingId = 6, BeanId = 3, Position = 1 },
            new TastingLineup { TastingId = 6, BeanId = 4, Position = 2 },
            new TastingLineup { TastingId = 6, BeanId = 1, Position = 3 },
            new TastingLineup { TastingId = 6, BeanId = 5, Position = 4 },
            new TastingLineup { TastingId = 7, BeanId = 2, Position = 1 },
            new TastingLineup { TastingId = 7, BeanId = 1, Position = 2 },
            new TastingLineup { TastingId = 7, BeanId = 4, Position = 3 },
            new TastingLineup { TastingId = 7, BeanId = 3, Position = 4 },
            new TastingLineup { TastingId = 7, BeanId = 5, Position = 5 },
            new TastingLineup { TastingId = 8, BeanId = 5, Position = 1 },
            new TastingLineup { TastingId = 8, BeanId = 3, Position = 2 },
            new TastingLineup { TastingId = 8, BeanId = 2, Position = 3 },
            new TastingLineup { TastingId = 9, BeanId = 4, Position = 1 },
            new TastingLineup { TastingId = 9, BeanId = 1, Position = 2 },
            new TastingLineup { TastingId = 9, BeanId = 2, Position = 3 },
            new TastingLineup { TastingId = 9, BeanId = 5, Position = 4 },
            new TastingLineup { TastingId = 10, BeanId = 3, Position = 1 },
            new TastingLineup { TastingId = 10, BeanId = 5, Position = 2 },
            new TastingLineup { TastingId = 10, BeanId = 1, Position = 3 },
            new TastingLineup { TastingId = 10, BeanId = 4, Position = 4 },
            new TastingLineup { TastingId = 10, BeanId = 2, Position = 5 },
            new TastingLineup { TastingId = 11, BeanId = 1, Position = 1 },
            new TastingLineup { TastingId = 11, BeanId = 2, Position = 2 },
            new TastingLineup { TastingId = 11, BeanId = 5, Position = 3 },
            new TastingLineup { TastingId = 12, BeanId = 3, Position = 1 },
            new TastingLineup { TastingId = 12, BeanId = 4, Position = 2 },
            new TastingLineup { TastingId = 12, BeanId = 5, Position = 3 },
            new TastingLineup { TastingId = 12, BeanId = 1, Position = 4 },
            new TastingLineup { TastingId = 13, BeanId = 2, Position = 1 },
            new TastingLineup { TastingId = 13, BeanId = 4, Position = 2 },
            new TastingLineup { TastingId = 13, BeanId = 3, Position = 3 },
            new TastingLineup { TastingId = 14, BeanId = 5, Position = 1 },
            new TastingLineup { TastingId = 14, BeanId = 1, Position = 2 },
            new TastingLineup { TastingId = 14, BeanId = 3, Position = 3 },
            new TastingLineup { TastingId = 14, BeanId = 4, Position = 4 }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.TastingSignups.AnyAsync())
        {
            context.TastingSignups.AddRange(
            new TastingSignup { TastingId = 1, MemberId = 1, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = 2, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 10, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = 3, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 20, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = 4, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 30, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = 5, Status = "waiting", SignedUpAt = new DateTime(2026, 10, 10, 12, 40, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 2, MemberId = 2, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 1, 14, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 3, MemberId = 1, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 12, 10, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 3, MemberId = 3, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 12, 10, 15, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 3, MemberId = 4, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 12, 10, 30, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 4, MemberId = 2, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 15, 11, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 4, MemberId = 5, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 15, 11, 20, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 5, MemberId = 3, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 20, 9, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 5, MemberId = 4, Status = "waiting", SignedUpAt = new DateTime(2026, 10, 20, 9, 15, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 7, MemberId = 2, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 22, 13, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 9, MemberId = 5, Status = "confirmed", SignedUpAt = new DateTime(2026, 11, 1, 14, 0, 0, DateTimeKind.Utc) }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.TastingScores.AnyAsync())
        {
            context.TastingScores.AddRange(
            new TastingScore { LineupId = 5, MemberId = 2, Points = 8, Remark = "Smooth taste with a chocolate finish" },
            new TastingScore { LineupId = 6, MemberId = 2, Points = 7, Remark = "Fruity, but slightly too acidic" },
            new TastingScore { LineupId = 7, MemberId = 2, Points = 9, Remark = "Sweet aroma and a balanced flavour" },
            new TastingScore { LineupId = 5, MemberId = 1, Points = 9, Remark = "Sweet aroma with a fruity finish" },
            new TastingScore { LineupId = 5, MemberId = 3, Points = 7, Remark = "Good flavour, but a little bitter" },
            new TastingScore { LineupId = 5, MemberId = 4, Points = 8, Remark = "Well balanced and pleasant" },
            new TastingScore { LineupId = 6, MemberId = 1, Points = 8, Remark = "Fresh and fruity" },
            new TastingScore { LineupId = 6, MemberId = 3, Points = 6, Remark = "Too acidic for my taste" },
            new TastingScore { LineupId = 6, MemberId = 4, Points = 8, Remark = "Nice aroma and a clean finish" },
            new TastingScore { LineupId = 7, MemberId = 1, Points = 9, Remark = "Rich flavour and great aroma" },
            new TastingScore { LineupId = 7, MemberId = 3, Points = 8, Remark = "Smooth and slightly sweet" },
            new TastingScore { LineupId = 7, MemberId = 4, Points = 7, Remark = "Good coffee, but not very distinctive" },
            new TastingScore { LineupId = 5, MemberId = 5, Points = 8, Remark = "A pleasant coffee with a chocolate note" }
            );
        }
        await context.SaveChangesAsync();
    }
}
