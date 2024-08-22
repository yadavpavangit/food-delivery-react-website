import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Pfp from "../assets/avatar.png";
import { MdAdd, MdLogout, MdShoppingBasket, MdMenuOpen } from "react-icons/md";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";

function Header() {
  // toggle Menu
  const [toggle, setToggle] = useState(false);

  const [isMenu, setIsMenu] = useState(false);
  // Login
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16">
      {/* Large screen Menu */}
      <div className="hidden md:flex w-full h-full justify-between">
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </NavLink>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="flex items-center gap-7"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]">
              Contact
            </li>
          </motion.ul>
          {/* Cart */}
          <div className="relative flex items-center cursor-pointer">
            <MdShoppingBasket className="text-textColor text-2xl" />
            <div className="flex justify-center absolute top-0 -right-1 w-4 h-4 rounded-full bg-cartNumBg">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          {/* Avatar */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Pfp}
              alt="Profile"
              className="min-w-[14px] w-10 min-h-[14px] h-10 cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "yadavpvan07.07@gmail.com" && (
                  <NavLink to="/createitems">
                    <p className="flex items-center gap-3 text-textColor hover:bg-slate-100 px-4 py-1 cursor-pointer transition-all duration-200">
                      New Items
                      <MdAdd />
                    </p>
                  </NavLink>
                )}
                <p
                  className="flex items-center gap-3 text-textColor hover:bg-slate-100 px-4 py-1 cursor-pointer transition-all duration-200"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Small screen Menu */}
      <div className="flex items-center md:hidden w-full h-full p-4">
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </NavLink>
        <div className="relative ml-auto px-4">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Pfp}
            alt="Profile"
            className="min-w-[14px] w-10 min-h-[14px] h-10 cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "yadavpvan07.07@gmail.com" && (
                <NavLink to="/createitems">
                  <p className="flex items-center gap-3 text-textColor hover:bg-slate-100 px-4 py-1 cursor-pointer transition-all duration-200">
                    New Items
                    <MdAdd />
                  </p>
                </NavLink>
              )}
              <p
                className="flex items-center gap-3 m-2 p-2 rounded-md shadow-md text-textColor bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all duration-200"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
        <MdMenuOpen
          className="text-3xl cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        />
        <ul
          className={`${
            toggle ? "flex" : "hidden"
          } flex-col justify-center absolute w-full h-[250px] bg-green-300 top-[80px] right-0 items-center gap-7`}
        >
          <li
            className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]"
            onClick={() => setToggle((prev) => !prev)}
          >
            Home
          </li>
          <li
            className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]"
            onClick={() => setToggle((prev) => !prev)}
          >
            Menu
          </li>
          <li
            className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]"
            onClick={() => setToggle((prev) => !prev)}
          >
            About Us
          </li>
          <li
            className="text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out cursor-pointer text-[16px]"
            onClick={() => setToggle((prev) => !prev)}
          >
            Contact
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
