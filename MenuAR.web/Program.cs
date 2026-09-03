var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseDefaultFiles();

app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "application/octet-stream"
});


/*
   =========================================
   MENU ROUTES
   =========================================

   Routes such as:

   /menu
   /menu/burgers
   /menu/salads
   /menu/entries

   all use the same index.html.

   JavaScript then reads the URL and
   decides which category to display.
*/

app.MapFallbackToFile("index.html");


var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

app.Run($"http://0.0.0.0:{port}");