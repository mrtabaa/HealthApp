using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace API.Services {
    public class UserService {
        private readonly IMongoCollection<AppUser> _collection; //collectionName instance
        public UserService(IDatabaseSettings dbSettings) {
            var client = new MongoClient(dbSettings.ConnectionString); //get client by connecting to db (comes from startup.cs)
            var database = client.GetDatabase(dbSettings.DatabaseName); //get database access

            _collection = database.GetCollection<AppUser>("Users"); //get a collectin to read documents from
        }

        /* #region CRUD */

        // create/insert a user
        public AppUser CreateUser(AppUser user) {
            _collection.InsertOne(user);
            return user; //feedback? 
        }

        // get ALl users
        public async Task<List<AppUser>> GetUsers() => 
            await _collection.Find(new BsonDocument()).ToListAsync();

        // get One usera
        public async Task<AppUser> GetUser(string id) =>
            await _collection.Find<AppUser>(user => user.Id == id).FirstOrDefaultAsync();


        // replace a user
        public void ReplaceUser(string id, AppUser userIn) =>
            _collection.ReplaceOne<AppUser>(u => u.Id == id, userIn);

        // update a user
        public void UpdateUser(string id, AppUser userIn) => 
            _collection.UpdateOne<AppUser>(u => u.Id == id, userIn.firstname = "Tania");

        // delete a user by id
        public void DeleteUser(string id) =>
            _collection.DeleteOne(u => u.Id == id);

        // delete a user by object
        public void DeleteUser(AppUser userIn) =>
            _collection.DeleteOne(u => u.Id == userIn.Id);

        /* #endregion */
    }
}