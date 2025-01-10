import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// context
export const AuthContext = createContext();

//provider
export const AuthContextProdiver = ({ children }) => {
  const [auth, setAuth] = useState("");
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState("");

  const authData = {
    auth,
    setAuth,
    token,
    setToken,
    isVerified,
    setIsVerified,
  };

  // get auth data
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData?.user?.name,
        data: parseData?.user,
      });

      if(parseData?.user?.isVerified === true){
        setIsVerified(true);
      }else{
        setIsVerified(false);
      }
      
    }
  }, []);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

// export const useAuthData = () =>useContext(AuthContext);
