//using GoodWillCharity_DotNet_API.Models;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace GoodWillCharity_DotNet_API.Util
//{
//    public class TokenGenrator<T> where T : T
//    {
//        private readonly IConfiguration configuration;
//        public TokenGenrator(IConfiguration cfg)
//        {
//            configuration = cfg;
//        }
//        public string GenrateToken(T obj)
//        {
//            var claims = new[]
//                {
//                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
//                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                    new Claim("UserId", obj.Id.ToString()),
//                    new Claim("ProName", p.ProductName.ToString())
//                };
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
//            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//            var token = new JwtSecurityToken(
//                configuration["Jwt:Issuer"],
//                configuration["Jwt:Audience"],
//                claims,
//                expires: DateTime.UtcNow.AddDays(1),
//                signingCredentials: singIn
//                );
//            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
//            return tokenValue;
//        }
//    }
//}
