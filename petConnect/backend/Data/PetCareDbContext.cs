using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class PetCareDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } 

        public DbSet<Pet> Pets { get; set; }

        public PetCareDbContext(DbContextOptions<PetCareDbContext> options)
            : base(options)
        {
        }

    }
}