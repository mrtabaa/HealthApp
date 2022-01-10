namespace api.DTOs;
public record LabLoginDto {
    public string? Id { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }

    public string? LabName { get; set; }
}
