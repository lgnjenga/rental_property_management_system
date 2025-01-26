# Rental Property Managament System

# Express.js Project Setup

This repository contains the setup and configuration for an Express.js application that can run in both local and development environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Environment Variables](#environment-variables)
5. [Links](#links)
6. [API Documentation](#api-documentation)
7. [License](#license)

## Prerequisites

Before starting the setup, ensure that you have the following tools installed on your local machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm (Node Package Manager)**: Comes with Node.js, but can be updated separately if necessary.

## Installation

Follow these steps to get the project running:

1. Clone the repository:

   ```bash
   git clone https://github.com/lgnjenga/rental_property_management_system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rental_property_management_system
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file based on the `.env.example` provided in the root directory, and update the variables as needed for your environment.

## Running the Project

To run the project in different environments:

### Local Environment

1. Ensure all dependencies are installed (`npm install`).
2. Run the server locally:
   ```bash
   npm start
   ```

The application will be available at [http://localhost:3000](http://localhost:5000).

### Development Environment

1. For development mode with auto-reloading, use:
   ```bash
   npm run dev
   ```

This will start the application with nodemon to auto-reload the server on code changes.

## Environment Variables

The following environment variables can be configured in the `.env` file:

- `PORT`: Port to run the Express server (default is `3000`).
- `DB_URI`: Database URI for connecting to your database (e.g., MongoDB).
- `SECRET_KEY`: Secret key for session management or JWT.

Refer to `.env.example` for a template.

## Links

- **GitHub Repository**: [https://github.com/lgnjenga/rental_property_management_system.git](https://github.com/lgnjenga/rental_property_management_system.git)
- **Google Slides**: [Presentation Link](https://docs.google.com/presentation/d/1_URVGNHNCIDckFzIS6DVzAGVhsU7BEntVSLvWaH_ZPs/edit?usp=sharing)
- **API Documentation**: [API Docs Link](https://documenter.getpostman.com/view/11639956/2sAYQgg81K)
- **Video Presentation**: [Video Link](https://www.youtube.com/watch?v=rQlyloNuYRw)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
