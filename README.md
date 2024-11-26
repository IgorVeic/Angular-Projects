# Angular-Projects
A collection of Angular projects that highlights my journey and skills in building dynamic and scalable web applications.

# Vice City Cars 🚗
Vice City Cars is a feature-rich web application designed to facilitate car enthusiasts in buying, selling, and comparing cars effortlessly. Built with modern technologies, this app ensures a seamless and intuitive user experience.

# Features ✨
- Search and Filter Cars: Search for cars with advanced filters such as price range, fuel type, transmission type, and color.
- Sell Cars: Add cars for sale with easy-to-use forms (protected by authentication).
- Compare Cars: Compare multiple cars side-by-side to find the perfect match.
- Secure Transactions: Payment gateway integrated for smooth and secure payments.
- Responsive Design: Fully responsive layout using Angular Material for enhanced usability on any device.
- Authentication and Authorization: Secure login and registration for personalized experiences, with route protection for sensitive actions.


# Technologies Used 💻

# Frontend:
- **Angular:** Component-driven frontend framework for dynamic and scalable UI.
- **Angular Material:** Pre-built components for a sleek and modern design.

# Backend:
- **NestJS:** Robust backend framework for creating scalable server-side applications.
- **TypeORM:** Advanced ORM for seamless integration with PostgreSQL.

# Database:
**PostgreSQL:** Reliable and powerful relational database for storing car, user, and transaction data.

# Documentation
- The backend API for Vice City Cars is documented using **Swagger** for easy reference and testing.
- Access the Swagger UI: Once the backend server is running, navigate to **http://localhost:3000/api** to explore the API documentation.

# Application Setup Instructions 🚀
To initialize the Vice City Cars application, follow these steps:

# Backfill the Cars Data:

- Open the Swagger UI by navigating to http://localhost:3000/api.
- Locate the endpoint: POST /api/cars/backfill.
- Click **Try it out** and then **Execute** to populate the database with initial car data.
- Verify that the cars have been added successfully by checking the database.

**1. Start the Backend Server:**

- Open a terminal and navigate to the server directory.
- Run the following command **npm run start:dev** to start the server in development mode.

**2. Start the Frontend Application:**

- Open another terminal and navigate to the Car-Dealership-App directory.
- Run the following command ng **serve** to start the Angular app.

**3. Access the Application:**

The frontend will be available at **http://localhost:4200**.
The backend API can be accessed at **http://localhost:3000**.
