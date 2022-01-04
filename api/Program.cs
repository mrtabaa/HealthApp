
#region Add services to the container.
var builder = WebApplication.CreateBuilder(args);

// auto-generated codes
builder.Services.AddControllers();

// added codes
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));
builder.Services.AddSingleton<IMongoClient>(serviceProvider => {
    var uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(uri.ConnectionString);
});
#endregion


#region Configure the HTTP request pipeline.

var app = builder.Build();

if (app.Environment.IsDevelopment()) {

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

#endregion