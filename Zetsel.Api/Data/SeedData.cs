using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Zetsel.Api.Models;

namespace Zetsel.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // 1. Beans
        if (!await context.Beans.AnyAsync())
        {
            context.Beans.AddRange(
                new Bean { Name = "Ethiopia Yirgacheffe", Roaster = "Hans", Origin = "Ethiopia", RoastLevel = "light", FreshnessWeeks = 3 },
                new Bean { Name = "Colombia Supremo", Roaster = "Herman", Origin = "Colombia", RoastLevel = "medium", FreshnessWeeks = 2 },
                new Bean { Name = "Kenya AA", Roaster = "Anne", Origin = "Kenya", RoastLevel = "medium", FreshnessWeeks = 5 },
                new Bean { Name = "Brazil Santos", Roaster = "Max", Origin = "Brazil", RoastLevel = "light", FreshnessWeeks = 3 }
            );

            await context.SaveChangesAsync();
        }

        // 2. Members
        var passwordHasher = new PasswordHasher<Member>();

        var testMembers = new[]
        {
            new Member { Username = "Bart", IsCommittee = true },
            new Member { Username = "Jade", IsCommittee = false },
            new Member { Username = "Tabitha", IsCommittee = false }
        };

        foreach (var member in testMembers)
        {
            if (!await context.Members.AnyAsync(m => m.Username == member.Username))
            {
                member.PasswordHash = passwordHasher.HashPassword(
                    member,
                    "ZetselTest123!"
                );

                context.Members.Add(member);
            }
        }

        await context.SaveChangesAsync();

        // 3. Haal de benodigde Beans en Members op
        var bart = await context.Members
            .FirstAsync(m => m.Username == "Bart");

        var jade = await context.Members
            .FirstAsync(m => m.Username == "Jade");

        var tabitha = await context.Members
            .FirstAsync(m => m.Username == "Tabitha");

        var ethiopia = await context.Beans
            .FirstAsync(b => b.Name == "Ethiopia Yirgacheffe");

        var colombia = await context.Beans
            .FirstAsync(b => b.Name == "Colombia Supremo");

        var kenya = await context.Beans
            .FirstAsync(b => b.Name == "Kenya AA");
        var brazil = await context.Beans
            .FirstAsync(b => b.Name == "Brazil Santos");

        // 4. GroupOrders
        if (!await context.GroupOrders.AnyAsync())
        {
            context.GroupOrders.AddRange(
                new GroupOrder
                {
                    BeanId = ethiopia.Id,
                    StartedById = bart.Id,
                    MinimumGrams = 1000,
                    ClosingDate = new DateOnly(2026, 12, 1),
                    Status = "Open"
                },
                new GroupOrder
                {
                    BeanId = colombia.Id,
                    StartedById = jade.Id,
                    MinimumGrams = 500,
                    ClosingDate = new DateOnly(2026, 12, 15),
                    Status = "Open"
                },
                new GroupOrder
                {
                    BeanId = kenya.Id,
                    StartedById = tabitha.Id,
                    MinimumGrams = 750,
                    ClosingDate = new DateOnly(2026, 12, 20),
                    Status = "Open"
                }
            );

            await context.SaveChangesAsync();
        }


        // 5. OrderShares
        if (!await context.OrderShares.AnyAsync())
        {
            var orderEthiopia = await context.GroupOrders
                .FirstAsync(o => o.BeanId == ethiopia.Id);

            var orderColombia = await context.GroupOrders
                .FirstAsync(o => o.BeanId == colombia.Id);

            var orderKenya = await context.GroupOrders
                .FirstAsync(o => o.BeanId == kenya.Id);

            context.OrderShares.AddRange(
                new OrderShare
                {
                    OrderId = orderEthiopia.Id,
                    MemberId = bart.Id,
                    Grams = 300
                },
                new OrderShare
                {
                    OrderId = orderEthiopia.Id,
                    MemberId = jade.Id,
                    Grams = 250
                },
                new OrderShare
                {
                    OrderId = orderEthiopia.Id,
                    MemberId = tabitha.Id,
                    Grams = 200
                },
                new OrderShare
                {
                    OrderId = orderColombia.Id,
                    MemberId = jade.Id,
                    Grams = 200
                },
                new OrderShare
                {
                    OrderId = orderColombia.Id,
                    MemberId = bart.Id,
                    Grams = 150
                },
                new OrderShare
                {
                    OrderId = orderKenya.Id,
                    MemberId = tabitha.Id,
                    Grams = 400
                }
            );

            await context.SaveChangesAsync();
        }
        if (!await context.Tastings.AnyAsync())
        {
            context.Tastings.AddRange(
            new Tasting { Id = 1, HostId = bart.Id, Date = new DateOnly(2026, 10, 18), Time = new TimeOnly(19, 0), Capacity = 4, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 2, HostId = bart.Id, Date = new DateOnly(2026, 10, 4), Time = new TimeOnly(19, 0), Capacity = 5, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 3, HostId = jade.Id, Date = new DateOnly(2026, 10, 25), Time = new TimeOnly(15, 0), Capacity = 8, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 4, HostId = bart.Id, Date = new DateOnly(2026, 11, 1), Time = new TimeOnly(19, 30), Capacity = 6, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 5, HostId = jade.Id, Date = new DateOnly(2026, 11, 8), Time = new TimeOnly(14, 0), Capacity = 10, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 6, HostId = bart.Id, Date = new DateOnly(2026, 11, 15), Time = new TimeOnly(19, 0), Capacity = 3, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 7, HostId = jade.Id, Date = new DateOnly(2026, 11, 22), Time = new TimeOnly(15, 30), Capacity = 12, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 8, HostId = bart.Id, Date = new DateOnly(2026, 12, 6), Time = new TimeOnly(19, 0), Capacity = 8, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 9, HostId = jade.Id, Date = new DateOnly(2026, 12, 13), Time = new TimeOnly(14, 30), Capacity = 6, Cancelled = false, KeyStatus = "available" },
            new Tasting { Id = 10, HostId = bart.Id, Date = new DateOnly(2026, 12, 20), Time = new TimeOnly(19, 0), Capacity = 10, Cancelled = false, KeyStatus = "awaiting" },
            new Tasting { Id = 11, HostId = bart.Id, Date = new DateOnly(2026, 10, 20), Time = new TimeOnly(19, 0), Capacity = 8, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 12, HostId = jade.Id, Date = new DateOnly(2026, 11, 5), Time = new TimeOnly(19, 30), Capacity = 6, Cancelled = true, KeyStatus = "available" },
            new Tasting { Id = 13, HostId = bart.Id, Date = new DateOnly(2026, 12, 1), Time = new TimeOnly(14, 0), Capacity = 10, Cancelled = true, KeyStatus = "unavailable" },
            new Tasting { Id = 14, HostId = jade.Id, Date = new DateOnly(2027, 1, 10), Time = new TimeOnly(15, 0), Capacity = 5, Cancelled = true, KeyStatus = "available" }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.TastingLineups.AnyAsync())
        {
            var beanIds = new[] { ethiopia.Id, colombia.Id, kenya.Id, brazil.Id};
            var lineupSeed = new (int TastingId, int BeanNumber, int Position)[]
            {
                (1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4),
                (2, 2, 1), (2, 3, 2), (2, 5, 3),
                (3, 1, 1), (3, 5, 2), (3, 3, 3), (3, 2, 4), (3, 4, 5),
                (4, 4, 1), (4, 2, 2), (4, 5, 3),
                (5, 1, 1), (5, 3, 2), (5, 5, 3), (5, 4, 4),
                (6, 3, 1), (6, 4, 2), (6, 1, 3), (6, 5, 4),
                (7, 2, 1), (7, 1, 2), (7, 4, 3), (7, 3, 4), (7, 5, 5),
                (8, 5, 1), (8, 3, 2), (8, 2, 3),
                (9, 4, 1), (9, 1, 2), (9, 2, 3), (9, 5, 4),
                (10, 3, 1), (10, 5, 2), (10, 1, 3), (10, 4, 4), (10, 2, 5),
                (11, 1, 1), (11, 2, 2), (11, 5, 3),
                (12, 3, 1), (12, 4, 2), (12, 5, 3), (12, 1, 4),
                (13, 2, 1), (13, 4, 2), (13, 3, 3),
                (14, 5, 1), (14, 1, 2), (14, 3, 3), (14, 4, 4)
            };

            context.TastingLineups.AddRange(lineupSeed.Select(lineup => new TastingLineup
            {
                TastingId = lineup.TastingId,
                BeanId = beanIds[lineup.BeanNumber - 1],
                Position = lineup.Position
            }));
        }
        await context.SaveChangesAsync();

        if (!await context.TastingSignups.AnyAsync())
        {
            context.TastingSignups.AddRange(
            new TastingSignup { TastingId = 1, MemberId = bart.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = jade.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 10, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 1, MemberId = tabitha.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 10, 12, 20, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 2, MemberId = jade.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 1, 14, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 3, MemberId = bart.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 12, 10, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 3, MemberId = tabitha.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 12, 10, 15, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 4, MemberId = jade.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 15, 11, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 4, MemberId = tabitha.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 15, 11, 20, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 5, MemberId = tabitha.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 20, 9, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 7, MemberId = jade.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 10, 22, 13, 0, 0, DateTimeKind.Utc) },
            new TastingSignup { TastingId = 9, MemberId = tabitha.Id, Status = "confirmed", SignedUpAt = new DateTime(2026, 11, 1, 14, 0, 0, DateTimeKind.Utc) }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.TastingScores.AnyAsync())
        {
            var scoredLineups = await context.TastingLineups
                .Where(lineup => lineup.TastingId == 2)
                .OrderBy(lineup => lineup.Position)
                .ToListAsync();

            context.TastingScores.AddRange(
                new TastingScore { LineupId = scoredLineups[0].Id, MemberId = jade.Id, Points = 8, Remark = "Smooth taste with a chocolate finish" },
                new TastingScore { LineupId = scoredLineups[1].Id, MemberId = jade.Id, Points = 7, Remark = "Fruity, but slightly too acidic" },
                new TastingScore { LineupId = scoredLineups[2].Id, MemberId = jade.Id, Points = 9, Remark = "Sweet aroma and a balanced flavour" },
                new TastingScore { LineupId = scoredLineups[0].Id, MemberId = bart.Id, Points = 9, Remark = "Sweet aroma with a fruity finish" },
                new TastingScore { LineupId = scoredLineups[0].Id, MemberId = tabitha.Id, Points = 7, Remark = "Good flavour, but a little bitter" },
                new TastingScore { LineupId = scoredLineups[1].Id, MemberId = bart.Id, Points = 8, Remark = "Fresh and fruity" },
                new TastingScore { LineupId = scoredLineups[1].Id, MemberId = tabitha.Id, Points = 6, Remark = "Too acidic for my taste" },
                new TastingScore { LineupId = scoredLineups[2].Id, MemberId = bart.Id, Points = 9, Remark = "Rich flavour and great aroma" },
                new TastingScore { LineupId = scoredLineups[2].Id, MemberId = tabitha.Id, Points = 8, Remark = "Smooth and slightly sweet" }
            );
        }
        await context.SaveChangesAsync();

        if (!await context.Items.AnyAsync())
            {
            context.Items.AddRange
            (
                new Item { Name = "C60 Baracuda Nautilus Blue", Kind = "Handgrinder", Condition = "New condition", Status = "Available", Brand = "Comandante", Description = "A manual coffee grinder designed for grinding coffee beans with control over the grind size.", Instructions = "Add the coffee beans and adjust the grind setting before grinding. Turn the handle steadily. Clean the grinder after use and keep it dry.", Image = "/src/assets/comandante c60.jpg", IsOutOfService = false },
                new Item { Name = "C40 MK4 Nitro Blade", Kind = "Handgrinder", Condition = "Mint condition", Status = "Available", Brand = "Comandante", Description = "A compact manual coffee grinder suitable for preparing freshly ground coffee at home or while travelling.", Instructions = "Add the desired amount of coffee beans and select the appropriate grind setting. Grind by turning the handle evenly. Empty the grinder and brush away leftover coffee grounds after use.", Image = "/src/assets/comandante c40.jpg", IsOutOfService = false },
                new Item { Name = "Comandante X25", Kind = "Handgrinder", Condition = "Mint condition", Status = "Available", Brand = "Comandante", Description = "A manual coffee grinder for preparing coffee with freshly ground beans. The grind setting can be adjusted to suit different brewing methods.", Instructions = "Place the coffee beans in the grinder and check the grind setting before use. Turn the handle steadily and collect the ground coffee. Remove remaining grounds after use and store the grinder in a dry place.", Image = "/src/assets/comandante x25.jpg", IsOutOfService = false },
                new Item { Name = "Brewista - Smart Scale III", Kind = "Scale", Condition = "Bad condition", Status = "Not Available", Brand = "Brewista", Description = "A coffee scale intended to measure coffee or water during preparation. Accurate measurements can help make brewing more consistent.", Instructions = "Place the scale on a stable, level surface. Turn it on and tare the scale before adding ingredients. Keep the scale dry and clean it carefully. Do not use it while calibration is required.", Image = "/src/assets/brewista smartscale.jpg", IsOutOfService = false },
                new Item { Name = "Acaia - Lunar", Kind = "Scale", Condition = "Mint condition", Status = "Available", Brand = "Acaia", Description = "A compact coffee scale designed for weighing espresso ingredients and monitoring measurements during coffee preparation.", Instructions = "Place the scale on a stable surface and turn it on. Put your cup or container on the scale and tare it before brewing. Avoid spilling liquids on the scale and clean it according to the manufacturer's guidance.", Image = "/src/assets/acaia-lunar-close-up.jpg", IsOutOfService = false }
            );
            await context.SaveChangesAsync();
            }
    }
} 
