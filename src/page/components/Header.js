import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/if-logo.png";
import uin from "../../assets/images/logo_uin.png";
import { auth, db } from "../../config/Firebase";

const Header = () => {
  const [userUID, setUserUID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUID(user.uid);
        try {
          const userCollectionRef = collection(db, "users");
          getDocs(userCollectionRef)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                  setUserName(doc.data().name);
                } else {
                  console.log("Pengguna tidak ditemukan di Firestore");
                }
              });
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        } catch (error) {
          console.error("Error fetching user collection:", error);
        }
      } else {
        setUserUID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Logout berhasil");
        navigate("/login"); // Arahkan pengguna ke halaman login setelah logout
      })
      .catch((error) => {
        console.error("Gagal logout:", error.message);
      });
  };

  function handleClick() {
    const humberger = document.querySelector("#humberger");
    const navmenu = document.querySelector("#nav-menu");
    humberger.classList.toggle("humberger-active");
    navmenu.classList.toggle("hidden");
  }

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const header = document.querySelector("header");
      const fixedNav = header.offsetTop;
      setIsFixed(window.pageYOffset > fixedNav);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`navbar-fixed bg-transparent absolute top-0 left-0 w-full flex items-center z-10 justify-evenly ${
        isFixed ? "fixed-header" : ""
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between relative ">
          <div className="px-4 flex">
            <img src={uin} alt="" className="mt-6 w-12 h-12 " />
            <img src={logo} alt="" className="mt-6 ml-1 mr-2 w-12 h-12" />

            <a href="/home" className=" font-bold text-sm text-primary py-6">
              <p className="text-lg">IAIF UIN SGD Bandung</p>
              <p className="hidden sm:block">
                Ikatan Alumni Teknik Informatika UIN SGD Bandung
              </p>
            </a>
          </div>
          <div className="flex items-center px-4">
            <button
              id="humberger"
              name="humberger"
              type="button"
              className="block absolute right-4 lg:hidden"
              onClick={handleClick}
            >
              <span className="humberger-line transition duration-300 ease-in-out origin-top-left"></span>
              <span className="humberger-line transition duration-300 ease-in-out"></span>
              <span className="humberger-line transition duration-300 ease-in-out origin-bottom-left"></span>
            </button>

            <nav
              id="nav-menu"
              className="hidden absolute py-5  shadow-lg rounded-lg max-w-[140px] w-full right-2 top-full lg:block lg:static lg:max-w-full lg:shadow-none lg:rounded-none"
            >
              <ul className="block lg:flex">
                <li className="group">
                  <a
                    href="/home"
                    className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500"
                  >
                    Home
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/news"
                    className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500"
                  >
                    News
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/discover"
                    className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500"
                  >
                    Discover
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/survey"
                    className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500"
                  >
                    Survey
                  </a>
                </li>
                <li className="group">
                  <a
                    href="/about"
                    className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500"
                  >
                    About
                  </a>
                </li>
                {userUID ? (
                  <li className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="text-base text-primary py-2 mx-8 flex group-hover:text-blue-500"
                    >
                      {userName}
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </li>
                ) : (
                  <li className="group">
                    <a
                      href="/login"
                      className="text-base font-bold text-primary py-2 mx-8 flex group-hover:text-blue-500 p-5 bg-primary rounded-lg text-white"
                    >
                      Login
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
