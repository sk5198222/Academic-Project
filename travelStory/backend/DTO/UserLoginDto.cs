﻿using System.ComponentModel.DataAnnotations;

namespace backend.DTO
{
    public class UserLoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
