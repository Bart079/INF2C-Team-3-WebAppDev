using Zetsel.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (await context.Beans.AnyAsync())
        {
            return;
        }

        context.Beans.AddRange(
            new Bean { Name = "Ethiopia Yirgacheffe", Roaster = "Hans", Origin = "Ethiopia", RoastLevel = "light", FreshnessWeeks = 3 },
            new Bean { Name = "Colombia Supremo", Roaster = "Herman", Origin = "Colombia", RoastLevel = "medium", FreshnessWeeks = 2 },
            new Bean { Name = "Kenya AA", Roaster = "Anne", Origin = "Kenya", RoastLevel = "medium", FreshnessWeeks = 5 },
            new Bean { Name = "Brazil Santos", Roaster = "Max", Origin = "Brazil", RoastLevel = "light", FreshnessWeeks = 3 }
        );

        await context.SaveChangesAsync();
    }
}