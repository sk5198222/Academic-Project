using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class TravelStory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Story { get; set; }
        public int VisitedLocationId { get; set; }
        public List<VisitedLocation> VisitedLocations { get; set; } = new List<VisitedLocation>();
        public bool IsFavourite { get; set; } = false;
        public int UserId { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public string? ImageUrl { get; set; }
        public DateTime VisitedDate { get; set; }
    }
}
