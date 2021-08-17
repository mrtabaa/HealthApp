using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public record AppUser {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Id { get; init; }
        [BsonRequired]
        public string Username { get; set; }
        [BsonRequired]
        public byte[] PasswordHash { get; set; }
        [BsonRequired]
        public byte[] PasswordSalt { get; set; }
    }
}