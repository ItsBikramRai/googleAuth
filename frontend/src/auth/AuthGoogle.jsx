// components/GoogleCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from "../../API";

export default function AuthGoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code'); // Get the authorization code from the URL

      if (code) {
        try {
          const response = await API.get(`/api/v1/auth/google/callback?code=${code}`);

          const data = response.data;
          if (data.success) {
            // Store JWT token in localStorage
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            toast.success(data.message);
            navigate('/');
          } else {
            toast.error(data.message || "Login failed");
          }
        } catch (error) {
          toast.error("An error occurred during authentication.");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  return <div>Loading...</div>;  // Show a loading message until the authentication is processed
}
