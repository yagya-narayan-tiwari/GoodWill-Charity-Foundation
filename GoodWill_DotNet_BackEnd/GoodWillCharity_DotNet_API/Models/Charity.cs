using MongoDB.Bson.Serialization.Attributes;

namespace GoodWillCharity_DotNet_API.Models
{
    public class Charity
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }

        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string? NgoId { get; set; }
        public string? ProfilePicPath { get; set; }
        [BsonIgnore]
        public IFormFile? ImagesFile { get; set; }
    }
}
