import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

export default function Layout() {
    return (
        <>
        <Header />
        <Box height="calc(100vh - 60px)" paddingTop="60px" bgcolor="#fcfcfc">
            <Outlet />
        </Box>
        </>
    )
}