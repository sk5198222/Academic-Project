using backend.Data;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; internal set; }
        public string? ProfilePictureUrl { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    }
}
