using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Interfaces
{
    public interface IAccountRepository
    {
        Task<RegisterDto> Register(RegisterDto registerDto);
        Task<LoginDto> Login(LoginDto loginDto);
        Task DeleteUser(string id);
    }
}