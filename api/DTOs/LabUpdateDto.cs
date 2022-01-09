namespace apiLab.DTOs;
public class LabUpdateDto {
    public string? id { get; set; }

    [Required]
    public string? Username { get; set; }

    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Phone { get; set; }
}
