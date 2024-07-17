import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useEffect, useMemo, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SaveIcon from "@mui/icons-material/Save";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Service } from "../services/Service";
function Header() {
  const service = useMemo(() => {
    return new Service();
  }, []);
  const navigate = useNavigate();
  const [selectMenu, setMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(selectMenu);
  const [openSnack, setOpenSnack] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [user, setUser] = useState<UserGetPostResponse | undefined>(undefined);
  const input = useRef<HTMLInputElement>();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };
  const toggleSnackBar = () => {
    setOpenSnack(!openSnack);
  };
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const userStr = secureLocalStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr.toString()));
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
    <>
      <AppBar position="absolute" sx={{ backgroundColor: "#2B2730" }}>
        <Toolbar className="flex flex-col items-center justify-start pt-3">
          <div className="w-full flex justify-between">
            <label
              className="ml-10 potta-one-regular text-4xl cursor-pointer"
              onClick={navigateToHome}
            >
              TOONMASH
            </label>
            {user?.type == 1 ? (
              <>
                <TextField
                  sx={{ width: "10%" }}
                  size="small"
                  inputRef={input}
                  prefix=""
                  InputProps={{
                    sx: {
                      pl: 1,
                      // borderStartStartRadius: 0,
                      // borderEndStartRadius: 0,
                      bgcolor: "white",
                    },
                    startAdornment: <AccessTimeIcon />,
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          if (input.current?.value) {
                            btnSave(+input.current?.value);
                          }
                        }}
                      >
                        <SaveIcon />
                      </IconButton>
                    ),
                  }}
                />
              </>
            ) : null}
            <div className="md:hidden">
              <IconButton onClick={() => toggleMenu()}>
                <MenuIcon className="text-white" />
              </IconButton>
            </div>
            <div className="hidden space-x-5 md:flex flex-row">
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

              {user ? (
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
                  <Menu
                    anchorEl={selectMenu}
                    onClick={handleClose}
                    open={open}
                    // onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile/" + user?.uid);
                      }}
                    >
                      Profile details
                    </MenuItem>
                    <MenuItem onClick={logout}>Sign out</MenuItem>
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
          </div>
          {openMenu ? (
            <ul className="w-full py-1 space-y-2 flex flex-col items-center md:hidden transition">
              <li
                className="w-full text-center mx-1 py-2 cursor-pointer hover:bg-violet-500 rounded-md transition"
                onClick={navigateToHome}
              >
                Home
              </li>
              <li
                className="w-full text-center mx-1 py-2 cursor-pointer hover:bg-violet-500 rounded-md transition"
                onClick={navigateToLeaderboard}
              >
                Leaderboard
              </li>
              {user ? (
                <>
                  <li
                    className="w-full text-center mx-1 py-2 cursor-pointer hover:bg-violet-500 rounded-md transition"
                    onClick={() => {
                      navigate("/profile/" + user?.uid);
                    }}
                  >
                    Profile details
                  </li>
                  <li
                    className="w-full text-center mx-1 py-2 cursor-pointer hover:bg-violet-500 rounded-md transition"
                    onClick={logout}
                  >
                    Sign out
                  </li>
                </>
              ) : (
                <li
                  className="w-full text-center mx-1 py-2 cursor-pointer hover:bg-violet-500 rounded-md transition"
                  onClick={navigateToSignIn}
                >
                  Sign in
                </li>
              )}
            </ul>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={toggleSnackBar}
      >
        <Alert
          onClose={toggleSnackBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
  async function btnSave(cooldown: number) {
    const aff = await service.setRule(cooldown);
    if (aff == 1) {
      setSnackMsg("Set cooldown success!");
      toggleSnackBar();
      console.log("success");
    } else {
      console.log("failed");
    }
  }
  function logout() {
    if (user) {
      secureLocalStorage.removeItem("user");
      setUser(undefined);
      navigate("/");
    }
  }
}

export default Header;
