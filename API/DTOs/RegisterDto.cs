using System.ComponentModel.DataAnnotations;

namespace API.DTOs {
    public class RegisterDto {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}