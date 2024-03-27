// import { useNavigate } from "react-router-dom";
import { Avatar, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useEffect, useMemo, useRef, useState } from "react";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Service } from "../services/Service";
import RingLoader from "react-spinners/RingLoader";

function EditPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const navigate = useNavigate();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const inputUsername = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputPwd = useRef<HTMLInputElement>(null);
  const inputCPwd = useRef<HTMLInputElement>(null);
  const userdata = useRef<UserGetPostResponse>();
  const [loading, setLoading] = useState(true);

  function navigateBack() {
    navigate(-1);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = secureLocalStorage.getItem("user");
        if (userStr) {
          const user: UserGetPostResponse = JSON.parse(userStr.toString());
          userdata.current = user;
          setImageUrl(user.img)
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {loading ? (
          <RingLoader color="#7c3aed" />
        ) : (
          <div
            className="flex flex-col justify-start mt-14 w-[400px] h-[600px] rounded-2xl md:border shadow-none md:shadow-lg"
          >
            <div className="flex flex-row mb-5 mt-10 ml-10 r">
              <ArrowBackIcon
                className="cursor-pointer"
                onClick={navigateBack}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={imageUrl}
                />
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
            <div className="flex flex-col justify-start">
              <div className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
                Username
              </div>
              <TextField
                size="small"
                inputRef={inputUsername}
                required
                defaultValue={userdata.current?.username}
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
              <div className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
                Name
              </div>
              <TextField
                size="small"
                inputRef={inputName}
                required
                defaultValue={userdata.current?.name}
                InputProps={{
                  sx: {
                    width: "83%",
                    bgcolor: "#E3D7FF",

                    color: "black",
                    ml: 5,
                  },
                }}
              />
              <div className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
                Password
              </div>
              <TextField
                size="small"
                inputRef={inputPwd}
                // defaultValue={data?.password}
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
              <div className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
                Comfirm Password
              </div>
              <TextField
                size="small"
                inputRef={inputCPwd}
                // value={data?.password}
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
                <button
                  onClick={() => {
                    if (inputUsername.current?.value.trim() && inputName.current?.value.trim()) {
                      if (inputPwd.current?.value.trim()) {
                        if (inputPwd.current.value == inputCPwd.current?.value) {
                          save(inputUsername.current.value.trim(),inputPwd.current.value.trim(),inputName.current.value.trim())
                        }
                      }else{
                        save(inputUsername.current.value.trim(),"",inputName.current.value.trim())
                      }
                    }
                  }}
                  type="button"
                  className="flex mt-5 whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-3xl text-sm px-5 py-2.5 text-center "
                >
                  save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
  async function save(username : string,pwd:string,name:string) {
    let url = "";
    if (image) {
      url = await service.uploadPic(image);
    }
    const res = await service.saveEdit(userdata.current!.uid,username,name,pwd,url);
    if (res == 1) {
      const user = await service.getByID(userdata.current!.uid)
      // secureLocalStorage.removeItem("user");
      secureLocalStorage.setItem("user", JSON.stringify(user));
      navigate("/profile/" + userdata.current!.uid)
      window.location.reload()
    }
  }
}

export default EditPage;
