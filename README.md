E-commerce Cart Application using router concept

-- Overview: This is a React-based e-commerce cart application where users can browse products, add items to their cart, view and modify quantities, and see price totals.
-- Tech Stack: The application uses React, React Router, and Axios for data fetching from a sample API.
-- API Integration: Product data is fetched from https://fakestoreapi.com/products using Axios in Home.jsx.
-- Routing: The app uses React Router for navigation with routes to the home page, cart, and a fallback page for unknown routes.
-- Cart Management: Users can add items to the cart, increase or decrease item quantities, and remove items directly from the cart.
-- Price Calculation: Cart totals are calculated dynamically, including a 10% discount applied on the checkout summary in Cart.jsx.
-- Error Handling: API errors and loading states are handled in Home.jsx with appropriate error and loading messages.
-- Styling: The app is styled using Tailwind CSS for a simple, responsive UI.
-- Start the App: Run npm install to install dependencies and npm start to launch the app in development mode on http://localhost:3000.