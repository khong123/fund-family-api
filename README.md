# Fund Family

Fund Family - Family Budget Management API

# Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Components](#components)
4. [How to Run](#how-to-run)
    1. [Prerequisites](#prerequisites)
    2. [Installation](#installation)
    3. [Configuration](#configuration)
    4. [Running the Server](#running-the-server)
    4. [Running Unit Tests](#running-unit-tests)

## Introduction
Fund Family is a family budget management API designed to facilitate financial management within families by providing tools for budgeting, expense tracking, allowance management, chore assignments, and more. It utilizes a Clean Architecure approach with Node.js and MongoDB as the core technologies.

## Architecture Overview
1. The system follows the Clean Architecture principles as defined by [Robert C. Martin], which emphasize the separation of concerns through distinct layers: Entities, Use Cases, Interface Adapters, and Frameworks & Drivers. Each layer builds upon the one below it, following the Dependency Rule for communication.
![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
2. Node.js, specifically Express.js, is utilized as the backend framework to build RESTful API endpoints, with MongoDB serving as the primary database for storing application data in Fund Family, a family budget management API that uses Clean Architecture.
3. JWT (JSON Web Tokens) are used for authentication and authorization purposes, with different roles (parent, family member) assigned varying permissions and access levels.
4. Unit testing conducted includes testing API endpoints using Sinon and Chai to simulate HTTP requests and verify responses, as well as testing use cases and repositories to ensure proper functionality and data handling within the application.

## Components
#### Entities Layer
Consist of business entities such as User, Allowance, Expense, Chore, etc
#### Use Cases Layer
Manage data flow between entities and includes functionalities such as AddUser, ManageAllowance, TrackExpense, DeleteExpenseById, AssignChore, etc.
#### Interface Adapters Layer
Convert data between internal use cases/entities and external agencies like the database and web interface. This includes controllers such as AuthController, UserController, AllowanceController, ExpenseController, ChoreController, etc.
#### Frameworks & Drivers Layer
Composed of external frameworks/tools like Express.js for web routing, MongoDB for database interactions, Redis for caching (if applicable), etc.

## How to Run
#### Prerequisites
Before running the project, ensure that you have the following installed:
1. Node.js (v14.x or higher)
2. MongoDB
3. Redis
#### Installation
1. Clone the repository to your local machine:
```sh
git clone https://github.com/khong123/fund-family-api.git
```
2. Navigate to the project directory:
```sh
cd fund-family-api
```
3. Install the required npm packages:
```sh
npm install
```
#### Configuration
1. Copy the .env.example file to create a new .env file:
```sh
cp .env.example .env
```
2. Open the .env file in a text editor and replace the placeholder values with your actual configuration. Here's an example of how the .env file might look after configuration:
```sh
CLIENT_URL=http://localhost:3000
PORT=3000
HOST=localhost
MONGO_URL=mongodb://localhost:27017/fund_family
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key_here
JWT_ACCESS_EXPIRATION_MILLISECONDS=3600000
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password_here
```
#### Running the Server
To run the server in development mode:
```sh
npm run dev
```
To run the server in production mode:
```sh
npm run start
```
#### Running Unit Tests
To run the unit tests for the project:
```sh
npm run test
```

[Robert C. Martin]: <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
