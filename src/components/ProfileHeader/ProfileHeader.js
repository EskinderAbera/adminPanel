import React from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useAPI } from "../../Context/APIContext";

const ProfileHeader = () => {
  const { NavBarUser } = useAPI();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="profileContainer">
      <i class="fa-regular fa-bell"></i>
      <i class="fa-sharp fa-regular fa-envelope"></i>
      <div className="imageContainer">
        <img
          src="http://www.aksisweb.com/theme/fixed/layouts-1/assets/img/avtar-2.png"
          alt=""
        />
        <div className="profile_info_iner">
          <div className="profile_author_name">
            <p>welcome,</p>
            <h5>{NavBarUser}</h5>
          </div>
          <div className="profile_info_details">
            <a href="#">My Profile</a>
            <a href="#">Settings</a>
            <a href="#" onClick={handleLogout}>
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
