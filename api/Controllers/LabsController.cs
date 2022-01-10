namespace api.Controllers;
public class LabsController : BaseApiController {
    private readonly ILabsRepository _labsRepository;
    public LabsController(ILabsRepository labsRepository) {
        _labsRepository = labsRepository;
    }

    //api/labs/jsonObject
    [HttpPost("register")]
    public async Task<ActionResult<LabRegisterDto>> Register(LabRegisterDto labIn) {
        var resultMessage = await _labsRepository.CreateLab(labIn);
        return resultMessage == null ? labIn : BadRequest(resultMessage);
    }

    // [HttpPost("login")]
    // public async Task<ActionResult<LabLoginDto>> Login(LabLoginDto labIn) {
    //     return await _labsRepository.LoginLab(labIn) == null
    //     ? BadRequest("Email is teken.") : labIn;
    // }


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
}
