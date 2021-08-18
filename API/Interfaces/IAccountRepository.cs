using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface IAccountRepository
    {
        Task<AppUser> Register(RegisterDto registerDto);
        Task<AppUser> Login(LoginDto loginDto);
        Task DeleteUser(string id);
    }
}