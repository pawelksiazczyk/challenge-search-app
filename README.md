# Search App

A React application built with TypeScript and Vite, featuring search functionality for users and posts.

## Features

- Search for users and posts
- Pagination with customizable page size
- Responsive design using Tailwind CSS
- Efficient data fetching and caching with React Query
- Client-side routing with React Router
- Comprehensive test suite using Vitest and React Testing Library

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/pawelksiazczyk/challenge-search-app.git
   cd challenge-search-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Environment Variables

This project requires the following environment variable to be set:

- `VITE_API_BASE_URL`: The base URL for the API

Before running the app, create a `.env` file in the root directory of the project and add the following line:

```
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Note: The `.env` file is ignored by git to keep sensitive information out

### Running the App

Start the development server:

```
npm run dev
```

or

```
yarn dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

- `dev`: Start the development server
- `build`: Build the production-ready app
- `lint`: Run ESLint
- `preview`: Preview the built app
- `test`: Run tests
- `test:watch`: Run tests in watch mode
- `test:coverage`: Run tests with coverage report

## Testing

Run tests with:

```
npm run test
```

or

```
yarn test
```

For test coverage:

```
npm run test:coverage
```

or

```
yarn test:coverage
```
