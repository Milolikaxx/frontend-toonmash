import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, CircularProgress, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { UserService } from "../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { PictureGetResponse } from "../model/pic_get_res";
import AddIcon from "@mui/icons-material/Add";
function ProfilePage() {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const userService = useMemo(() => {
    return new UserService();
  }, []);

  const data = useRef<UserGetPostResponse>();
  const pics = useRef<PictureGetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [own, setOwn] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user: UserGetPostResponse = JSON.parse(userStr);
          let uid = 0;
          if (user.uid == +id!) {
            data.current = user;
            uid = user.uid;
          } else {
            const res = await userService.getByID(+id!);
            data.current = res!;
            uid = +id!;
            setOwn(false);
          }
          if (user.type == 1) {
            setAdmin(true);
          }
          const pic = await userService.getPicByUID(+uid);
          pics.current = pic;
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
  }, [id, navigate, userService]);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="w-2/4 h-3/4 flex flex-col">
            {data.current != null ? (
              <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-center items-center">
                  <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={data.current.img}
                  />
                  {/* <img
                  className="w-56 h-56  rounded-full object-fit"
                  src={data.img}
                /> */}
                  <label className="text-4xl ml-5 text-black">
                    {data.current.name}
                  </label>
                </div>
                {own && (
                  <div className="flex flex-row justify-center items-center">
                    <button
                      onClick={() => {
                        navigate(`/editprofile/` + data.current?.uid);
                      }}
                      type="button"
                      className="flex whitespace-nowrap  text-white bg-pink-400 rounded-2xl  hover:ring-4 hover:ring-pink-200 text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      แก้ไข้โปรไฟล์ของฉัน
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            <hr className="h-px my-3 bg-gray-400"></hr>
            <div className="grid sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-4 lg:grid-col-3 lg:gap-4 xl:grid-cols-3 xl:gap-4 min-[1900px]:grid-cols-4  min-[1900px]:gap-3">
              {pics.current.length > 0 ? (
                pics.current.map((p) => (
                  <article>
                    <div className="aspect-square">
                      <div className="w-full overflow-hidden rounded-t-2xl">
                        <img
                          className="w-[300px] h-[250px] object-cover rounded-t-2xl cursor-pointer transition duration-300 hover:scale-110"
                          src={p.img}
                          alt=""
                          onClick={() => {
                            navigate(`/chart/` + p.pid);
                          }}
                        />
                      </div>

                      <div className=" flex  justify-between  border-red-300 border-2">
                        <div className="flex flex-row justify-center items-center">
                          <IconButton>
                            <FavoriteIcon sx={{ color: "#E966A0" }} />
                          </IconButton>
                          <div className=" text-black text-xl  text-center">
                            {p.totalScore}
                          </div>
                        </div>
                        {own && (
                          <>
                            <IconButton onClick={handleClick}>
                              <MoreVertIcon />
                            </IconButton>

                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>ลบ</MenuItem>

                              <MenuItem onClick={handleClose}>
                                เปลี่ยนรูป
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                ดูประวัติคะแนน
                              </MenuItem>
                            </Menu>
                          </>
                        )}
                        {isAdmin && (
                          <>
                            <IconButton onClick={handleClick}>
                              <MoreVertIcon />
                            </IconButton>

                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>ลบ</MenuItem>

                              <MenuItem onClick={handleClose}>
                                เปลี่ยนรูป
                              </MenuItem>

                              <MenuItem onClick={handleClose}>
                                ดูประวัติคะแนน
                              </MenuItem>
                            </Menu>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <></>
              )}
              {pics.current.length < 5 && own && (
                <div
                  onClick={() => navigate("/uploadpic")}
                  className="group h-[250px]  rounded-2xl border-4 border-violet-500 hover:bg-violet-500 transition flex justify-center items-center cursor-pointer "
                >
                  <AddIcon
                    className="group-hover:text-white"
                    sx={{ color: "#9575DE", fontSize: 150 }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
