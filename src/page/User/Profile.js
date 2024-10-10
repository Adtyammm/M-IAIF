import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import Sidebar from "../components/Sidebar";
import EditProfile from "./EditProfile"; // Import the EditProfile component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState(null);
  const [nim, setNim] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [yearClass, setYearClass] = useState(null);
  const [graduated, setGraduated] = useState(null);
  const [gender, setGender] = useState(null);
  const [avatar, setAvatar] = useState(null); // State untuk menyimpan URL avatar

  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [isAnimating, setIsAnimating] = useState(false); // Control animation state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user.uid);
        try {
          const userCollectionRef = collection(db, "users");
          getDocs(userCollectionRef)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.uid === user.uid) {
                  setUserName(data.name);
                  setNim(data.nim);
                  setEmail(data.email);
                  setPhone(data.phone);
                  setYearClass(data.yearClass);
                  setGraduated(data.graduated);
                  setGender(data.gender);
                  setAvatar(data.avatar); // Setel URL avatar dari Firestore
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
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Delay for smooth opening animation
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setIsModalOpen(false), 300); // Duration for the closing animation
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-200">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="container mx-auto justify-center flex mt-20">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-4">
              {userData ? (
                <>
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        avatar ||
                        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg"
                      }
                      alt="avatar"
                      className="rounded-full h-24 w-24 object-cover shadow-lg border-4 border-blue-500"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {userName}'s Profile
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <ProfileField label="NIM" value={nim} />
                    <ProfileField label="Nama" value={userName} />
                    <ProfileField label="Email" value={email} />
                    <ProfileField label="Nomor Telepon" value={phone} />
                    <ProfileField label="Tahun Masuk" value={yearClass} />
                    <ProfileField label="Tahun Lulus" value={graduated} />
                    <ProfileField label="Jenis Kelamin" value={gender} />
                  </div>
                  <button
                    onClick={openModal}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <p className="text-center text-lg font-semibold text-gray-600">
                  Loading...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white top-5 rounded-lg p-6 w-full max-w-2xl relative transform transition-transform duration-300 ${
              isAnimating ? "scale-100" : "scale-95"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-6 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✖
            </button>
            <EditProfile closeModal={closeModal} /> {/* Pass close function */}
          </div>
        </div>
      )}
    </>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-gray-600 font-medium mb-1">{label}</label>
    <p className="p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-md font-semibold text-gray-800">
      {value || "-"}
    </p>
  </div>
);

export default Profile;
