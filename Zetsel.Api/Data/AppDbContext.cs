using Zetsel.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Zetsel.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Bean> beans => Set<Bean>();
}