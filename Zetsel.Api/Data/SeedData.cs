using Zetsel.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (await context.beans.AnyAsync())
        {
            return;
        }

        context.beans.AddRange(
            new Bean { Name = "Ethiopia Yirgacheffe", Roaster = "Hans", Origin = "Ethiopia", Roastlevel = "light", Freshnessweeks = 3 },
            new Bean { Name = "Colombia Supremo", Roaster = "Herman", Origin = "Colombia", Roastlevel = "medium", Freshnessweeks = 2 },
            new Bean { Name = "Kenya AA", Roaster = "Anne", Origin = "Kenya", Roastlevel = "medium", Freshnessweeks = 5 },
            new Bean { Name = "Brazil Santos", Roaster = "Max", Origin = "Brazil", Roastlevel = "light", Freshnessweeks = 3 }
        );

        await context.SaveChangesAsync();
    }
}