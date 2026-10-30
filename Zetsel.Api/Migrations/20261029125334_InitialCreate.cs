using Microsoft.EntityFrameworkCore.Migrations;
using Zetsel.Api.Data;

#nullable disable

namespace Zetsel.Api.Migrations;

// Oorspronkelijke migratie-ID behouden: staat al in de bestaande database.
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "beans",
            columns: table => new
            {
                Id = table.Column<int>(type: "INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Name = table.Column<string>(type: "TEXT", nullable: false),
                Roaster = table.Column<string>(type: "TEXT", nullable: false),
                Origin = table.Column<string>(type: "TEXT", nullable: false),
                Roastlevel = table.Column<string>(type: "TEXT", nullable: false),
                Freshnessweeks = table.Column<int>(type: "INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_beans", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "beans");
    }
}
