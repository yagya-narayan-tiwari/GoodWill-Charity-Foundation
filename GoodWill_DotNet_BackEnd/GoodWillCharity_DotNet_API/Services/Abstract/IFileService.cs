namespace GoodWillCharity_DotNet_API.Services.Abstract
{
    public interface IFileService
    {
        Tuple<int, string> SaveImage(IFormFile imageFile);
        string DeleteImage(string imageFileName);
    }
}
