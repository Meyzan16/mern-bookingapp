import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./UI/Header"

export const Layout = () => {
  return (
    <div className="pt-6 px-6 md:px-10  xl:px-24 min-h-screen flex flex-col pb-20">
        <Header />
        <Outlet />
    </div>
  )
}
