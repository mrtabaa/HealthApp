namespace api.Settings;
public interface IMongoDbSettings {
    string? ConnectionString { get; init; }
}