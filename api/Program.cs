var builder = WebApplication.CreateBuilder(args);

#region Add services to the container.

// auto-generated codes
builder.Services.AddControllers();
builder.Services.AddApplicationServices();

// added codes

#endregion 

#region Configure the HTTP request pipeline.

var app = builder.Build();

if (app.Environment.IsDevelopment())
{

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

#endregion