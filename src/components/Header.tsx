import { AppBar, Toolbar, Avatar, Menu, MenuItem } from "@mui/material";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [selectMenu, setMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(selectMenu);
  const [user, setUser] = useState<UserGetPostResponse>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!));
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
    <AppBar position="absolute" sx={{ backgroundColor: "#2B2730", py: 0.5 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <label className="ml-10 potta-one-regular text-4xl">TOONMASH</label>
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

          {user?.type == 0 ? (
            <>
              <button
                onClick={handleClick}
                type="button"
                className="flex whitespace-nowrap  text-white   text-sm text-center justify-center items-center"
              >
                <Avatar src={user.img} />
                <h1 className="ml-2">{user.name}</h1>
                <ArrowDropDownIcon />
              </button>
              <Menu anchorEl={selectMenu} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/profile/" + user.uid);
                  }}
                >
                  โปรไฟล์ของฉัน
                </MenuItem>
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </Menu>
            </>
          ) : user?.type == 1 ? (
            <>
              <button
                onClick={handleClick}
                type="button"
                className="flex whitespace-nowrap  text-white   text-sm text-center justify-center items-center"
              >
                <Avatar src={user.img} />
                <h1 className="ml-2">{user.name}</h1>
                <ArrowDropDownIcon />
              </button>
              <Menu anchorEl={selectMenu} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/editprofile/" + user.uid);
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
      localStorage.removeItem("user");
      setUser(undefined);
      navigate("/");
    }
  }
}

export default Header;
