namespace API.Settings;
public class MongoDbSettings : IMongoDbSettings {
    public string? ConnectionString { get; init; }
}