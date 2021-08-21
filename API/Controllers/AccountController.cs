using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
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
        public async Task<ActionResult<RegisterDto>> Register(RegisterDto registerDto) {
            var registeredUser = await _accountRepository.Register(registerDto);
            return registeredUser == null ? BadRequest("Username is taken.") : registerDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginDto>> Login(LoginDto loginDto) {
            var logedInUser = await _accountRepository.Login(loginDto);
            if (logedInUser == null)
                return Unauthorized("Invalid username or password!");

            return loginDto;
        }

        [HttpDelete("delete")]
        public async Task DeletedUser(string id) {
            await _accountRepository.DeleteUser(id);
        }
    }
}