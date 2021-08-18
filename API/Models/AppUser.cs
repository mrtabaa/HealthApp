using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models {
    public record AppUser {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; init; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}