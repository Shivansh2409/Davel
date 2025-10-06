# Davel - AI-Powered Collaborative Coding Platform

Davel is a real-time collaborative coding platform designed to enhance team development workflows. It features an integrated AI assistant to help write and debug code, Google Docs-style simultaneous editing, and instant team chat. The platform leverages Web Containers to spin up live Node.js development servers in the cloud, eliminating the need for local setup.

## Features

-   🤖 **AI-Powered Development**: Get help from an integrated AI to write code, debug issues, or learn new concepts. Discuss the AI's suggestions directly with your team in the chat.
-   ⚡ **Truly Live Code Editing**: Work on the same files simultaneously with your team. All changes are saved automatically to a MongoDB database.
-   💬 **Real-Time Collaboration**: Chat with your team instantly. All conversations are saved, so you never lose context.
-   🚀 **Instant Dev Server**: Spin up a live Node.js server in the cloud with a single click, thanks to Web Containers.

## Tech Stack

### Frontend

-   **Framework**: React
-   **Styling**: Tailwind CSS
-   **Real-time Communication**: Socket.IO Client
-   **Core Tech**: Web Containers API

### Backend

-   **Framework**: Node.js, Express.js
-   **Database**: MongoDB
-   **Real-time Communication**: Socket.IO
-   **AI Integration**: Google Generative AI

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js
-   npm

### Installation

1.  Clone the repo
    ```sh
    git clone [https://github.com/shivansh2409/davel.git](https://github.com/shivansh2409/davel.git)
    ```

2.  **Backend Setup**
    -   Navigate to the backend directory:
        ```sh
        cd backend
        ```
    -   Install NPM packages:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `backend` directory and add the following environment variables:
        ```env
        PORT=your_port
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        FRONT_END=http://localhost:3000
        ```

3.  **Frontend Setup**
    -   Navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    -   Install NPM packages:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `frontend` directory and add the following environment variable:
        ```env
        VITE_API_URL=http://localhost:your_backend_port
        ```

### Available Scripts

#### Frontend

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Lints the source code.
-   `npm run preview`: Serves the production build locally.

#### Backend

-   `npm test`: Runs the test suite.
