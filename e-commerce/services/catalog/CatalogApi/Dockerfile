FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY . ./
RUN dotnet restore "CatalogApi.csproj"
RUN dotnet publish "CatalogApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
RUN apt-get update && apt-get install -y curl
WORKDIR /app
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "CatalogApi.dll"]
