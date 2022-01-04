using System.Collections.Generic;

using System.Threading.Tasks;
using API.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace API.Repositories {
    public class UsersRepository : IUsersRepository {
        const string _databaseName = "HealthDb";
        const string _collectionName = "Users";
        private readonly IMongoCollection<AppUser> _collection;

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

        // replace a user
        public async Task ReplaceUser(string id, AppUser userIn) =>
            await _collection.ReplaceOneAsync<AppUser>(u => u.Id == id, userIn);

        // update a user
        public async Task UpdateUser(string id, AppUser userIn) =>
            await _collection.UpdateOneAsync<AppUser>(u => u.Id == id, userIn.Username = "Tania");

        /* #endregion CRUD*/
    }
}