import React from 'react'
import Layout from "../Layout/Layout"
import { Link, NavLink } from "react-router-dom"

export default function GoogleAuthError() {
  return (
   <Layout>
     <div className="flex flex-wrap justify-center text-center max-h-screen items-center">
        <h1 className="mt-40 text-4xl font-medium">Error login... </h1>
        <NavLink to={"/"} className={'w-full mt-20 text-red-500 font-semibold'} >Go Back Home</NavLink>
     </div>
   </Layout>
  )
}
