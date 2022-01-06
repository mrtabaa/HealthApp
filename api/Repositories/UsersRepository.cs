namespace api.Repositories;
public class UsersRepository : IUsersRepository {

    #region MongoDbSettings
    const string _databaseName = "HealthApp";
    const string _collectionName = "Users";
    private readonly IMongoCollection<AppUser>? _collection;

    public UsersRepository(IMongoClient client) {
        var database = client.GetDatabase(_databaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);
    }
    #endregion

    #region CRUD
    public async Task<AppUser> CreateUser(AppUser userIn) {
        await _collection!.InsertOneAsync(userIn); // ! after _collection! tells compiler it's NOT null
        return userIn;
    }

    public async Task<AppUser> GetUser(string id) =>
        await _collection.Find<AppUser>(u => u.Id == id).FirstOrDefaultAsync();

    public async Task<List<AppUser>> GetUsers() =>
        await _collection.Find(new BsonDocument()).ToListAsync();

    public async Task<AppUser> DeleteUser(string id) =>
        await _collection.Find<AppUser>(user => user.Id == id).FirstOrDefaultAsync();

    public async Task ReplaceUser(string id, AppUser userIn) =>
        await _collection.ReplaceOneAsync<AppUser>(u => u.Id == id, userIn);

    public async Task UpdateUser(string id, AppUser userIn) =>
        await _collection.UpdateOneAsync<AppUser>(u => u.Id == id, userIn.Username = "tania");
    #endregion
}