using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoriesController : ControllerBase
    {
        private readonly TravelDbContext _context;

        public StoriesController(TravelDbContext context)
        {
            _context = context;
        }

        // POST: api/Stories
        [HttpPost]
        public async Task<IActionResult> AddTravelStory(TravelStory story)
        {
            _context.Stories.Add(story);
            await _context.SaveChangesAsync();

            // Add visited locations separately if they exist
            if (story.VisitedLocations != null && story.VisitedLocations.Any())
            {
                foreach (var loc in story.VisitedLocations)
                {
                    loc.TravelStoryId = story.Id;
                    _context.VisitedLocations.Add(loc);
                }
                await _context.SaveChangesAsync();
            }

            return Ok(story);
        }

        // GET: api/Stories
        [HttpGet]
        public async Task<IActionResult> GetAllTravelStories()
        {
            var stories = await _context.Stories
                .Include(s => s.VisitedLocations)
                .ToListAsync();

            return Ok(stories);
        }

        // PUT: api/Stories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTravelStory(int id, TravelStory updatedStory)
        {
            var story = await _context.Stories
                .Include(s => s.VisitedLocations)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (story == null) return NotFound();

            story.Title = updatedStory.Title;
            story.Story = updatedStory.Story;
            story.VisitedDate = updatedStory.VisitedDate;
            story.ImageUrl = updatedStory.ImageUrl;

            // Update visited locations:
            _context.VisitedLocations.RemoveRange(story.VisitedLocations);
            if (updatedStory.VisitedLocations != null && updatedStory.VisitedLocations.Any())
            {
                foreach (var loc in updatedStory.VisitedLocations)
                {
                    loc.TravelStoryId = story.Id;
                    _context.VisitedLocations.Add(loc);
                }
            }

            await _context.SaveChangesAsync();
            return Ok(story);
        }

        // DELETE: api/Stories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelStory(int id)
        {
            var story = await _context.Stories
                .Include(s => s.VisitedLocations)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (story == null) return NotFound();

            _context.VisitedLocations.RemoveRange(story.VisitedLocations);
            _context.Stories.Remove(story);

            await _context.SaveChangesAsync();
            return Ok(new { Message = "Travel story deleted." });
        }

        // PATCH: api/Stories/{id}/favorite
        [HttpPatch("{id}/favorite")]
        public async Task<IActionResult> UpdateIsFavorite(int id, [FromBody] bool isFavourite)
        {
            var story = await _context.Stories.FindAsync(id);
            if (story == null) return NotFound();

            story.IsFavourite = isFavourite;
            await _context.SaveChangesAsync();
            return Ok(story);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromQuery] int userId)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var relativePath = $"/uploads/{uniqueFileName}";

            // Update User's ProfilePictureUrl
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                user.ProfilePictureUrl = relativePath;
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound("User not found.");
            }

            return Ok(new { ImageUrl = relativePath });
        }

        [HttpDelete("delete-image")]
        public async Task<IActionResult> DeleteImage([FromQuery] string imageUrl, [FromQuery] int userId)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return BadRequest("Image URL is required.");

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imageUrl.TrimStart('/'));

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
            else
            {
                return NotFound("File not found.");
            }

            // Remove reference from User
            var user = await _context.Users.FindAsync(userId);
            if (user != null && user.ProfilePictureUrl == imageUrl)
            {
                user.ProfilePictureUrl = null;
                await _context.SaveChangesAsync();
            }
            else if (user == null)
            {
                return NotFound("User not found.");
            }
            else
            {
                return BadRequest("Image URL does not match the user's profile picture.");
            }

            return Ok(new { Message = "Image deleted successfully." });
        }

    }
}
