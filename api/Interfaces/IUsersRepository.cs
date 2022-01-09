namespace api.Repositories;
public interface IUsersRepository {
    Task<LabRegisterDto?> CreateUser(LabRegisterDto userIn);
    Task<LabRegisterDto> GetUser(string id);
    Task<List<LabRegisterDto>> GetUsers();
    Task DeleteUser(string id);
    Task<bool> UpdateOne(LabRegisterDto userDto);
}
