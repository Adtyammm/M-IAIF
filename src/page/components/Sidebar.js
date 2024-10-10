import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth"; // Mengimpor auth Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/Firebase"; // Pastikan konfigurasi Firebase diimpor
import logo from "../../assets/images/if-logo.png";
import uin from "../../assets/images/logo_uin.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userUID, setUserUID] = useState(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserUID(user.uid);

        // Pastikan uid pengguna ada, lalu ambil data dari Firestore
        const userCollectionRef = collection(db, "users");
        const q = query(userCollectionRef, where("uid", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            // Ambil data pengguna dari Firestore
            const userData = querySnapshot.docs[0].data();
            setUserName(userData.name); // Setel nama dari Firestore
            setUserEmail(userData.email); // Setel email dari Firestore
          } else {
            console.log("Pengguna tidak ditemukan di Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      } else {
        setUserUID(null);
      }
    });

    return () => unsubscribe(); // Unsubscribe listener saat komponen unmount
  }, [auth]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Fungsi untuk logout
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

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-primary dark:border-primary">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              {/* Button for sidebar toggle */}
              <button
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-2 md:me-24">
                <img src={uin} alt="" className="mt-2 w-12 h-12 " />
                <img src={logo} alt="" className="mt-2 ml-1 mr-2 w-12 h-12" />
                <span className="hidden self-center ml-2 text-md font-semibold sm:text-xl whitespace-nowrap dark:text-white md:block ">
                  Ikatan Alumni Teknik Informatika UIN SGD Bandung
                </span>
              </a>
            </div>

            {/* Profile Button */}
            <div className="flex items-center">
              <div className="relative flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-2xl bg-white p-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={toggleProfileDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <i className="fas fa-user w3-xxlarge"></i>
                </button>

                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-12 top-0 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {userName}
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                        {userEmail}
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <a
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-48 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } bg-white border-r border-gray-200 dark:bg-primary dark:border-primary`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-primary">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-2 mt-2"
              >
                <i className="fas fa-user w3-xxlarge"></i>
                <span className="ms-3 text-2xl">Profile</span>
              </a>
            </li>
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className=" text-white p-2 mx-8 flex items-center rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ml-2"
              >
                <i className="fa fa-file-text"></i>

                <span className="ms-3 text-2xl">Discover</span>
              </button>
              {isOpen && (
                <div className="ml-4 z-10 right-0 mt-2 w-42 bg-gray-700 rounded-md shadow-lg ">
                  <a
                    href="/my-discover"
                    className="block px-4 py-2 text-md text-white hover:bg-gray-800"
                  >
                    Artikel Saya
                  </a>
                  <a
                    href="/newpost"
                    className="block px-4 py-2 text-md text-white hover:bg-gray-800"
                  >
                    Buat Artikel
                  </a>
                </div>
              )}
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
