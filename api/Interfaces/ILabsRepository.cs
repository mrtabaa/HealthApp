namespace api.Interfaces;
public interface ILabsRepository {
    Task<UserDto?> CreateLab(LabRegisterDto labIn);
    Task<UserDto?> LoginLab(LabLoginDto labIn);
    Task<LabRegisterDto> GetLab(string id);
    Task<List<LabRegisterDto>> GetLabs();
    Task DeleteLab(string id);
    Task<string?> UpdateLab(LabUpdateDto labDto);
}
