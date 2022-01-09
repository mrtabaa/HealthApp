namespace api.Controllers;
public class UsersController : BaseApiController {
    private readonly IUsersRepository _usersRepository;
    public UsersController(IUsersRepository usersRepository) {
        _usersRepository = usersRepository;
    }

    //api/users/jsonObject
    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register(AppUserDto userIn) {
        return await _usersRepository.CreateUser(userIn) == null
        ? BadRequest("Username is teken.") : userIn;
    }

    //api/users
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUserDto>>> GetUsers() =>
        await _usersRepository.GetUsers();

    //api/users/3
    // [Authorize]
    // [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUserDto?>> GetUser(string id) {
        AppUserDto user = await _usersRepository.GetUser(id);
        return user == null ? null : user; // improve the code by returning NotFound() instead of null
    }

    // [Authorize]
    [HttpDelete("{id}")]
    public async Task DeleteUser(string id) =>
        await _usersRepository.DeleteUser(id);

    // [Authorize]
    [HttpPatch("update")]
    public async Task<ActionResult?> UpdateUser(AppUserDto userDto) =>
        // UpdateOne updates values
        // returns True if user already exists to fire BadRequest or OK
        await _usersRepository.UpdateOne(userDto) ? BadRequest("Username is teken.") : Ok("Success");
}
