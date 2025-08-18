import React from "react";

const NotAllowed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="text-7xl">🚫</div>
        </div>
        <h1 className="text-2xl font-bold text-error mb-2">Access Denied</h1>
        <p className="text-base-content/70 mb-6">
          You do not have permission to access this page.
        </p>
        <div className="flex justify-center">
          <a href="/" className="btn btn-error btn-wide">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;
