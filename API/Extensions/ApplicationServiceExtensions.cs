using API.Interfaces;
using API.Repositories;
using API.Services;
using API.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.Configure<MongoDbSettings>(config.GetSection(nameof(MongoDbSettings)));
            services.AddSingleton<IMongoClient>(serviceProvider => {
                var uri = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;
                return new MongoClient(uri.ConnectionString);
            });


            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IAccountRepository, AccountRepository>();

            return services;
        }
    }
}