import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PatientMain from "./pages/Patient-main/Patient-main";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/patient",
    element: <PatientMain />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
