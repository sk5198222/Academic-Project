using backend.Data;

namespace backend.DTO
{
    public class UserCreateDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
