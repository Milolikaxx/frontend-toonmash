import { useEffect, useState } from "react";
import { UserGetPostResponse } from "../../model/response/user_getpost_response";
import { UserService } from "../../services/userService";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";

function HomeAdmin() {
  const userService = new UserService();
  const [currentPage, setCurrentPage] = useState(1);
  const [userdata, setData] = useState<UserGetPostResponse[]>([]);
  const StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getAllUser();
        console.log(data?.length);

        setData(data!);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  });
  return (
    <>
      {userdata != null ? (
        <div className="w-screen h-full flex justify-start items-center flex-col">
          <h1 className="mt-32 mb-10 text-center font-sans text-4xl font-bold text-gray-900">
            All User
          </h1>
          {userdata.length <= 10 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4">
              {userdata.slice(0, 10).map((user) => (
                <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
                  <img className="h-48 w-48 object-cover" src={user?.img} />
                  <div className="mt-1">
                    <h2 className="text-white text-center">{user?.name}</h2>
                  </div>
                </article>
              ))}
            </div>
          ) : userdata.length > 10 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4">
                {userdata.map((user) => (
                  <article className=" rounded-md p-2 bg-black hover:scale-105 hover:shadow-md hover:shadow-black">
                    <img className="h-48 w-full object-cover" src={user?.img} />
                    <div className="mt-1">
                      <h2 className="text-white text-center">{user?.name}</h2>
                    </div>
                  </article>
                ))}
              </div>
              <StyledPagination
                className="flex justify-center pb-9 "
                count={Math.round(Number(userdata.length) / 10)}
                page={currentPage}
                onChange={(_event, value) => {
                  console.log(value);
                  setCurrentPage(value);
                }}
              />
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default HomeAdmin;
