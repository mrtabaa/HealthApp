namespace api.DTOs;
public record LabRegisterUpdateDto {
    public string? Id { get; set; }
    
    [Required]
    [EmailAddress]
    public string? Email { get; set; }
    
    [Required]
    public string? Password { get; set; }

    [Required]
    public string? LabName { get; set; }

    [Required]
    [Phone]
    public string? Phone { get; set; }
}
