namespace api.Controllers;
public class UsersController : BaseApiController {
    private readonly IUsersRepository _usersRepository;
    public UsersController(IUsersRepository usersRepository) {
        _usersRepository = usersRepository;
    }

    //api/users/jsonObject
    [HttpPost]
    public async Task<ActionResult<AppUser>> CreateUser(AppUser userIn) =>
    await _usersRepository.CreateUser(userIn);

    //api/users
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() =>
    await _usersRepository.GetUsers();

    //api/users/3
    // [Authorize]
    // [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser?>> GetUser(string id) {
        AppUser user = await _usersRepository.GetUser(id);
        return user == null ? null : user; // improve the code by returning NotFound() instead of null
    }

}
