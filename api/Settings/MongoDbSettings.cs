namespace api.Settings;
public class MongoDbSettings : IMongoDbSettings {
    public string? ConnectionString { get; init; }
}