import { useEffect, useMemo, useRef, useState } from "react";
import { UserGetPostResponse } from "../../model/response/user_getpost_response";
import { Service } from "../../services/Service";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function HomeAdmin() {
  const navigate = useNavigate();
  const userService = useMemo(() => {
    return new Service();
  }, []);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const userdata = useRef<UserGetPostResponse[]>([]);
  const user = useRef<UserGetPostResponse | undefined>(undefined);
  const StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userStr = secureLocalStorage.getItem("user");
        if (userStr) {
          user.current = JSON.parse(userStr.toString());
        } else {
          navigate("/");
        }
        const data = await userService.getAllUser();
        if (data) {
          userdata.current = data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate, userService]);

  return (
    <>
      {loading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <div className="w-full h-full flex justify-start items-center flex-col">
          <h1 className="mt-24 mb-10 text-center font-sans text-4xl font-bold text-gray-900">
            All User
          </h1>
          {userdata.current.length <= 10 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4">
              {userdata.current.slice(0, 10).map((user) => (
                <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
                  <img
                    className="h-48 w-48 object-cover"
                    key={user.uid}
                    src={user?.img}
                  />
                  <div className="mt-1">
                    <h2 className="text-white text-center">{user?.name}</h2>
                  </div>
                </article>
              ))}
            </div>
          ) : userdata.current.length > 10 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4">
                {userdata.current.map((user) => (
                  <article
                    className=" rounded-md p-2 bg-black transition hover:scale-105 hover:shadow-md hover:shadow-black cursor-pointer"
                    onClick={() => {
                      navigate("/profile/" + user.uid);
                    }}
                  >
                    <img
                      className="h-48 w-full object-cover"
                      key={user.uid}
                      src={user?.img}
                    />
                    <div className="mt-1">
                      <h2 className="text-white text-center">{user?.name}</h2>
                    </div>
                  </article>
                ))}
              </div>
              <StyledPagination
                className="flex justify-center pb-9 "
                count={Math.round(+userdata.current.length / 10)}
                page={currentPage}
                onChange={(_event, value) => {
                  console.log(value);
                  setCurrentPage(value);
                }}
              />
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default HomeAdmin;
