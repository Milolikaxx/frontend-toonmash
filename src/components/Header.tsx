import { AppBar, Toolbar, Avatar, Menu, MenuItem } from "@mui/material";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useEffect, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Header() {
  const navigate = useNavigate();
  const [selectMenu, setMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(selectMenu);
  const user = useRef<UserGetPostResponse | undefined>(undefined);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  useEffect(() => {
    const userStr = secureLocalStorage.getItem("user");
        if (userStr) {
          user.current = JSON.parse(userStr.toString()); 
        }
  }, []);

  function navigateToHome() {
    navigate("/");
  }
  function navigateToLeaderboard() {
    navigate("/leaderboard");
  }
  function navigateToSignIn() {
    navigate("/login");
  }

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "#2B2730", py: 0.2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <label
          className="ml-10 potta-one-regular text-4xl cursor-pointer"
          onClick={navigateToHome}
        >
          TOONMASH
        </label>
        <div className="space-x-5 flex-row flex">
          <button
            onClick={navigateToHome}
            type="button"
            className="flex whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-md  text-sm px-5 py-2.5 text-center "
          >
            Home
          </button>
          <button
            onClick={navigateToLeaderboard}
            type="button"
            className="flex whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-md  text-sm px-5 py-2.5 text-center "
          >
            Leaderboard
          </button>

          {user.current?.type == 0 ? (
            <>
              <button
                onClick={handleClick}
                type="button"
                className="flex whitespace-nowrap  text-white   text-sm text-center justify-center items-center"
              >
                <Avatar src={user.current.img} />
                <h1 className="ml-2">{user.current.name}</h1>
                <ArrowDropDownIcon />
              </button>
              <Menu
                anchorEl={selectMenu}
                onClick={handleClose}
                open={open}
                // onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/profile/" + user.current?.uid);
                  }}
                >
                  โปรไฟล์ของฉัน
                </MenuItem>
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </Menu>
            </>
          ) : user.current?.type == 1 ? (
            <>
              <button
                onClick={handleClick}
                type="button"
                className="flex whitespace-nowrap  text-white   text-sm text-center justify-center items-center"
              >
                <Avatar src={user.current.img} />
                <h1 className="ml-2">{user.current.name}</h1>
                <ArrowDropDownIcon />
              </button>
              <Menu
                anchorEl={selectMenu}
                onClick={handleClose}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/editprofile/" + user.current?.uid);
                  }}
                >
                  แก้ไขโปรไฟล์ของฉัน
                </MenuItem>
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </Menu>
            </>
          ) : (
            <button
              onClick={navigateToSignIn}
              type="button"
              className="flex whitespace-nowrap  text-white bg-violet-600 hover:bg-violet-500 transition duration-300 rounded-md  text-sm px-5 py-2.5 text-center "
            >
              Sign in
            </button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
  function logout() {
    if (user) {
      secureLocalStorage.removeItem("user");
      user.current = undefined
      navigate("/");
    }
  }
}

export default Header;
