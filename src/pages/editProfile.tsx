// import { useNavigate } from "react-router-dom";
import { Avatar, Button, Card, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function EditPage() {
  // const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center">
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
          <div className="flex flex-row mb-5 mt-10 ml-10">
            <ArrowBackIcon />
          </div>
          <div className="flex flex-col justify-center items-center">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src="https://via.placeholder.com/226x222"
            />
          </div>
          <div className="flex flex-col justify-start">
            {" "}
            <label className="text-black  text-sm font-thin prompt-regular ml-10 mt-5">
              Username
            </label>
            <TextField
              size="small"
              // inputRef={input}

              InputProps={{
                sx: {
                  width: "83%",
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,
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
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,
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
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,
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
                  bgcolor: "#BA9CFF ",
                  opacity: 0.2,
                  color: "black",
                  ml: 5,
                },
              }}
            />
            <div className="flex flex-row justify-center">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2B2730",
                  borderRadius: 50,
                  mt: 3,
                  width: "100px",
                  alignItems: "center",
                }}
              >
                save
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default EditPage;
