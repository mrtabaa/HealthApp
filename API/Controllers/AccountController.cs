using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository){
            _accountRepository = accountRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
            var user = await _accountRepository.Register(registerDto);
            return user == null ? BadRequest("Username is taken.") : user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginDto) {
            var user = await _accountRepository.Login(loginDto);
            if (user == null)
                return Unauthorized("Invalid username or password!");

            return user;
        }

        [HttpDelete("delete")]
        public async Task DeletedUser(string id) {
            await _accountRepository.DeleteUser(id);
        }
    }
}