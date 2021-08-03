using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize]
    //use ControllerBase for API 
    //use Controller     for Views and/or API
    public class UsersController : ControllerBase {
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

        [HttpPost]
        public ActionResult<AppUser> CreateUser(AppUser user) =>
            _userService.CreateUser(user);

        // [HttpDelete]
        // public ActionResult<AppUser> DeletedUser(string id) => _userService.DeleteUser(id);
    }
}
