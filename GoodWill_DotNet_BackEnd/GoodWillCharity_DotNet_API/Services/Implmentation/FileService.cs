using GoodWillCharity_DotNet_API.Services.Abstract;

namespace GoodWillCharity_DotNet_API.Services.Implmentation
{
    public class FileService:IFileService
    {
        private readonly IWebHostEnvironment _environment;

        public FileService(IWebHostEnvironment env)
        {
            _environment = env;
        }

        public Tuple<int, string> SaveImage(IFormFile imageFile)
        {
            try
            {
                var contentPath = _environment.ContentRootPath;
                var path = Path.Combine(contentPath, "Uploads");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                var ext = Path.GetExtension(imageFile.FileName).ToLowerInvariant();
                var allowedExtensions = new[] { ".jpg", ".png", ".jpeg" };
                if (!allowedExtensions.Contains(ext))
                {
                    return new Tuple<int, string>(0, $"Only {string.Join(", ", allowedExtensions)} extensions are allowed.");
                }

                var uniqueString = Guid.NewGuid().ToString();
                var newFileName = uniqueString + ext;
                var fileWithPath = Path.Combine(path, newFileName);

                using (var stream = new FileStream(fileWithPath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }

                return new Tuple<int, string>(1, newFileName);
            }
            catch (Exception)
            {
                return new Tuple<int, string>(0, "An error occurred while saving the image.");
            }
        }

        public string DeleteImage(string imageFileName)
        {
            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads", imageFileName);
            if (File.Exists(path))
            {
                File.Delete(path);
                return "Images is Deleted";
            }
            return "No Image Found";
        }
    }
}
