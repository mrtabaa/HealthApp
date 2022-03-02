namespace api.Controllers;
public class LabsController : BaseApiController {
    private readonly ILabsRepository _labsRepository;
    public LabsController(ILabsRepository labsRepository) {
        _labsRepository = labsRepository;
    }

    #region Account
    const string takenEmailOrPhone = "Email or/and Phone is taken.";
    const string InvalidLoginInfo = "Invalid username or password!";

    //api/labs/jsonObject
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(LabRegisterDto labIn) {
        var user = await _labsRepository.CreateLab(labIn);
        return user == null ? BadRequest(takenEmailOrPhone) : user;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LabLoginDto labIn) {
        var logedInUser = await _labsRepository.LoginLab(labIn);
        if (logedInUser == null)
            return Unauthorized(InvalidLoginInfo);
        return logedInUser;
    }

    #endregion Account

    #region LabsManagement

    //api/labs
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LabRegisterDto>>> GetLabs() =>
        await _labsRepository.GetLabs();

    //api/labs/3
    // [Authorize]
    // [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<LabRegisterDto?>> GetLab(string id) {
        LabRegisterDto lab = await _labsRepository.GetLab(id);
        return lab == null ? null : lab; // improve the code by returning NotFound() instead of null
    }

    // [Authorize]
    [HttpDelete("{id}")]
    public async Task DeleteLab(string id) =>
        await _labsRepository.DeleteLab(id);

    // [Authorize]
    [HttpPatch("update")]
    public async Task<ActionResult<LabUpdateDto>> UpdateLab(LabUpdateDto updateDtoIn) {
        // UpdateOne updates values
        // returns Null if user already exists to fire BadRequest or OK
        var resultMessage = await _labsRepository.UpdateLab(updateDtoIn);
        return resultMessage == null ? updateDtoIn : BadRequest(resultMessage);
    }
    #endregion LabsManagement
}
