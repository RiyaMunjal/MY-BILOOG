import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {
  const { login, logout, user } = useContext(AuthContext);

  return (
    <>
      <div className="nav">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src="https://images.pexels.com/photos/326235/pexels-photo-326235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </Link>
          </div>

          <div className="links">
            <Link to="/?cat=art" className="link">
              <h6>Art</h6>
            </Link>

            <Link to="/?cat=music" className="link">
              <h6>Music</h6>
            </Link>

            <Link to="/?cat=technology" className="link">
              <h6>Technology</h6>
            </Link>

            <Link to="/?cat=science" className="link">
              <h6>Science</h6>
            </Link>

            <Link to="/?cat=cinema" className="link">
              <h6>Cinema</h6>
            </Link>


            {!user && <Link to="/login" className="link">
              <h6>Login</h6>
            </Link>}

            {user && <button style={{cursor: "pointer" }} onClick={logout} className="link" >
              <h6>Logout</h6>
            </button>}

            <Link to="/write" className="link">
              <h6>Write</h6>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
