
#region Add services to the container.

using api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// AUTO-GENERATED CODES //
builder.Services.AddControllers();

// From customized ServiceExtensions (Extensions folder) for a claen maintained code //
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddRepositoryServices(builder.Configuration);

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