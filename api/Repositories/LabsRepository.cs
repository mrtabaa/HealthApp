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
    public async Task<string?> CreateLab(LabRegisterDto labIn) {
        var existsMessage = await PhoneOrEmailExists(labIn!);
        if (existsMessage != null)
            return existsMessage;

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

        return null;
    }

    // public async Task<LabLoginDto?> LoginLab(LabLoginDto labIn) {

    // }

    public async Task<LabRegisterDto> GetLab(string id) {
        var lab = await _collection.Find<Lab>(lab => lab.Id == id).FirstOrDefaultAsync();

        return new LabRegisterDto {
            Id = lab.Id,
            Email = lab.Email,
            LabName = lab.LabName,
            Phone = lab.Phone
        };
    }

    public async Task<List<LabRegisterDto>> GetLabs() {
        var labs = await _collection.Find<Lab>(new BsonDocument()).ToListAsync();

        var labsDto = new List<LabRegisterDto>();
        foreach (var lab in labs) {
            var labDto = new LabRegisterDto();
            labDto.Id = lab.Id;
            labDto.Email = lab.Email;
            labDto.LabName = lab.LabName;
            labDto.Phone = lab.Phone;

            labsDto.Add(labDto);
        }

        return labsDto;
    }

    public async Task DeleteLab(string id) =>
        await _collection.DeleteOneAsync<Lab>(lab => lab.Id == id);

    public async Task<string?> UpdateLab(LabUpdateDto updatedlab) {
        var existsMessage = await PhoneOrEmailExists(updatedlab!);
        if (existsMessage != null)
            return existsMessage;

        var bson = Builders<Lab>.Update
        .Set(e => e.Email, updatedlab.Email)
        .Set(lab => lab.LabName, updatedlab.LabName)
        .Set(p => p.Phone, updatedlab.Phone);

        await _collection.UpdateOneAsync<Lab>(l => l.Id == updatedlab.Id, bson);

        return null;
    }

    #endregion

    #region Helper methods
    private async Task<string?> PhoneOrEmailExists(LabRegisterDto labIn) {
        if (null != await _collection.Find<Lab>(lab => lab.Email == labIn.Email).FirstOrDefaultAsync())
            return "Email is taken.";
        if (null != await _collection.Find<Lab>(lab => lab.Phone == labIn.Phone).FirstOrDefaultAsync())
            return "Phone number is taken.";
        return null;
    }

    private async Task<string?> PhoneOrEmailExists(LabUpdateDto labIn) {
        if (null != await _collection.Find<Lab>(lab => lab.Email == labIn.Email).FirstOrDefaultAsync())
            return "Email is taken.";
        if (null != await _collection.Find<Lab>(lab => lab.Phone == labIn.Phone).FirstOrDefaultAsync())
            return "Phone number is taken.";
        return null;
    }

    #endregion
}