namespace api.Repositories;
public class LabsRepository : ILabsRepository {

    #region Db and Token Settings
    const string _databaseName = "HealthApp";
    const string _collectionName = "Labs";
    private readonly IMongoCollection<Lab>? _collection;
    private readonly ITokenService _tokenService;

    public LabsRepository(IMongoClient client, ITokenService tokenService) {
        var database = client.GetDatabase(_databaseName);
        _collection = database.GetCollection<Lab>(_collectionName);
        _tokenService = tokenService;
    }
    #endregion

    #region CRUD

    #region Account
    public async Task<UserDto?> CreateLab(LabRegisterDto labIn) {
        if (await PhoneOrEmailExists(labIn!))
            return null;

        using var hmac = new HMACSHA512();

        // prevent ComputeHash exception
        var lab = new Lab {
            Email = labIn.Email,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(labIn.Password!)),
            PasswordSalt = hmac.Key,
            LabName = labIn.LabName,
            Phone = labIn.Phone
        };

        await _collection!.InsertOneAsync(lab); // ! after _collection! tells compiler it's NOT null

        return new UserDto {
            Email = labIn.Email,
            Token = _tokenService.CreateToken(lab)
        };
    }

    public async Task<LabLoginDto?> LoginLab(LabLoginDto labIn) {
        var lab = await _collection.Find<Lab>(lab => lab.Email == labIn.Email).FirstOrDefaultAsync();

        if (lab == null)
            return null;

        using var hmac = new HMACSHA512(lab.PasswordSalt!);
        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(labIn.Password!));
        if(lab.PasswordHash!.SequenceEqual(ComputeHash))
            return labIn;

        return null;
    }

    #endregion Account

    #region LabsManagement
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
            return null;

        var bson = Builders<Lab>.Update
        .Set(e => e.Email, updatedlab.Email)
        .Set(lab => lab.LabName, updatedlab.LabName)
        .Set(p => p.Phone, updatedlab.Phone);

        await _collection.UpdateOneAsync<Lab>(l => l.Id == updatedlab.Id, bson);

        return null;
    }
    #endregion LabsManagement

    #endregion CRUD

    #region Helper methods

    private async Task<bool> PhoneOrEmailExists(LabRegisterDto labIn) =>
        null != await _collection
        .Find<Lab>(
            lab => lab.Email == labIn.Email || lab.Phone == labIn.Phone
        ).FirstOrDefaultAsync()
        ? true : false;

    private async Task<bool?> PhoneOrEmailExists(LabUpdateDto labIn) =>
        null != await _collection
        .Find<Lab>(
            lab => lab.Email == labIn.Email || lab.Phone == labIn.Phone
        ).FirstOrDefaultAsync()
        ? true : false;

    #endregion
}