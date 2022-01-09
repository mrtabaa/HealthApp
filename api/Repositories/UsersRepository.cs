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
    public async Task<LabRegisterDto?> CreateUser(LabRegisterDto userIn) {
        if (await UserExists(userIn.Username!)) return null; // username already exists

        using var hmac = new HMACSHA512();

        // prevent ComputeHash exception
        var user = new AppUser {
            Username = userIn.Username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userIn.Password!)),
            PasswordSalt = hmac.Key,
            Email = userIn.Email,
            Phone = userIn.Phone
        };

        await _collection!.InsertOneAsync(user); // ! after _collection! tells compiler it's NOT null
        return userIn;
    }

    public async Task<LabRegisterDto> GetUser(string id) {
        var user = await _collection.Find<AppUser>(u => u.Id == id).FirstOrDefaultAsync();

        return new LabRegisterDto {
            id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Phone = user.Phone
        };
    }

    public async Task<List<LabRegisterDto>> GetUsers() {
        var users = await _collection.Find(new BsonDocument()).ToListAsync();

        var usersDto = new List<LabRegisterDto>();
        foreach (var user in users) {
            var userDto = new LabRegisterDto();
            userDto.id = user.Id;
            userDto.Username = user.Username;
            userDto.Email = user.Email;
            userDto.Phone = user.Phone;

            usersDto.Add(userDto);
        }

        return usersDto;
    }

    public async Task DeleteUser(string id) =>
        await _collection.DeleteOneAsync<AppUser>(user => user.Id == id);

    public async Task<bool> UpdateOne(LabRegisterDto updatedUser) {
        if (await UserExists(updatedUser.Username!)) return true; // if True, fire BadRequest in Controller

        var bson = Builders<AppUser>.Update
        .Set(uN => uN.Username, updatedUser.Username)
        .Set(e => e.Email, updatedUser.Email)
        .Set(p => p.Phone, updatedUser.Phone);

        await _collection.UpdateOneAsync<AppUser>(u => u.Id == updatedUser.id, bson);

        return false;
    }

    #endregion

    #region Helper methods
    private async Task<bool> UserExists(string usernameIn) =>
        null == await _collection.Find<AppUser>(u => u.Username == usernameIn).FirstOrDefaultAsync()
        ? false : true;
    #endregion
}