import React, { useEffect } from "react";
import { auth } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return (
    <>
      <h2>Profile</h2>
    </>
  );
};

export default Profile;
