import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileDetails = () => {
  const { user, logout, isAuthenticated } = useAuth0();
  return (
    <div className="profileConatainer">
      <div className="profileitem">
        <img className="profileImg" src={user?.picture} alt="pic" />
        <span className="userName">{user?.name}</span>
        <span className="userEmail">{user?.email}</span>

        <button
          className="logoutbtn"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
