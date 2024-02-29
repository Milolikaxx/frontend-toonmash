import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const fav = searchParams.get("fav");

  function navigateToSignUp() {
    navigate("/signup");
  }
  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="relative hidden h-screen   md:flex md:w-2/5">
          <img src="src\assets\login.png" alt="" />
        </div>
        <div className="flex md:w-3/5 justify-center  ">
          <div className=" w-96 h-96 bg-white rounded-2xl shadow-2xl justify-start  flex flex-col">
            <label className="text-violet-500 text-3xl text-center uppercase potta-one-regular mt-5">
              TOONMASH
            </label>
            <label className="text-black font-bold text-2xl prompt-regular ml-10 mt-5">
              Sign in
            </label>
            <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
              Username
            </label>
            <input
              type="text"
              className=" w-80 h-10 bg-violet-500 bg-opacity-10 rounded justify-center ml-10 text-black"
            ></input>
            <label className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
              Password
            </label>
            <input
              type="password"
              className=" w-80 h-10 bg-violet-500 bg-opacity-10 rounded justify-center ml-10 text-black"
            ></input>
            <div className="flex flex-row justify-center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9575DE",
                  borderRadius: 50,
                  mt: 3,
                  width: "100px",
                  alignItems: "center",
                }}
              >
                Sign in
              </Button>
            </div>
            <div className="flex flex-row justify-center">
              <label className="text-black  text-sm font-thin  prompt-regular  mt-5">
                I don’t have an account ?
              </label>
              <a
                className="text-violet-500  text-sm font-thin  prompt-regular ml-2 mt-5"
                onClick={() => {
                  console.log("sign up");
                  navigateToSignUp();
                }}
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
