// import { useNavigate } from "react-router-dom";
import { Avatar, Card, CircularProgress, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useNavigate } from "react-router-dom";

function EditPage() {
  const navigate = useNavigate();

  const inputUsername = useRef<HTMLInputElement>();
  const inputname = useRef<HTMLInputElement>();
  const inputPass = useRef<HTMLInputElement>();
  const inputPassCom = useRef<HTMLInputElement>();
  const userdata = useRef<UserGetPostResponse>();
  const [loading, setLoading] = useState(true);

  function navigateBack() {
    navigate(-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user: UserGetPostResponse = JSON.parse(userStr);
          console.log(user);
          userdata.current = user;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card
            className="flex flex-col"
            sx={{
              backgroundColor: "white",
              width: "400px",
              height: "600px",
              justifyContent: "start",
              boxShadow: 3,
              borderRadius: "30px",
            }}
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
                src={userdata.current?.img}
              />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
                Username
              </label>
              <TextField
                size="small"
                inputRef={inputUsername}
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
              <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
                Name
              </label>
              <TextField
                size="small"
                inputRef={inputname}
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
              <label className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
                Password
              </label>
              <TextField
                size="small"
                inputRef={inputPass}
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
              <label className="text-black  text-sm font-thin  prompt-regular ml-10 mt-5">
                Comfirm Password
              </label>
              <TextField
                size="small"
                inputRef={inputPassCom}
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
                  onClick={() => {}}
                  type="button"
                  className="flex mt-5 whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-3xl text-sm px-5 py-2.5 text-center "
                >
                  save
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}

export default EditPage;
