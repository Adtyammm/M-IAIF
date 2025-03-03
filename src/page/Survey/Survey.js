import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/Firebase"; // Impor konfigurasi Firebase Anda
import Header from "../components/Header"; // Pastikan jalur impor Anda benar
import Footer from "../components/Footer"; // Pastikan jalur impor Anda benar
import DataSurvey from "../components/DataSurvey.js"; // Pastikan jalur impor Anda benar
import NotOpen from "../../assets/images/survey_not_open.svg"; // Gantilah dengan jalur yang benar untuk gambar Anda

const Survey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
  const navigate = useNavigate();

  const fetchSurveys = useCallback(async () => {
    try {
      const q = query(collection(db, "surveys"), where("isActive", "==", true));
      const querySnapshot = await getDocs(q);

      // Debug log untuk memastikan apakah query menghasilkan data
      console.log("Query Snapshot:", querySnapshot);

      if (querySnapshot && querySnapshot.docs.length > 0) {
        const survey = querySnapshot.docs[0].data();
        const surveyId = querySnapshot.docs[0].id; // Mendapatkan ID dokumen
        setSurveyData([{ ...survey, id: surveyId }]); // Menambahkan ID ke dalam data survei
      } else {
        console.log("Tidak ada survei aktif yang ditemukan");
        setSurveyData([]); // Jika tidak ada survei aktif, kosongkan surveyData
      }
    } catch (error) {
      console.error("Error fetching survey data: ", error);
    } finally {
      setIsLoading(false); // Set isLoading ke false setelah data berhasil dimuat
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("User data from auth state change:", user); // Debug log untuk melihat status user

      if (!user) {
        // Jika tidak ada user, arahkan ke halaman login
        navigate("/login");
      } else {
        console.log("User UID:", user.uid); // Debug log untuk melihat UID pengguna

        try {
          // Ambil data pengguna dari Firestore dengan memeriksa email
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.error("User document does not exist"); // Periksa apakah query tidak menemukan dokumen
            setUserData(null); // Set null jika tidak ada data pengguna
            // Arahkan kembali ke halaman login
          } else {
            const userData = querySnapshot.docs[0].data();
            console.log("User data from Firestore:", userData); // Debug log untuk data pengguna
            setUserData({
              name: userData.name,
              nim: userData.nim,
              uid: user.uid, // Tambahkan UID pengguna
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }

        fetchSurveys(); // Ambil data survei setelah mendapatkan data pengguna
      }
    });
    return () => unsubscribe(); // Bersihkan listener ketika komponen unmount
  }, [fetchSurveys, navigate]);

  return (
    <>
      <Header />
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : surveyData.length === 0 ? (
          <div className="container pt-44 mx-auto">
            <div
              className="px-0 justify-center items-center"
              style={{ height: "100vh" }}
            >
              <div className="d-flex flex-column align-items-center border rounded py-4">
                <p className="text-center text-lg">
                  ⚠️ Maaf, sedang bukan periode survey ⚠️
                </p>
                <img
                  src={NotOpen}
                  alt="survey_not_open"
                  style={{ width: "100%", height: "500px" }}
                />
                <p className="text-center text-lg">
                  Periksa kembali di lain waktu, terima kasih 😊
                </p>
              </div>
            </div>
          </div>
        ) : userData ? ( // Pastikan userData ada sebelum menampilkan DataSurvey
          <DataSurvey surveyData={surveyData[0]} userData={userData} />
        ) : (
          <div>Loading user data...</div> // Tampilkan loading jika userData belum tersedia
        )}
      </div>
      <Footer />
    </>
  );
};

export default Survey;
