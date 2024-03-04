import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userService";
import { TextField } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const inputUsername = useRef<HTMLInputElement>();
  const inputPass = useRef<HTMLInputElement>();
  const userService = new UserService();
  const [msg, setMsg] = useState("");
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
          <div className="w-[400px] h-[400px] bg-white rounded-2xl shadow-2xl justify-start  flex flex-col">
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
            <label className="text-base  text-start text-red-600 ml-10 mt-2">
              {msg}
            </label>
            <div className="flex flex-row justify-center">
              <button
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
                type="button"
                className="flex mt-2 whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-3xl text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
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
    if (res == null) {
      setMsg("Invalid username or password");
      console.log("Invalid username or password");
    } else {
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/");
    }
  }
}

export default LoginPage;
