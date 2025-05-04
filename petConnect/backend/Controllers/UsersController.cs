using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(PetCareDbContext db, IConfiguration config) : ControllerBase
    {
        private readonly PetCareDbContext _db = db;
        private readonly IConfiguration _config = config;

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            var users = await _db.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // POST: api/users (Register)
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromForm] UserCreateDto userDto,IFormFile? profilePicture)
        {
            using var hmac = new HMACSHA512();
            var user = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                PhoneNumber = userDto.PhoneNumber,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
                PasswordSalt = hmac.Key
            };

            //Handle Profile Picture Upload
            if (profilePicture != null)
            {
                var fileName = $"{Guid.NewGuid()}_{profilePicture.FileName}";
                var filePath = Path.Combine("wwwroot/uploads", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }

                user.ProfilePictureUrl = $"/uploads/{fileName}";
            }

            _db.Users.Add(user);        
            await _db.SaveChangesAsync();

            return Ok("Registration successful!"); // Return success message
        }


        // POST: api/   
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userDto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (user == null) return Unauthorized("Invalid email.");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
                return Unauthorized("Invalid password.");

            string token = GenerateJwtToken(user);

            return Ok(new
            {
                Token = token,
                User = new
                {
                    user.Id,
                    user.FullName,
                    user.ProfilePictureUrl
                }
            });
        }

        // PUT: api/users/5 (Update user details)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UserUpdateDTO user, IFormFile? profilePicture)
        {
            var userOriginal = await _db.Users.FindAsync(id);
            if (userOriginal == null)
                return NotFound("User not found.");

            userOriginal.FullName = user.FullName;
            userOriginal.Email = user.Email;
            userOriginal.PhoneNumber = user.PhoneNumber;

            //Handle Profile Picture Upload
            if (profilePicture != null)
            {
                var fileName = $"{Guid.NewGuid()}_{profilePicture.FileName}";
                var filePath = Path.Combine("wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }
                userOriginal.ProfilePictureUrl = $"/uploads/{fileName}";
            }

            await _db.SaveChangesAsync();
            return Ok("User updated successfully.");
        }


        // Generate JWT Token
        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _config.GetSection("JwtSettings");

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", user.Id.ToString()),
                new Claim("fullname", user.FullName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
