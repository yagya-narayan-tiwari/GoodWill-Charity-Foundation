using GoodWillCharity_DotNet_API.Models;

namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface INgoService
    {
        Task<IEnumerable<Ngo>> GetAllAsyc();
        Task<Ngo> GetById(string id);
        Task CreateAsync(Ngo ngo);
        Task DeleteAsync(string id);
        Task UpdateAsync(string id, Ngo ngo);
        Task<Ngo> LoginNgo(string email, string password);
        string GenerateToken(Ngo ngo);

    }
}
