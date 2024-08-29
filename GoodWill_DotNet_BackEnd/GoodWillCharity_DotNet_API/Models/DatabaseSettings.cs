namespace GoodWillCharity_DotNet_API.Models
{
    public class DatabaseSettings
    {
        public string? ConnectionString { get; set; }
        public string? DbName { get; set; }
        public string? NgoCollection { get; set; }
        public string? DonorCollection { get; set; }
        public string? AdminCollection {  get; set; }
        public string? CharityCollection { get; set; }
        public string? OrderCollection { get; set;}
    }
}
