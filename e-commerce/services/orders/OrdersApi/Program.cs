using Microsoft.EntityFrameworkCore;
using OrdersApi.Data;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicyName = "EcommerceCorsPolicy";

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<OrdersContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("OrdersDatabase")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(CorsPolicyName);
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
