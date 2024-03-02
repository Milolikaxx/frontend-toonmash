import FavoriteIcon from "@mui/icons-material/Favorite";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
// import { useNavigate } from "react-router-dom";
function ProfilePage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const fav = searchParams.get("fav");

  // function navigateToUpload() {
  //   navigate("/login");
  // }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-2/4 h-3/4 flex  flex-col boder-2 border-gray-700">
          <div className="flex flex-row justify-between border-2 border-red-700">
            <div className="flex flex-row justify-center items-center">
              <img
                className="w-56 h-56  rounded-full object-cover"
                src="https://i.pinimg.com/564x/d1/78/9d/d1789da9a233f4e80d054abd3999f086.jpg"
                alt=""
              />
              <label className="text-4xl ml-5 text-black">Test</label>
            </div>
            <div className="flex flex-row justify-center items-center">
              <button
                type="button"
                className="flex whitespace-nowrap  text-white bg-pink-400 rounded-2xl  hover:ring-4 hover:ring-pink-200 text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                แก้ไข้โปรไฟล์ของฉัน
              </button>
            </div>
          </div>
          <hr className="h-px my-3 bg-gray-400"></hr>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4">
            <div className="flex flex-col aspect-square">
              <img
                className="w-[300px] h-[250px] object-cover rounded-2xl "
                src="https://i.pinimg.com/564x/a2/bd/0c/a2bd0c51798e428f8f506a7d12775bc3.jpg"
                alt=""
              />
              <div className="w-full h-7 flex flex-row justify-between border-red-300 border-2 whitespace-nowrap">
                <div className="flex flex-row items-center">
                  <IconButton>
                    <FavoriteIcon sx={{ color: "#E966A0" }} />
                  </IconButton>
                  <div className=" text-black text-xl ">99</div>
                </div>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>ลบ</MenuItem>
                  <MenuItem onClick={handleClose}>เปลี่ยนรูป</MenuItem>
                  <MenuItem onClick={handleClose}>ดูประวัติคะแนน</MenuItem>
                </Menu>
              </div>
            </div>
            <div className="flex flex-col aspect-square">
              <img
                className="w-[300px] h-[250px] rounded-2xl object-cover "
                src="https://i.pinimg.com/564x/23/56/ad/2356ad72766799cde4cbfb3208012259.jpg"
                alt=""
              />
              <div className="w-full h-7 flex flex-row justify-between border-red-300 border-2 whitespace-nowrap">
                <div className="flex flex-row items-center">
                  <IconButton>
                    <FavoriteIcon sx={{ color: "#E966A0" }} />
                  </IconButton>
                  <div className=" text-black text-xl ">99</div>
                </div>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>ลบ</MenuItem>
                  <MenuItem onClick={handleClose}>เปลี่ยนรูป</MenuItem>
                  <MenuItem onClick={handleClose}>ดูประวัติคะแนน</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="flex flex-col aspect-square">
              <img
                className="w-[300px] h-[250px] rounded-2xl object-cover  "
                src="https://i.pinimg.com/564x/c3/c2/0b/c3c20b91a78dc473952265058c10be24.jpg"
                alt=""
              />
              <div className="w-full h-7 flex flex-row justify-between border-red-300 border-2 whitespace-nowrap">
                <div className="flex flex-row items-center">
                  <IconButton>
                    <FavoriteIcon sx={{ color: "#E966A0" }} />
                  </IconButton>
                  <div className=" text-black text-xl ">99</div>
                </div>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose}>ลบ</MenuItem>
                  <MenuItem onClick={handleClose}>เปลี่ยนรูป</MenuItem>
                  <MenuItem onClick={handleClose}>ดูประวัติคะแนน</MenuItem>
                </Menu>
              </div>
            </div>

            <div className="h-[250px] rounded-2xl border-4 border-violet-500 flex justify-center items-center cursor-pointer">
              <img className="h-fit" src="src\assets\addmedia.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
