namespace api.DTOs;
public record LabRegisterUpdateDto {
    public string? Id { get; set; }
    
    [Required]
    public string? Name { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Phone { get; set; }
}
