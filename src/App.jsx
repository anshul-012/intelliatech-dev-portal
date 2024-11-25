import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AddDev from "./pages/AddDev";
import ChangeStatus from "./pages/ChangeStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import UpdateDev from "./pages/updateDev";

const getAccessToken = () => {
  return JSON.parse(localStorage.getItem("ADMIN"))?.token;
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ADMIN">
          <Admin />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/admin",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ADMIN">
              <AddDev />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/change-status",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ADMIN">
              <ChangeStatus />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/update/:devId",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="ADMIN">
              <UpdateDev />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="contanter">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
