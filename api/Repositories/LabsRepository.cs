namespace api.Repositories;
public class LabsRepository : ILabsRepository {

    #region MongoDbSettings
    const string _databaseName = "HealthApp";
    const string _collectionName = "Labs";
    private readonly IMongoCollection<Models.Lab>? _collection;

    public LabsRepository(IMongoClient client) {
        var database = client.GetDatabase(_databaseName);
        _collection = database.GetCollection<Models.Lab>(_collectionName);
    }
    #endregion

    #region CRUD
    public async Task<LabRegisterUpdateDto?> CreateLab(LabRegisterUpdateDto labIn) {
        if (await LabExists(labIn.Name!)) return null; // labName already exists

        using var hmac = new HMACSHA512();

        // prevent ComputeHash exception
        var lab = new Models.Lab {
            Name = labIn.Name,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(labIn.Password!)),
            PasswordSalt = hmac.Key,
            Email = labIn.Email,
            Phone = labIn.Phone
        };

        await _collection!.InsertOneAsync(lab); // ! after _collection! tells compiler it's NOT null

        return labIn;
    }

    public async Task<LabRegisterUpdateDto> GetLab(string id) {
        var lab = await _collection.Find<Lab>(lab => lab.Id == id).FirstOrDefaultAsync();

        return new LabRegisterUpdateDto {
            Id = lab.Id,
            Name = lab.Name,
            Email = lab.Email,
            Phone = lab.Phone
        };
    }

    public async Task<List<LabRegisterUpdateDto>> GetLabs() {
        var labs = await _collection.Find(new BsonDocument()).ToListAsync();

        var labsDto = new List<LabRegisterUpdateDto>();
        foreach (var lab in labs) {
            var labDto = new LabRegisterUpdateDto();
            labDto.Id = lab.Id;
            labDto.Name = lab.Name;
            labDto.Email = lab.Email;
            labDto.Phone = lab.Phone;

            labsDto.Add(labDto);
        }

        return labsDto;
    }

    public async Task DeleteLab(string id)  =>
        await _collection.DeleteOneAsync(lab => lab.Id == id);

    public async Task<LabRegisterUpdateDto?> UpdateLab(LabRegisterUpdateDto updatedlab) {
        if (await LabExists(updatedlab.Name!)) return null; // if True, fire BadRequest in Controller

        var bson = Builders<Lab>.Update
        .Set(lab => lab.Name, updatedlab.Name)
        .Set(e => e.Email, updatedlab.Email)
        .Set(p => p.Phone, updatedlab.Phone);

        await _collection.UpdateOneAsync(l => l.Id == updatedlab.Id, (UpdateDefinition<Models.Lab>)bson);

        return updatedlab;
    }

    #endregion

    #region Helper methods
    private async Task<bool> LabExists(string labNameIn) =>
        null == await _collection.Find<Lab>(lab => lab.Name == labNameIn).FirstOrDefaultAsync()
        ? false : true;

    #endregion
}