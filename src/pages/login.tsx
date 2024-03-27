import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../services/Service";
import PacmanLoader from "react-spinners/PacmanLoader";
import { TextField } from "@mui/material";
import secureLocalStorage from "react-secure-storage";

function LoginPage() {
  const navigate = useNavigate();
  const inputUsername = useRef<HTMLInputElement>();
  const inputPass = useRef<HTMLInputElement>();
  const userService = new Service();
  const [msg, setMsg] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  function navigateToSignUp() {
    navigate("/signup");
  }
  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="relative hidden h-screen   md:flex md:w-2/5">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/toonmash-db-img.appspot.com/o/files%2Flogin.png?alt=media&token=520de6c9-7cf2-4a30-98cf-abd9f18f1ba7"
            alt=""
          />
        </div>
        <div className="flex md:w-3/5 justify-center  ">
          <div className="w-[400px] h-[400px] bg-white rounded-2xl shadow-2xl justify-start  flex flex-col">
            <div className="text-violet-500 text-3xl text-center uppercase potta-one-regular mt-5">
              TOONMASH
            </div>
            <div className="text-black font-bold text-2xl prompt-regular ml-10 mt-5">
              Sign in
            </div>
            <div className="text-black  text-sm font-light  prompt-regular ml-10 mt-5">
              Username
            </div>
            <TextField
              size="small"
              inputRef={inputUsername}
              InputProps={{
                sx: {
                  width: "80%",
                  bgcolor: "#E3D7FF",
                  color: "black",

                  ml: 5,
                },
              }}
            />
            <div className="text-black  text-sm font-light  prompt-regular ml-10 mt-5">
              Password
            </div>
            <TextField
              size="small"
              type="password"
              inputRef={inputPass}
              InputProps={{
                sx: {
                  width: "80%",
                  bgcolor: "#E3D7FF",
                  ml: 5,
                },
              }}
            />
            <div className="text-base  text-start text-red-600 ml-10 mt-2">
              {msg}
            </div>
            <div className="flex flex-row justify-center">
              {btnLoading ? (
                <button
                  disabled
                  className="flex mt-2 whitespace-nowrap bg-violet-500 rounded-3xl text-sm pl-4 pr-10 py-2.5 "
                >
                  <PacmanLoader color="#f8fafc" size={10} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setBtnLoading(true);
                    if ((inputUsername.current, inputPass.current)) {
                      btnLogin(
                        inputUsername.current?.value != undefined
                          ? inputUsername.current?.value
                          : "",
                        inputPass.current.value
                      );
                    } else {
                      setBtnLoading(false);
                    }
                  }}
                  type="button"
                  className="flex mt-2 whitespace-nowrap text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-3xl text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
              )}
            </div>
            <div className="flex flex-row justify-center">
              <div className="text-black  text-sm font-light   prompt-regular  mt-5">
                I don’t have an account ?
              </div>
              <a
                className="text-violet-600 text-sm font-normal prompt-regular ml-2 mt-5 cursor-pointer"
                onClick={() => {
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
    try {
      const user = await userService.login(username, password);
      if (user == null) {
        setMsg("Invalid username or password");
      } else {
        // localStorage.setItem("user", JSON.stringify(user));
        secureLocalStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  }
}

export default LoginPage;
