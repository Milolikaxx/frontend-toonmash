import { Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userService";

function LoginPage() {
  const navigate = useNavigate();
  const inputUsername = useRef<HTMLInputElement>();
  const inputPass = useRef<HTMLInputElement>();
  const userService = new UserService();
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
            <TextField
              size="small"
              inputRef={inputUsername}
              InputProps={{
                sx: {
                  width: "80%",
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,
                  color: "black",
                  ml: 5,
                },
              }}
            />
            <label className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
              Password
            </label>
            <TextField
              size="small"
              type="password"
              inputRef={inputPass}
              InputProps={{
                sx: {
                  width: "80%",
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,

                  ml: 5,
                },
              }}
            />
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
                onClick={() => {
                  if ((inputUsername.current, inputPass.current)) {
                    btnLogin(
                      inputUsername.current?.value != undefined
                        ? inputUsername.current?.value
                        : "",
                      inputPass.current.value
                    );
                  }
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
                className="text-violet-500  text-sm font-thin  prompt-regular ml-2 mt-5 cursor-pointer"
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
  async function btnLogin(username: string, password: string) {
    const res = await userService.login(username, password);
    console.log(res);
    if (res.type == 0) {
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/");
    } else if (res.type == 1) {
      localStorage.setItem("admin", JSON.stringify(res));
      navigate("/homeAdmin");
    } else {
      console.log("Invalid username or password");
    }
  }
}

export default LoginPage;
