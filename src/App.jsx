import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile"
import HealthDashboard from "./pages/HealthDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const routes = [
  {
    path: '/',
    element: <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: '/HealthDashboard',
    element: <ProtectedRoute><HealthDashboard /></ProtectedRoute>
  },


]

const App = () => {

  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  })

  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  )
}

export default App