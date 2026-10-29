using Zetsel.Api.Data;
using Zetsel.Api.Repositories;
using Zetsel.Api.Services; 

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IBeanService, BeanService>();

builder.Services.AddControllers();

var app = builder.Build();

await SeedData.InitializeAsync(app);

app.MapGet("/", () => "Zetsel API is running");

app.Run();