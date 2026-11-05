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
    }
}
