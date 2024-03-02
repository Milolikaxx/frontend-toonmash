import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ProfilePage from "./pages/profile";
import HomeAdmin from "./pages/Admin/homeAdmin";
const routers = createBrowserRouter([
  {
    // path: "/toonmash/",
    // element: </>,
    // children: [
    //   { path: "/", element: </> },
    //   { path: "/movie/:name", element: </> },
    // ],
    // errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/homeadmin", element: <HomeAdmin /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
