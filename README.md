# FooBooLoo Game Frontend

This project is the front-end implementation of the FooBooLoo Game, allowing users to create custom FizzBuzz games, start sessions, and play the game while interacting with the back-end API. The front-end is built using React with TypeScript and integrates with a .NET 8 Web API.

## Table of Contents

- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Running Tests](#running-tests)
- [Dockerization](#dockerization)
- [Project Structure](#project-structure)

## Installation

To set up the project, follow these steps:

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/FBL-frontend.git
cd FBL-frontend
```

**2. Install all the necessary packages in the root directory**
```bash
npm install
```

## Running the Development Server

To start the development server and run the application locally:

```bash
npm run dev
```
The application will be available at http://localhost:5173

### Building for Production
To build the project for production, use the following command:
```bash
npm run build
```
The production-ready files will be generated in the dist directory.

### Running Tests
To run all the tests for the project:
```bash
npm test
```
This command will execute unit and integration tests using Jest and React Testing Library.

## Dockerization
To containerize the front-end application and run it using Docker, follow these steps:

**1. Build the Docker image**
```bash
docker build -t FBL-frontend .
```

**2. Run the Docker container**
```bash
docker run -p 3000:80 FBL-frontend
```

The application will be available at http://localhost:3000.

## Project Structure
```bash
src/
│
├── api/
│   └── api.ts
│
├── components/
│   ├── GameForm.tsx
│   ├── GameList.tsx
│   ├── Session.tsx
│   └── SessionResults.tsx
│
├── features/
│   ├── gamesSlice.ts
│   ├── sessionSlice.ts
│   └── store.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Game.tsx
│   └── SessionPage.tsx
│
├── App.tsx
└── main.tsx
```
- **api/**: Contains the API interaction logic using Axios.
- **components/**: Reusable components for forms, lists, and sessions.
- **features/**: Redux slices for managing state related to games and sessions.
- **pages/**: Pages corresponding to different routes in the application.
- **App.tsx**: The main application component that sets up routing.
- **main.tsx**: The entry point of the application.

## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) for more details.
