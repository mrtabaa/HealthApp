using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Repositories {
    public interface IUsersRepository {
        Task<List<AppUser>> GetUsers();
        Task<AppUser> GetUser(string id);
        Task<AppUser> CreateUser(RegisterDto registerDto);
        void ReplaceUser(string id, AppUser userIn);
        void UpdateUser(string id, AppUser userIn);
        void DeleteUser(string id);
        void DeleteUser(AppUser userIn);
    }
}