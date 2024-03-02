import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem } from "@mui/material";
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

  const [admin, setAdmin] = useState<UserGetPostResponse>();

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("admin")!));
  }, []);
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#2B2730", py: 0.5 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <label className="ml-10 potta-one-regular text-4xl">TOONMASH</label>
        <div className="space-x-5">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9575DE",

              width: "100px",
            }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9575DE",

              width: "150px",
            }}
          >
            Leaderboard
          </Button>
          {user != null ? (
            <>
              <Button onClick={handleClick}>
                <Avatar src="/static/images/avatar/3.jpg" />
                <h1 className="ml-5">{user.name}</h1>
                <ArrowDropDownIcon />
              </Button>
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
          ) : admin != null ? (
            <>
              <Button onClick={handleClick}>
                <Avatar src="/static/images/avatar/3.jpg" />
                <h1 className="ml-5">{admin.name}</h1>
                <ArrowDropDownIcon />
              </Button>
              <Menu anchorEl={selectMenu} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  โปรไฟล์ของฉัน
                </MenuItem>
                <MenuItem onClick={logout}>ออกจากระบบ</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#9575DE",

                width: "100px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign in
            </Button>
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
    } else if (admin) {
      localStorage.removeItem("admin");
      setAdmin(undefined);
      navigate("/");
    }
  }
}

export default Header;
