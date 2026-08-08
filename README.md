# AI Task Scheduler

AI-powered task management application designed to help users create, organize, prioritize, and manage their tasks with the assistance of artificial intelligence.

## Live Demo

[AI Task Scheduler](https://ai-task-scheduler-pink.vercel.app/)

## Overview

AI Task Scheduler is a full-stack web application that combines traditional task management functionality with AI-powered task creation.

The application allows users to manage their personal tasks, assign priorities and statuses, and use AI to generate structured tasks from a natural-language description.

The project was built to practice and demonstrate modern frontend and backend development, API integration, authentication, database interaction, and AI integration.

## Features

* User registration and login
* Create tasks
* Edit tasks
* Delete tasks
* Task status management
* Task priority management
* AI-powered task creation
* Dashboard for task management and overview
* Responsive user interface

## AI Features

The application integrates AI to simplify task creation.

Instead of manually entering every task detail, the user can describe what they need to accomplish in natural language and let the AI generate a structured task.

Example:

> "I need to prepare for a React interview."

The AI can transform the request into a structured task with relevant information that can then be managed through the application.

## Tech Stack

### Frontend

* React
* TypeScript
* Redux Toolkit
* React Router
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API

### Database & Authentication

* Supabase
* PostgreSQL

### AI

* Google Gemini API

### Deployment

* Vercel — frontend
* Render — backend

## Application Architecture

The application follows a client-server architecture:

```text
┌─────────────────────┐
│       React         │
│      Frontend       │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│       Express       │
│       Backend       │
└──────────┬──────────┘
           │
      ┌────┴─────┐
      ▼          ▼
┌──────────┐  ┌──────────────┐
│ Supabase │  │  Gemini API  │
│PostgreSQL│  │     AI       │
└──────────┘  └──────────────┘
```

## Project Structure

```text
AI-Task-Scheduler/
│
├── frontend/
│   ├── src/
│   └── ...
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── ...
│
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Supabase account
* Gemini API key

### Installation

Clone the repository:

```bash
git clone https://github.com/Serhiy8/AI-Task-Scheduler.git
```

Navigate to the project:

```bash
cd AI-Task-Scheduler
```

Install dependencies for the frontend and backend according to their respective package configurations.

### Environment Variables

Create environment files for the frontend and backend and provide the required configuration values.

Typical variables include:

```env
SUPABASE_URL=
SUPABASE_KEY=
GEMINI_API_KEY=
```

Use the actual variable names defined in the project configuration.

## Development

Start the frontend and backend development servers according to the scripts defined in their respective `package.json` files.

The frontend communicates with the Express backend through REST API endpoints.

## What I Practiced

This project allowed me to work with:

* Component-based React architecture
* TypeScript typing
* Global state management with Redux Toolkit
* Client-side routing
* REST API design and integration
* Authentication
* CRUD operations
* PostgreSQL database interaction
* Asynchronous operations
* AI API integration
* Error handling
* CORS configuration
* Environment variables
* Frontend and backend deployment
* Responsive UI development

## Future Improvements

Possible future improvements include:

* More advanced task filtering and sorting
* Additional dashboard statistics
* Improved AI task generation
* AI-assisted task prioritization
* More task management features
* Improved validation and error handling
* Additional UI/UX improvements

## Author

**Serhiy Markov**

Frontend / Full-Stack Developer

[GitHub](https://github.com/Serhiy8)
