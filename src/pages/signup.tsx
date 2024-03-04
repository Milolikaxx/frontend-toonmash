import { Button, TextField } from "@mui/material";

function SignUpPage() {
  return (
    <>
      <div
        className="flex w-screen h-screen justify-center items-center"
        style={{ backgroundColor: "#2B2730" }}
      >
        <div className="relative hidden h-screen   md:flex md:w-2/5">
          <img src="src\assets\image 4.png" alt="" />
        </div>
        <div className="flex md:w-3/5  flex-col justify-center items-center">
          <label className="text-violet-500 text-3xl text-center uppercase potta-one-regular mt-5 mb-10">
            TOONMASH
          </label>
          <div className=" w-3/6 h-auto bg-white  flex flex-col">
            <label className="text-black font-bold text-3xl prompt-reg rounded-xl shadow-2xl  ml-10 mt-5 text-center">
              Sign Up
            </label>

            <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
              Username
            </label>
            <TextField
              size="small"
              // inputRef={input}

              InputProps={{
                sx: {
                  width: "83%",
                  bgcolor: "#E3D7FF",

                  color: "black",
                  display: "flex",
                  justifyContent: "center",
                  ml: 5,
                },
              }}
            />
            <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
              Name
            </label>
            <TextField
              size="small"
              // inputRef={input}

              InputProps={{
                sx: {
                  width: "83%",
                  bgcolor: "#E3D7FF",

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
              // inputRef={input}
              type="password"
              InputProps={{
                sx: {
                  width: "83%",
                  bgcolor: "#E3D7FF",

                  color: "black",
                  ml: 5,
                },
              }}
            />
            <label className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
              Comfirm Password
            </label>
            <TextField
              size="small"
              // inputRef={input}
              type="password"
              InputProps={{
                sx: {
                  width: "83%",
                  bgcolor: "#E3D7FF",

                  color: "black",
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
              >
                Sign Up
              </Button>
            </div>
            <div className="flex flex-row justify-center mb-5">
              <label className="text-black  text-sm font-thin  prompt-regular  mt-5">
                I have an account ?
              </label>
              <a
                className="text-violet-500  text-sm font-thin  prompt-regular ml-2 mt-5"
                onClick={() => {
                  console.log("login");
                }}
              >
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
