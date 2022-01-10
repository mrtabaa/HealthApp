namespace api.DTOs;
public record LabUpdateDto {
    public string? Id { get; set; }
    
    [EmailAddress]
    public string? Email { get; set; }
    
    public string? Password { get; set; }

    public string? LabName { get; set; }

    [Phone]
    public string? Phone { get; set; }
}
