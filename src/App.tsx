import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
const routers = createBrowserRouter([
  {
    // path: "/toonmash",
    // element: </>,
    // children: [
    //   { path: "/", element: </> },
    //   { path: "/movie/:name", element: </> },
    // ],
    // errorElement: <ErrorPage />,
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
