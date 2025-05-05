[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Countries of the World
A modern web application that allows users to explore countries, view detailed information, and save their favorites.

# Table of Contents
- Overview
- Features
- Technologies Used
- Setup and Installation
- Usage
- Testing
- API Documentation
- Challenges and Solutions
- Deployment

# Overview
Countries of the World is a responsive web application that provides information about countries around the world. Users can search for specific countries, filter by region, view detailed information about each country, and save their favorite countries after creating an account.

# Features
- Country Exploration: Browse through all 195 countries with essential information
- Search Functionality: Find countries by name
- Region Filtering: Filter countries by continent
- Country Details: Get comprehensive information about each country
- User Authentication: Register, login, and maintain user profiles
- Favorites Management: Save, view, and manage favorite countries
- Responsive Design: Fully responsive interface for all devices

# Technologies Used
## Frontend
- React 19
- React Router DOM 7
- Tailwind CSS 
- Axios for API requests
- Context API for state management

## Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Testing
- Jest
- React Testing Library

## Development & Build Tools
- Vite
- Babel

# Setup and Installation
## Prerequisites
- Node.js
- npm
- MongoDB 

## Frontend Setup
## Clone the repository:

```bash
https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-Eshmika\
```

## Install dependencies:

```bash
npm install
```

## Start the development server:

```bash
npm run dev
```

## Backend Setup
## Navigate to the backend directory:

```bash
cd backend
```

## Install dependencies:

```bash
npm install
```

## Start the backend server:

```bash
npm run dev
```

# Usage
## Home Page
- View all countries in a grid layout
- Search for countries by name (requires at least 3 characters)
- Filter countries by region

## Country Details
- Click on any country card to view detailed information
- See additional data such as native name, population, capital, languages, currencies, and border countries
- Add/remove countries from favorites if logged in

## User Authentication
- Register with name, email, and password
- Log in with email and password
- User session persists using JWT tokens

## Favorites
- View all favorite countries in one place
- Remove countries from favorites
- Favorites are stored in the database and associated with your user account

# Testing
## Running Tests

```bash
npm test
```

# API Documentation
## External API
The application uses the REST Countries API to fetch country information.

Endpoints used:

- GET /v3.1/all - Get all countries
- GET /v3.1/name/{name} - Search for countries by name
- GET /v3.1/region/{region} - Filter countries by region
- GET /v3.1/alpha/{code} - Get country by code
Backend API

## Authentication
- POST /api/users - Register a new user
- POST /api/users/login - User login
- GET /api/users/profile - Get user profile (protected)
- PUT /api/users/profile - Update user profile (protected)

## Favorites
- GET /api/favorites - Get user's favorites (protected)
- POST /api/favorites - Add a country to favorites (protected)
- GET /api/favorites/:countryCode - Check if a country is favorited (protected)
- DELETE /api/favorites/:countryCode - Remove a country from favorites (protected)

# Challenges and Solutions
Challenge 1: Handling inconsistent data formats from the REST Countries API
Solution: Created helper functions to normalize data

Challenge 2: Creating a consistent experience across different device sizes
Solution: Utilized Tailwind CSS's responsive utilities and implemented a mobile-first approach

Challenge 3: Setting up Jest with Vite and handling component testing
Solution: Configured custom Jest setup for Vite and used React Testing Library for component tests

# Deployment
Vercel Deployment
```bash
https://af-assignment-02-frontend.vercel.app/
```