using MongoDB.Bson.Serialization.Attributes;

namespace GoodWillCharity_DotNet_API.Models
{
    public class CommonProperties
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
       // [BsonRequired]
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone {  get; set; }
        public string? Password { get; set; }
        public string? Role {  get; set; }
       
        public string? ProfilePicPath { get; set; }
        [BsonIgnore]
        public IFormFile? ImagesFile { get; set; }
    }
}
