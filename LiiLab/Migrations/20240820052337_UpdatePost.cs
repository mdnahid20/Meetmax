using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LiiLab.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Post");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Post",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Post");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Post",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
