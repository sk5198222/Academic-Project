using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class PetModelUpd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Pets",
                newName: "Price");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdopted",
                table: "Pets",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdopted",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Pets",
                newName: "price");
        }
    }
}
