using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Zetsel.Api.Data;
using Zetsel.Api.Repositories;
using Zetsel.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Gebruik altijd dezelfde database, ook als 'dotnet run' vanaf een andere map wordt gestart.
var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("ConnectionStrings:Default ontbreekt in appsettings.json");

var sqlite = new SqliteConnectionStringBuilder(connectionString);
if (!Path.IsPathFullyQualified(sqlite.DataSource))
{
    sqlite.DataSource = Path.GetFullPath(
        Path.Combine(builder.Environment.ContentRootPath, sqlite.DataSource));
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(sqlite.ToString()));

builder.Services.AddControllers();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IBeanService, BeanService>();

var app = builder.Build();

// Eerst 'dotnet ef database update' uitvoeren, daarna kun je de API starten.
await SeedData.InitializeAsync(app);

app.MapControllers();
app.MapGet("/", () => "Zetsel API is running");

app.Run();
