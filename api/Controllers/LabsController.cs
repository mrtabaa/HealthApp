namespace api.Controllers;
public class LabsController : BaseApiController {
    private readonly ILabsRepository _labsRepository;
    public LabsController(ILabsRepository labsRepository) {
        _labsRepository = labsRepository;
    }

    //api/labs/jsonObject
    [HttpPost("register")]
    public async Task<ActionResult<LabRegisterUpdateDto>> Register(LabRegisterUpdateDto labIn) {
        return await _labsRepository.CreateLab(labIn) == null
        ? BadRequest("Name is teken.") : labIn;
    }

    //api/labs
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LabRegisterUpdateDto>>> GetLabs() =>
        await _labsRepository.GetLabs();

    //api/labs/3
    // [Authorize]
    // [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<LabRegisterUpdateDto?>> GetLab(string id) {
        LabRegisterUpdateDto lab = await _labsRepository.GetLab(id);
        return lab == null ? null : lab; // improve the code by returning NotFound() instead of null
    }

    // [Authorize]
    [HttpDelete("{id}")]
    public async Task DeleteLab(string id) =>
        await _labsRepository.DeleteLab(id);

    // [Authorize]
    [HttpPatch("update")]
    public async Task<ActionResult?> UpdateLab(LabRegisterUpdateDto updateDtoIn) =>
        // UpdateOne updates values
        // returns True if user already exists to fire BadRequest or OK
        await _labsRepository.UpdateLab(updateDtoIn) == null ? BadRequest("Name is teken.") : Ok("Success");
}
