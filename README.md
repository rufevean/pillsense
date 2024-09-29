# Pillsense

Pillsense is a smart medication management system designed to help users manage their medication schedules efficiently. The system includes features for user registration, medication dispensers, real-time notifications, and more.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Authentication**: Secure user registration and login.
- **Medication Dispensers**: Manage multiple dispensers with slots for different medications.
- **Real-Time Notifications**: Get notified when it's time to take your medication.
- **Recommendations**: Receive medication recommendations based on user history.
- **Role-Based Access Control**: Different roles for admin, doctors, and patients.
- **Data Visualization**: Visualize medication adherence and other statistics.
- **Offline Support**: Access the application even without an internet connection.
- **Progressive Web App (PWA)**: Install the app on your device for a native-like experience.

## Installation

### Prerequisites

- Node.js
- MongoDB
#### Future Development Dependencies
- Redis (for caching)
- Kafka (for real-time notifications)

### Backend

1. Fork and Clone the repository:
    ```sh
    git clone https://github.com/yourusername/pillsense.git
    cd pillsense/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    # Edit .env to match your configuration
    ```

4. Start the server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user or log in with existing credentials.
3. Manage your medication dispensers, set intervals, and receive notifications.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

### Dispensers

- `GET /api/dispensers`: Get all dispensers.
- `POST /api/dispensers`: Create a new dispenser.
- `PUT /api/dispensers/:id`: Update a dispenser.
- `DELETE /api/dispensers/:id`: Delete a dispenser.

### Recommendations

- `POST /api/recommend`: Get medication recommendations.

## Technologies Used

- **Frontend**: React, Redux, Axios, Socket.IO, Chart.js
- **Backend**: Node.js, Express, MongoDB, Mongoose, Redis, Kafka
- **Authentication**: JWT, bcrypt
- **DevOps**: Docker, GitHub Actions

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
