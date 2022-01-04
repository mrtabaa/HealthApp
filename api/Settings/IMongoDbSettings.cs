namespace API.Settings;
public interface IMongoDbSettings {
    string? ConnectionString { get; init; }
}