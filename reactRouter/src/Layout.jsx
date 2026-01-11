import React from "react";
import { Outlet } from "react-router";
import { Header, Footer, Home } from "./components";

function Layout(){
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}

export default Layout;