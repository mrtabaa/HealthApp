using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace API.Controllers {
    public class UsersController : BaseApiController {
        private readonly IUsersRepository _userRepository;
        private readonly IMongoCollection<AppUser> _collection;

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

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto) {
            var user = await _userRepository.CreateUser(registerDto);
            return user == null ? BadRequest("Username is taken.") : user;
        }

        // [HttpDelete]
        // public ActionResult<AppUser> DeletedUser(string id) => _userService.DeleteUser(id);
    }
}
