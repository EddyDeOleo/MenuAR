FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["MenuAR.web.csproj", "."]
RUN dotnet restore "MenuAR.web.csproj"

COPY . .
RUN dotnet build "MenuAR.web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MenuAR.web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "MenuAR.web.dll"]FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["MenuAR.web.csproj", "."]
RUN dotnet restore "MenuAR.web.csproj"

COPY . .
RUN dotnet build "MenuAR.web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MenuAR.web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "MenuAR.web.dll"]