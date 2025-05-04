using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class TravelDbContext : DbContext
    {
        public DbSet<User> Users { get; set; } 

        public DbSet<TravelStory> Stories { get; set; }

        public DbSet<VisitedLocation> VisitedLocations { get; set; }

        public TravelDbContext(DbContextOptions<TravelDbContext> options)
            : base(options)
        {
        }

    }
}