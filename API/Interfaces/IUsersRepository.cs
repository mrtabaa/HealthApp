using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories {
    public interface IUsersRepository {
        Task<List<AppUser>> GetUsers();
        Task<AppUser> GetUser(string id);
        Task ReplaceUser(string id, AppUser userIn);
        Task UpdateUser(string id, AppUser userIn);
    }
}