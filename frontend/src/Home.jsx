import React from "react";
import Layout from "./Layout/Layout";

import { useContext } from "react";
import { AuthContext } from "./contextAPI/AuthContext";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const { auth, isVerified } = useContext(AuthContext);

  const handleVerificationToken = async () => {
    try {
      const response = await API.post("/auth/send-token", {
        email: auth?.data?.email,
      });
      if (response?.data?.success) {
        toast.success("Check your email and verify.");
        navigate("/email-verify");
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
  return (
    <Layout>
      <div className="flex-row m-6 flex items-center justify-center mt-36">
        {auth?.user ? (
          <div className=" rounded-md border-black p-2 bg-green-600">
            <h3 className="text-2xl justify-center text-center font-bold">
              User Details
            </h3>
            <hr />
            <h4 className="pt-3">User: {auth?.user}</h4>
            <p>Email : {auth?.data?.email}</p>
            <p>
              Verify:
              {isVerified === true ? "verified" : "Not verified"}
              &nbsp;&nbsp;
              {isVerified === false && (
                <button
                  className={"hover:underline text-blue-700 text-sm"}
                  aria-placeholder="Click to verify"
                  onClick={handleVerificationToken}
                >
                  Click to verify
                </button>
              )}
            </p>
            <p>
              Last loin :
              {auth?.data &&
                `${
                  new Date(auth?.data?.lastLogin).toISOString().split("T")[0]
                } ${
                  new Date(auth?.data?.lastLogin)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                }UTC`}
            </p>
            <p>
              createdAt:
              {auth?.data &&
                new Date(auth?.data?.createdAt).toISOString().split("T")[0]}
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-medium">Home Page</h1>
          </div>
        )
        }
      </div>
    </Layout>
  );
}
