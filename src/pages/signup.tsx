import { Avatar, Button, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../services/Service";
import secureLocalStorage from "react-secure-storage";

function SignUpPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const navigate = useNavigate();
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputPwd = useRef<HTMLInputElement>(null);
  const inputCPwd = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [errPwdMsg, setErrPwdMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function navigateToLogin() {
    navigate("/login");
  }
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files?.[0];
    if (!newImage) {
      console.error("No image file selected");
      return;
    }
    setImage(newImage);
  };
  useEffect(() => {
    const updateImagePreviews = () => {
      if (!image) {
        setImageUrl(undefined);
        return;
      }
      const newImagePreview = URL.createObjectURL(image);
      setImageUrl(newImagePreview);
    };
    updateImagePreviews();
  }, [image]);
  return (
    <>
      <div className="w-full h-full" style={{ backgroundColor: "#2B2730" }}>
        <div className="grid grid-cols-5">
          <div className="relative hidden lg:col-span-2 lg:flex">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/toonmash-db-img.appspot.com/o/files%2Fimage%204.png?alt=media&token=14d55f33-d75e-49b9-a409-4fcc7b750777"
              alt=""
              className="h-screen w-full object-cover"
            />
          </div>
          <div className="flex col-span-full lg:col-span-3 flex-col justify-center items-center">
            <div className="text-violet-500 text-3xl text-center uppercase potta-one-regular my-2">
              TOONMASH
            </div>
            <div className="w-full sm:w-96 bg-white  flex flex-col sm:rounded-3xl ">
              <div className="text-black font-bold text-3xl prompt-reg rounded-xl mt-5 text-center">
                Sign Up
              </div>
              <div className="mt-5 flex flex-row justify-center">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={imageUrl}
                ></Avatar>
                <label htmlFor="file" className="addPic bg-white rounded-full hover:bg-violet-500 group transition">
                  {imageUrl ? (
                    <ChangeCircleIcon
                      className="group-hover:text-white transition"
                      sx={{ color: "#9575DE", fontSize: 30 }}
                    />
                  ) : (
                    <AddCircleIcon
                      className="group-hover:text-white"
                      sx={{ color: "#9575DE", fontSize: 30 }}
                    />
                  )}
                </label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="text-black  text-sm font-light prompt-regular ml-10 mt-5">
                Username
              </div>
              <TextField
                size="small"
                inputRef={inputUsername}
                error={errMsg!=""}
                required
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
              <div className="text-black  text-sm font-light  prompt-regular ml-10 mt-5">
                Name
              </div>
              <TextField
                size="small"
                inputRef={inputName}
                error={errMsg!=""}
                required
                InputProps={{
                  sx: {
                    width: "83%",
                    bgcolor: "#E3D7FF",

                    color: "black",
                    ml: 5,
                  },
                }}
              />
              <div className="text-black text-sm font-light  prompt-regular ml-10 mt-5">
                Password
              </div>
              <TextField
                size="small"
                inputRef={inputPwd}
                type="password"
                error={errPwdMsg!="" || errMsg!=""}
                required
                InputProps={{
                  sx: {
                    width: "83%",
                    bgcolor: "#E3D7FF",

                    color: "black",
                    ml: 5,
                  },
                }}
              />
              <div className="text-black  text-sm font-light  prompt-regular ml-10 mt-5">
                Comfirm Password
              </div>
              <TextField
                size="small"
                inputRef={inputCPwd}
                type="password"
                error={errPwdMsg!="" || errMsg!=""}
                required
                InputProps={{
                  sx: {
                    width: "83%",
                    bgcolor: "#E3D7FF",
                    color: "black",
                    ml: 5,
                  },
                }}
              />
              <div className="text-base  text-start text-red-600 ml-10">
                {errMsg ? errMsg : errPwdMsg}
              </div>
              <div className="flex flex-row justify-center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#9575DE",
                    borderRadius: 50,
                    mt: 2,
                    width: "100px",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setErrPwdMsg("")
                    setErrMsg("")
                    if (inputUsername.current?.value && inputPwd.current?.value && inputCPwd.current?.value && inputName.current?.value) {
                      if (inputPwd.current?.value == inputCPwd.current?.value) {
                        register(inputUsername.current!.value,inputPwd.current!.value,inputName.current!.value);
                      }else{
                        setErrPwdMsg("Passwords do not match. Please try again")
                      }
                    }else{
                      console.log(2);
                      setErrMsg("Please complete all required fields to proceed")
                    }
                  }}
                >
                  Sign Up
                </Button>
              </div>
              <div className="flex flex-row justify-center mb-5">
                <div className="text-black  text-sm font-light  prompt-regular  mt-5">
                  I have an account ?
                </div>
                <div
                  className="text-violet-500  text-sm font-normal  prompt-regular ml-2 mt-5 cursor-pointer"
                  onClick={() => {
                    navigateToLogin();
                  }}
                >
                  Sign in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  async function register(username : string,pwd:string,name:string) {
    let url = "https://www.svgrepo.com/download/192244/man-user.svg";
    if (image) {
      url = await service.uploadPic(image);
    }
    const user = await service.register(username,name,pwd,url);
    if (user) {
      secureLocalStorage.setItem("user", JSON.stringify(user));
      navigate("/")
      // localStorage.setItem("user", JSON.stringify(user));
    }
  }
}
export default SignUpPage;
