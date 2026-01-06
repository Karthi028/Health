TEchStacks:

Core: React.js
Styling: Tailwind CSS
Routing: React Router (v6+)
Notifications: React Hot Toaster
Authentication: JWT via HTTP-only Cookies
Architecture: Component-based UI
has seperate HealthDashboard and Me Profile 

The application uses Protected Routes to ensure that sensitive pages are only accessible to authenticated users. It checks for a valid session before rendering components.

Rather than storing tokens in localStorage, this project utilizes Cookies for storing JSON Web Tokens, providing a more secure layer against XSS attacks.
The project is organized into reusable UI components, making the codebase scalable and easy to maintain.

Deployment URL = https://healthchek.netlify.app/