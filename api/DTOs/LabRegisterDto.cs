namespace api.DTOs;
public class LabRegisterDto {
    public string? id { get; set; }
    
    [Required]
    public string? Username { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Phone { get; set; }
}
