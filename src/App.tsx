import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import HomePage from "./pages/Home";
import RootPage from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProfilePage from "./pages/profile";
import HomeAdmin from "./pages/Admin/homeAdmin";

import EditPage from "./pages/editProfile";
import LeaderboardPage from "./pages/Leaderboard";
import UploadImgPage from "./pages/UploadImg";
const routers = createBrowserRouter([
  {
    path: "",
    element: <RootPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/uploadpic", element: <UploadImgPage /> },
      { path: "/profile/:id", element: <ProfilePage /> },
      { path: "/homeadmin", element: <HomeAdmin /> },
      { path: "/editProfile/:id", element: <EditPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
