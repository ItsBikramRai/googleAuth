import React from 'react'
import Layout from "./Layout/Layout"
import { NavLink } from "react-router-dom"
export default function PageNotFound() {
  return (
 <Layout>
     <div className="text-4xl bg-gray-300 min-h-screen text-white flex text-center justify-center h-30 flex-wrap content-center">
        <h1 className="p-5 w-full">PageNotFound</h1>
    <div className="p-5 w-full text-red-600 text-xl font-semibold ">
    <NavLink to="/">Go Back to Home</NavLink>
    </div>
    </div>
 </Layout>
  )
}
