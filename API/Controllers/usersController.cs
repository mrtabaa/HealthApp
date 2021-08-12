using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Controllers {
    public class UsersController : BaseApiController {
        private readonly UserService _userService;
        public UsersController(UserService userService) {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() =>
            await _userService.GetUsers();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<AppUser>> GetUser(string id) {
            AppUser user = await _userService.GetUser(id);
            return user == null ? null : user; // improve the code by returning NotFound() instead of null
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(string username, string password) {
            using var hmac = new HMACSHA512();

            AppUser user = new AppUser {
                Firstname = "Reza",
                Lastname = "Taba",
                Username = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };

            return await _userService.CreateUser(user);
        }

        // [HttpDelete]
        // public ActionResult<AppUser> DeletedUser(string id) => _userService.DeleteUser(id);
    }
}
