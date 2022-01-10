namespace api.Models;
public record Lab {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }
    public string? Email { get; set; }
    public byte[]? PasswordHash { get; set; }
    public byte[]? PasswordSalt { get; set; }
    public string? LabName { get; set; }
    public string? Phone { get; set; }
}