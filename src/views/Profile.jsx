import React from "react";
import EditProfile from "../components/form/EditProfile";

const Profile = (clbk) => {

  return (
    <div className="profile">
      {/* <h1 className="title">Edit your profile</h1> */}
      <EditProfile />
    </div>
  );
};

export default Profile;
