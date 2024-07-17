import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootPage() {
    return(
        <>
            <Header />
            <Outlet />
        </>
    );
}
export default RootPage;