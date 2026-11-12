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

var frontendUrl = builder.Configuration["Frontend:Url"]
    ?? throw new InvalidOperationException(
        "Missing configuration value Frontend:Url");

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(frontendUrl)
              .AllowAnyHeader()
              .AllowAnyMethod()));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IBeanService, BeanService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<ITastingService, TastingService>();
builder.Services.AddScoped<ITastingLineupService, TastingLineupService>();
builder.Services.AddScoped<ITastingSignupService, TastingSignupService>();
builder.Services.AddScoped<ITastingScoreService, TastingScoreService>();
builder.Services.AddScoped<IGroupOrderService, GroupOrderService>();
builder.Services.AddScoped<IOrderShareService, OrderShareService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IItemHoldService, ItemHoldService>();
builder.Services.AddScoped<IItemRequestService, ItemRequestService>();

var app = builder.Build();

// Eerst 'dotnet ef database update' uitvoeren, daarna kun je de API starten.
await SeedData.InitializeAsync(app);

app.UseCors();
app.MapControllers();
app.MapGet("/", () => "Zetsel API is running");

app.Run();
