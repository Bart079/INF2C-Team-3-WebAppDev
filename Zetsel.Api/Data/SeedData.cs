using Zetsel.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Zetsel.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

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

        if (!await context.Items.AnyAsync())
        {
        context.Items.AddRange(
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
