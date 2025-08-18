import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { logout } = useAuthContext();
  const { user } = useAuthContext();

  const handleLogOut = () => {
    logout();
  };

  // จัด Role ให้เป็น badge สีแตกต่างกัน
  const roleColor = (role) => {
    switch (role) {
      case "ROLES_ADMIN":
        return "badge-error";
      case "ROLES_MODERATOR":
        return "badge-warning";
      case "ROLES_USER":
        return "badge-primary";
      default:
        return "badge-secondary";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user.userInfo.avatar || "https://i.pravatar.cc/150?img=12"}
                alt="User Avatar"
              />
            </div>
          </div>

          {/* ชื่อ */}
          <h2 className="text-2xl font-bold mb-2">{user.userInfo.name}</h2>

          {/* Role */}
          <span
            className={`badge ${roleColor(
              user.authorities[0]
            )} mb-2 px-4 py-2 text-lg`}
          >
            {user.authorities[0].replace("ROLES_", "")}
          </span>

          {/* อีเมล */}
          <p className="text-base-content/70 mb-4">{user.userInfo.email}</p>

          {/* ปุ่ม */}
          <div className="flex gap-2">
            <button className="btn btn-primary">Edit Profile</button>
            <button
              className="btn btn-outline btn-error"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
