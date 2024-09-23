import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase"; // Pastikan Firebase sudah dikonfigurasi dengan benar
import Sidebar from "../components/Sidebar.js";

const EditProfile = ({ closeModal }) => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearClass, setYearClass] = useState("");
  const [graduated, setGraduated] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(user.uid);
        try {
          const userCollectionRef = collection(db, "users");
          getDocs(userCollectionRef)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.exists()) {
                  const data = doc.data();
                  setUserName(data.name);
                  setNim(data.nim);
                  setEmail(data.email);
                  setPhone(data.phone);
                  setYearClass(data.yearClass);
                  setGraduated(data.graduated);
                  setGender(data.gender);
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
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!userData) {
      console.log("No user data available for update.");
      return;
    }

    try {
      const userCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(userCollectionRef);

      let userDocId = null;

      // Loop through documents to find the matching one by UID
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === userData) {
          userDocId = doc.id; // Save the document ID
        }
      });

      if (userDocId) {
        const userDocRef = doc(db, "users", userDocId); // Get the document reference by ID

        // Update the document with the new data
        await updateDoc(userDocRef, {
          name: userName,
          nim: nim,
          email: email,
          phone: phone,
          yearClass: yearClass,
          graduated: graduated,
          gender: gender,
        });

        alert("Profile updated successfully!");
      } else {
        console.log("User document not found.");
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
    closeModal();
  };

  return (
    <div className="flex max-w-2xl -mt-20 bg-transparent">
      <div className="flex-1 p-2">
        <div className="container mx-auto flex justify-center mt-12">
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Edit Profile
            </h2>
            {userName && (
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {userName}'s Profile
              </h2>
            )}
            <form
              onSubmit={handleUpdateProfile}
              className="grid grid-cols-1 gap-4"
            >
              <ProfileInput
                label="Nama"
                value={userName}
                onChange={setUserName}
              />
              <ProfileInput label="NIM" value={nim} onChange={setNim} />
              <ProfileInput label="Email" value={email} onChange={setEmail} />
              <ProfileInput
                label="Nomor Telepon"
                value={phone}
                onChange={setPhone}
              />
              <ProfileInput
                label="Tahun Masuk"
                value={yearClass}
                onChange={setYearClass}
              />
              <ProfileInput
                label="Tahun Lulus"
                value={graduated}
                onChange={setGraduated}
              />
              <ProfileInput
                label="Jenis Kelamin"
                value={gender}
                onChange={setGender}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInput = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-600 font-medium mb-2">{label}</label>
    <input
      type="text"
      className="p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-lg font-semibold text-gray-800"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default EditProfile;
