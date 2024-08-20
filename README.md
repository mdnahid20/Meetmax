# Meetmax

## Project Name

Meetmax

## Overview

Meetmax is a web application built using ASP.NET Core, designed to facilitate user management and provide an intuitive user interface. This README provides instructions for setting up, running, and testing the application.

## Requirements

- **.NET SDK**: 8.0 or later
- **SQL Server**: For database management
- **IDE/Editor**: Visual Studio, Visual Studio Code, or any other .NET-compatible IDE

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone https://github.com/mdnahid20/Meetmax.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd Meetmax
    ```

3. **Restore Dependencies**

    Restore the NuGet packages required for the project:

    ```bash
    dotnet restore
    ```

4. **Configure Database**

    - Ensure SQL Server is running and accessible.
    - Update the connection string in the `appsettings.json` file to match your database configuration.

5. **Add User Secrets**

    If using user secrets for local development, set up your secrets using the `UserSecretsId` specified in the `.csproj` file:

    ```bash
    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "YourConnectionStringHere"
    ```

## Running the Application

1. **Start the Application**

    Run the application using the .NET CLI:

    ```bash
    dotnet run
    ```

2. **Access the Application**

    Open your browser and navigate to `http://localhost:5000` (or the port specified in your project settings).

## Testing

- **Unit Tests**: Run unit tests with the following command:

    ```bash
    dotnet test
    ```

- **Integration Tests**: Add and run integration tests as needed.

## Tools Used

- **.NET SDK**: For backend development and running the application.
- **Entity Framework Core**: For database access and management.
- **SQL Server**: For database storage.

## License

This project is licensed under the [MIT License](LICENSE).

## Notes

- Ensure that the `.NET SDK` and `SQL Server` versions are compatible with the project's requirements.
- The application uses Entity Framework Core to interact with SQL Server; make sure the database is properly set up and accessible.
