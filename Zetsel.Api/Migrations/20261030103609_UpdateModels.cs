using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zetsel.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                CREATE TABLE "__BeansNew" (
                    "Id" INTEGER NOT NULL CONSTRAINT "PK_Beans" PRIMARY KEY AUTOINCREMENT,
                    "Name" TEXT NOT NULL,
                    "Roaster" TEXT NOT NULL,
                    "Origin" TEXT NOT NULL,
                    "RoastLevel" TEXT NOT NULL,
                    "FreshnessWeeks" INTEGER NOT NULL
                );
                """);

            migrationBuilder.Sql("""
                INSERT INTO "__BeansNew" ("Id", "Name", "Roaster", "Origin", "RoastLevel", "FreshnessWeeks")
                SELECT "Id", "Name", "Roaster", "Origin", "Roastlevel", "Freshnessweeks"
                FROM "beans";
                """);

            migrationBuilder.Sql("DROP TABLE \"beans\";");
            migrationBuilder.Sql("ALTER TABLE \"__BeansNew\" RENAME TO \"Beans\";");

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Kind = table.Column<string>(type: "TEXT", nullable: false),
                    Condition = table.Column<string>(type: "TEXT", nullable: false),
                    Brand = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Instructions = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    IsOutOfService = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    IsCommittee = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GroupOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BeanId = table.Column<int>(type: "INTEGER", nullable: false),
                    StartedById = table.Column<int>(type: "INTEGER", nullable: false),
                    MinimumGrams = table.Column<int>(type: "INTEGER", nullable: false),
                    ClosingDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupOrders_Beans_BeanId",
                        column: x => x.BeanId,
                        principalTable: "Beans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupOrders_Members_StartedById",
                        column: x => x.StartedById,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemHolds",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    EndedAt = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemHolds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemHolds_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemHolds_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    RequestedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRequests_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemRequests_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tastings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HostId = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false),
                    Cancelled = table.Column<bool>(type: "INTEGER", nullable: false),
                    KeyStatus = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tastings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tastings_Members_HostId",
                        column: x => x.HostId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderShares",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderId = table.Column<int>(type: "INTEGER", nullable: false),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    Grams = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderShares", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderShares_GroupOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "GroupOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderShares_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TastingLineups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TastingId = table.Column<int>(type: "INTEGER", nullable: false),
                    BeanId = table.Column<int>(type: "INTEGER", nullable: false),
                    Position = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TastingLineups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TastingLineups_Beans_BeanId",
                        column: x => x.BeanId,
                        principalTable: "Beans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TastingLineups_Tastings_TastingId",
                        column: x => x.TastingId,
                        principalTable: "Tastings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TastingSignups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TastingId = table.Column<int>(type: "INTEGER", nullable: false),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    SignedUpAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TastingSignups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TastingSignups_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TastingSignups_Tastings_TastingId",
                        column: x => x.TastingId,
                        principalTable: "Tastings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TastingScores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LineupId = table.Column<int>(type: "INTEGER", nullable: false),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    Points = table.Column<int>(type: "INTEGER", nullable: false),
                    Remark = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TastingScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TastingScores_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TastingScores_TastingLineups_LineupId",
                        column: x => x.LineupId,
                        principalTable: "TastingLineups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Beans_Roaster_Name",
                table: "Beans",
                columns: new[] { "Roaster", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupOrders_BeanId",
                table: "GroupOrders",
                column: "BeanId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupOrders_StartedById",
                table: "GroupOrders",
                column: "StartedById");

            migrationBuilder.CreateIndex(
                name: "IX_ItemHolds_ItemId",
                table: "ItemHolds",
                column: "ItemId",
                unique: true,
                filter: "\"EndedAt\" IS NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ItemHolds_MemberId",
                table: "ItemHolds",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequests_ItemId",
                table: "ItemRequests",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRequests_MemberId",
                table: "ItemRequests",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_Members_Username",
                table: "Members",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderShares_MemberId",
                table: "OrderShares",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderShares_OrderId_MemberId",
                table: "OrderShares",
                columns: new[] { "OrderId", "MemberId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TastingLineups_BeanId",
                table: "TastingLineups",
                column: "BeanId");

            migrationBuilder.CreateIndex(
                name: "IX_TastingLineups_TastingId_BeanId",
                table: "TastingLineups",
                columns: new[] { "TastingId", "BeanId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TastingLineups_TastingId_Position",
                table: "TastingLineups",
                columns: new[] { "TastingId", "Position" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tastings_HostId",
                table: "Tastings",
                column: "HostId");

            migrationBuilder.CreateIndex(
                name: "IX_TastingScores_LineupId_MemberId",
                table: "TastingScores",
                columns: new[] { "LineupId", "MemberId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TastingScores_MemberId",
                table: "TastingScores",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TastingSignups_MemberId",
                table: "TastingSignups",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_TastingSignups_TastingId_MemberId",
                table: "TastingSignups",
                columns: new[] { "TastingId", "MemberId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemHolds");

            migrationBuilder.DropTable(
                name: "ItemRequests");

            migrationBuilder.DropTable(
                name: "OrderShares");

            migrationBuilder.DropTable(
                name: "TastingScores");

            migrationBuilder.DropTable(
                name: "TastingSignups");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "GroupOrders");

            migrationBuilder.DropTable(
                name: "TastingLineups");

            migrationBuilder.DropTable(
                name: "Tastings");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Beans_Roaster_Name",
                table: "Beans");

            // De omgekeerde wijziging moet ook via een tussentabel door SQLite's
            // hoofdletterongevoelige tabelnamen.
            migrationBuilder.Sql("""
                CREATE TABLE "__beans_old" (
                    "Id" INTEGER NOT NULL CONSTRAINT "PK_beans" PRIMARY KEY AUTOINCREMENT,
                    "Name" TEXT NOT NULL,
                    "Roaster" TEXT NOT NULL,
                    "Origin" TEXT NOT NULL,
                    "Roastlevel" TEXT NOT NULL,
                    "Freshnessweeks" INTEGER NOT NULL
                );
                """);

            migrationBuilder.Sql("""
                INSERT INTO "__beans_old" ("Id", "Name", "Roaster", "Origin", "Roastlevel", "Freshnessweeks")
                SELECT "Id", "Name", "Roaster", "Origin", "RoastLevel", "FreshnessWeeks"
                FROM "Beans";
                """);

            migrationBuilder.Sql("DROP TABLE \"Beans\";");
            migrationBuilder.Sql("ALTER TABLE \"__beans_old\" RENAME TO \"beans\";");
        }
    }
}
