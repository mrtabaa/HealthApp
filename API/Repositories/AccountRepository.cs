using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models;
using MongoDB.Driver;

namespace API.Repositories {
    public class AccountRepository : IAccountRepository {
        const string _databaseName = "HealthDb";
        const string _collectionName = "Users";
        private readonly IMongoCollection<AppUser> _collection;

        public AccountRepository(IMongoClient client) {
            var database = client.GetDatabase(_databaseName); //get database access
            _collection = database.GetCollection<AppUser>(_collectionName); //get a collectin to read documents from database
        }

        /* #region CRUD */

        // create/insert a user
        public async Task<AppUser> Register(RegisterDto registerDto) {

            if (await UserExists(registerDto.Username.ToLower()))
                return null;

            using var hmac = new HMACSHA512();

            if(registerDto.Email != null)
                registerDto.Email = registerDto.Email.ToLower();

            AppUser user = new AppUser {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                Email = registerDto.Email,
                Phone = registerDto.Phone
        };

            await _collection.InsertOneAsync(user);
            return user; //feedback? 
        }

        public async Task<AppUser> Login(LoginDto loginDto) {
            var user = await _collection.Find<AppUser>(u => u.Username == loginDto.Username.ToLower()).FirstOrDefaultAsync();

            //check username
            if (user == null)
                return null;

            //check password
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            if (user.PasswordHash.SequenceEqual(computeHash)) //compare hashed passwords. 
                return user;

            return null;
        }

        // delete a user by id
        public async Task DeleteUser(string id) =>
            await _collection.DeleteOneAsync<AppUser>(u => u.Id == id);

        // HELPERS
        private async Task<bool> UserExists(string username) {
            long count = await _collection.CountDocumentsAsync<AppUser>(u => u.Username == username);
            return count > 0 ? true : false; // at least one user with this username exists
        }
    }
}