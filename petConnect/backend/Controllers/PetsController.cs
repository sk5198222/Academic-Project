using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController(PetCareDbContext context, IWebHostEnvironment env) : ControllerBase
    {
        private readonly PetCareDbContext _context = context;

        // GET: api/Pets (Get all pets which are not adopted yet)
        [HttpGet]
        public async Task<ActionResult<List<Pet>>> Get() {
            var pets = await _context.Pets.Where(p => p.IsAdopted == false).ToListAsync();
            return Ok(pets);
        }

        // GET: api/Pets/5 (Get pet by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Pet>> GetPet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();
            return Ok(pet);
        }

        //Get pet by userId
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<Pet>>> GetPetsByUserId(int userId)
        {
            var pets = await _context.Pets.Where(p => p.UserId == userId).ToListAsync();
            if (pets == null || pets.Count == 0)
                return NotFound("No pets found for this user.");
            return Ok(pets);
        }

        // POST: api/Pets (Add a new pet)
        [HttpPost]
        public async Task<ActionResult<string>> AddPet([FromForm] Pet pet, IFormFile? profilePicture)
        {
            if (profilePicture != null)
            {
                var fileName = $"{Guid.NewGuid()}_{profilePicture.FileName}";
                var filePath = Path.Combine("wwwroot/uploads", fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }

                pet.ProfilePictureUrl = $"/uploads/{fileName}";
            }
            _context.Pets.Add(pet);
            await _context.SaveChangesAsync();
            return Ok("Pet added successfully");
        }

        [HttpPost("adopt/{petId}")]
        public async Task<IActionResult> AdoptPet(int petId)
        {
            var pet = await _context.Pets.FindAsync(petId);
            if (pet == null)
                return NotFound("Pet not found.");
            pet.IsAdopted = true;
            await _context.SaveChangesAsync();
            return Ok("Marked as Adopted");
        }


        // PUT: api/Pets/5 (Update pet details)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePet(int id, [FromForm] Pet pet, IFormFile? profilePicture)
        {
            var orgPet = await _context.Pets.FindAsync(id);
            if (orgPet == null)
                return NotFound("Pet not found.");

            orgPet.Name = pet.Name;
            orgPet.Gender = pet.Gender;
            orgPet.Breed = pet.Breed;
            orgPet.Age = pet.Age;
            orgPet.Price = pet.Price;
            orgPet.Location = pet.Location;

            if (profilePicture != null)
            {
                var fileName = $"{Guid.NewGuid()}_{profilePicture.FileName}";
                var filePath = Path.Combine("wwwroot/uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }
                orgPet.ProfilePictureUrl = $"/uploads/pet{fileName}";
            }

            await _context.SaveChangesAsync();
            return Ok("Pet updated successfully.");
        }

        // DELETE: api/Pets/5 (Remove a pet)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePet(int id)
        {
            var pet = await _context.Pets.FindAsync(id);
            if (pet == null)
                return NotFound();

            _context.Pets.Remove(pet);
            await _context.SaveChangesAsync();

            return Ok("Pet deleted successfully.");
        }

    }
}
