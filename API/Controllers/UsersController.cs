using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    public class UsersController : BaseApiController {
        private readonly IUsersRepository _userRepository;

        public UsersController(IUsersRepository usersRepository) {
            _userRepository = usersRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() =>
            await _userRepository.GetUsers();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<AppUser>> GetUser(string id) {
            AppUser user = await _userRepository.GetUser(id);
            return user == null ? null : user; // improve the code by returning NotFound() instead of null
        }
    }
}
