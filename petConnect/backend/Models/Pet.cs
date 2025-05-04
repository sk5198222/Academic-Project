using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using backend.Data;

namespace backend.Models
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public PetType Type { get; set; } // "Dog", "Cat", etc.
        public Gender Gender { get; set; }
        public string Breed { get; set; }
        public int Age { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string Description { get; set; }
        public int Price { get; set; } = 0;
        public string Location { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }

        public bool IsAdopted { get; set; } = false;
    }
}
