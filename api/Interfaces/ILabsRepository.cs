namespace api.Repositories;
public interface ILabsRepository {
    Task<LabRegisterUpdateDto?> CreateLab(LabRegisterUpdateDto labIn);
    Task<LabRegisterUpdateDto> GetLab(string id);
    Task<List<LabRegisterUpdateDto>> GetLabs();
    Task DeleteLab(string id);
    Task<LabRegisterUpdateDto> UpdateLab(LabRegisterUpdateDto labDto);
}
