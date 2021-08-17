using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace API.Repositories {
    public class UsersRepository : IUsersRepository {
        const string _databaseName = "HealthDb";
        const string _collectionName = "Users";
        private readonly IMongoCollection<AppUser> _collection;

        public UsersRepository() { }
        public UsersRepository(IMongoClient client) {
            var database = client.GetDatabase(_databaseName); //get database access
            _collection = database.GetCollection<AppUser>(_collectionName); //get a collectin to read documents from database
        }

        /* #region CRUD */

        // get ALl users
        public async Task<List<AppUser>> GetUsers() =>
            await _collection.Find(new BsonDocument()).ToListAsync();

        // get One user
        public async Task<AppUser> GetUser(string id) =>
            await _collection.Find<AppUser>(user => user.Id == id).FirstOrDefaultAsync();


        // create/insert a user
        public async Task<AppUser> CreateUser(RegisterDto registerDto) {

            if(await UserExists(registerDto.Username.ToLower())) 
                return null;

            using var hmac = new HMACSHA512();

            AppUser user = new AppUser {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _collection.InsertOneAsync(user);
            return user; //feedback? 
        }

        // replace a user
        public void ReplaceUser(string id, AppUser userIn) =>
            _collection.ReplaceOne<AppUser>(u => u.Id == id, userIn);

        // update a user
        public void UpdateUser(string id, AppUser userIn) =>
            _collection.UpdateOne<AppUser>(u => u.Id == id, userIn.Username = "Tania");

        // delete a user by id
        public void DeleteUser(string id) =>
            _collection.DeleteOne(u => u.Id == id);

        // delete a user by object
        public void DeleteUser(AppUser userIn) =>
            _collection.DeleteOne(u => u.Id == userIn.Id);

        /* #endregion CRUD*/

        // HELPERS
        private async Task<bool> UserExists(string username) {
            long count = await _collection.CountDocumentsAsync<AppUser>(u => u.Username == username);
            return count > 0 ? true : false; // at least one user with this username exists
        }
    }
}