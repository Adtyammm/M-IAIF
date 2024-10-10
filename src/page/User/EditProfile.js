import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../config/Firebase"; // Pastikan Firebase sudah dikonfigurasi dengan benar
import Sidebar from "../components/Sidebar.js";

const EditProfile = ({ closeModal }) => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearClass, setYearClass] = useState("");
  const [graduated, setGraduated] = useState("");
  const [gender, setGender] = useState(""); // State untuk pilihan jenis kelamin
  const [avatarFile, setAvatarFile] = useState(null); // State untuk file foto profil
  const [loading, setLoading] = useState(false); // State untuk loading
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk visibilitas modal sukses

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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!userData) {
      console.log("No user data available for update.");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      let avatarURL = null;

      // Jika ada file avatar yang diunggah, upload ke Firebase Storage
      if (avatarFile) {
        const avatarRef = ref(
          storage,
          `avatars/${userData}/${avatarFile.name}`
        );
        await uploadBytes(avatarRef, avatarFile);
        avatarURL = await getDownloadURL(avatarRef); // Dapatkan URL dari file yang diunggah
      }

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
          ...(avatarURL && { avatar: avatarURL }), // Hanya tambahkan avatar jika URL tersedia
        });

        setLoading(false); // Set loading to false after update
        setIsModalVisible(true); // Show modal success
      } else {
        console.log("User document not found.");
        setLoading(false); // Make sure loading is disabled on failure
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setLoading(false); // Set loading to false if error
    }
  };

  const closeSuccessModal = () => {
    setIsModalVisible(false); // Close the success modal
    closeModal(); // Call the prop to close the entire EditProfile component/modal
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
              {/* Input untuk foto profil */}
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-2">
                  Foto Profil
                </label>
                <input
                  type="file"
                  className="p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-lg font-semibold text-gray-800"
                  onChange={handleFileChange}
                />
              </div>
              {/* Ganti input untuk jenis kelamin dengan elemen select */}
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-2">
                  Jenis Kelamin
                </label>
                <select
                  className="p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-lg font-semibold text-gray-800"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Success */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform scale-100 ease-out duration-300">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-green-500"
              >
                <path className="checkmark" d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center mt-4">
              Profile updated successfully!
            </h2>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
              onClick={closeSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
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
