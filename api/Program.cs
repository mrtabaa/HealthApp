

#region Add services to the container.

var builder = WebApplication.CreateBuilder(args);

// AUTO-GENERATED CODES //
builder.Services.AddControllers();

// ADDED CODES //
// MongoDbSettings
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection(nameof(MongoDbSettings)));
builder.Services.AddSingleton<IMongoClient>(serviceProvider => {
    var uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(uri.ConnectionString);
});

// Repositories
builder.Services.AddSingleton<ILabsRepository, LabsRepository>();
#endregion

// Others
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader()
        .AllowAnyMethod().WithOrigins("https://localhost:4200"));
});

#region Configure the HTTP request pipeline.

var app = builder.Build();

if (app.Environment.IsDevelopment()) {

}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

#endregion