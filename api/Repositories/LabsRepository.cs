namespace api.Repositories;
public class LabsRepository : ILabsRepository {

    #region MongoDbSettings
    const string _databaseName = "HealthApp";
    const string _collectionName = "Labs";
    private readonly IMongoCollection<Lab>? _collection;

    public LabsRepository(IMongoClient client) {
        var database = client.GetDatabase(_databaseName);
        _collection = database.GetCollection<Lab>(_collectionName);
    }
    #endregion

    #region CRUD
    public async Task<LabRegisterUpdateDto?> CreateLab(LabRegisterUpdateDto labIn) {
        if (await LabExists(labIn.Email!)) return null; // labName already exists

        using var hmac = new HMACSHA512();

        // prevent ComputeHash exception
        var lab = new Lab {
            LabName = labIn.LabName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(labIn.Password!)),
            PasswordSalt = hmac.Key,
            Email = labIn.Email,
            Phone = labIn.Phone
        };

        await _collection!.InsertOneAsync(lab); // ! after _collection! tells compiler it's NOT null

        return labIn;
    }

    // public async Task<LabLoginDto?> LoginLab(LabLoginDto labIn) {

    // }

    public async Task<LabRegisterUpdateDto> GetLab(string id) {
        var lab = await _collection.Find<Lab>(lab => lab.Id == id).FirstOrDefaultAsync();

        return new LabRegisterUpdateDto {
            Id = lab.Id,
            Email = lab.Email,
            LabName = lab.LabName,
            Phone = lab.Phone
        };
    }

    public async Task<List<LabRegisterUpdateDto>> GetLabs() {
        var labs = await _collection.Find<Lab>(new BsonDocument()).ToListAsync();

        var labsDto = new List<LabRegisterUpdateDto>();
        foreach (var lab in labs) {
            var labDto = new LabRegisterUpdateDto();
            labDto.Id = lab.Id;
            labDto.Email = lab.Email;
            labDto.LabName = lab.LabName;
            labDto.Phone = lab.Phone;

            labsDto.Add(labDto);
        }

        return labsDto;
    }

    public async Task DeleteLab(string id)  =>
        await _collection.DeleteOneAsync<Lab>(lab => lab.Id == id);

    public async Task<LabRegisterUpdateDto?> UpdateLab(LabRegisterUpdateDto updatedlab) {
        if (await LabExists(updatedlab.Email!)) return null; // if True, fire BadRequest in Controller

        var bson = Builders<Lab>.Update
        .Set(e => e.Email, updatedlab.Email)
        .Set(lab => lab.LabName, updatedlab.LabName)
        .Set(p => p.Phone, updatedlab.Phone);

        await _collection.UpdateOneAsync<Lab>(l => l.Id == updatedlab.Id, bson);

        return updatedlab;
    }

    #endregion

    #region Helper methods
    private async Task<bool> LabExists(string labEmailIn) =>
        null == await _collection.Find<Lab>(lab => lab.Email == labEmailIn).FirstOrDefaultAsync()
        ? false : true;

    #endregion
}