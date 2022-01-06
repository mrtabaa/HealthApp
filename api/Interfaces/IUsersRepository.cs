namespace api.Repositories;
public interface IUsersRepository {
    Task<AppUser> CreateUser(AppUser userIn);
    Task<AppUser> GetUser(string id);
    Task<List<AppUser>> GetUsers();
    Task<AppUser> DeleteUser(string id);
    Task ReplaceUser(string id, AppUser userIn);
    Task UpdateUser(string id, AppUser userIn);
}
