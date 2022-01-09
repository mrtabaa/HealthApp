namespace api.Repositories;
public interface IUsersRepository {
    Task<AppUserDto?> CreateUser(AppUserDto userIn);
    Task<AppUserDto> GetUser(string id);
    Task<List<AppUserDto>> GetUsers();
    Task DeleteUser(string id);
    Task<bool> UpdateOne(AppUserDto userDto);
}
