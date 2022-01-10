namespace api.Repositories;
public interface ILabsRepository {
    Task<string?> CreateLab(LabRegisterDto labIn);
    Task<LabLoginDto?> LoginLab(LabLoginDto labIn);
    Task<LabRegisterDto> GetLab(string id);
    Task<List<LabRegisterDto>> GetLabs();
    Task DeleteLab(string id);
    Task<string?> UpdateLab(LabUpdateDto labDto);
}
