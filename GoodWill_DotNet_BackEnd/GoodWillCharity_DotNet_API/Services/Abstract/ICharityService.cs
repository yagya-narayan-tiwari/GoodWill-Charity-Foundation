using GoodWillCharity_DotNet_API.Models;

namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface ICharityService
    {
        Task<IEnumerable<Charity>> GetAllAsyc();
        Task<Charity> GetById(string id);
        Task CreateAsync(Charity charity);
        Task DeleteAsync(string id);
        Task UpdateAsync(string id, Charity charity);
        Task<IEnumerable<Charity>> GetByNgoId(string id);
        //Task<Charity> LoginCharity(string email, string password);
        //string GenrateToken(Charity obj);
    }
}
