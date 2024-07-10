import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/Firebase"; // Pastikan Anda mengimpor db dan auth dari konfigurasi Firebase Anda
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
      if (querySnapshot && querySnapshot.docs.length > 0) {
        const survey = querySnapshot.docs[0].data();
        const surveyId = querySnapshot.docs[0].id; // Mendapatkan ID dokumen
        setSurveyData([{ ...survey, id: surveyId }]); // Menambahkan ID ke dalam data survei
      }
    } catch (error) {
      console.error("error fetching survey data: ", error);
    } finally {
      setIsLoading(false); // Set isLoading ke false setelah data berhasil dimuat
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        console.log("INI ADALAH USER UID", user.uid);
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot && querySnapshot.docs.length > 0) {
            const userData = querySnapshot.docs[0].data();
            setUserData({
              name: userData.name,
              nim: userData.nim,
              uid: user.uid, // Tambahkan UID user ke userData
            });
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("error fetching user data: ", error.message);
        }
        fetchSurveys();
      }
    });
    return () => unsubscribe();
  }, [fetchSurveys, navigate]);

  console.log("Ini adalah user data", userData);

  return (
    <>
      <Header />
      <div>
        {isLoading ? ( // Tampilkan animasi loading saat data sedang dimuat
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
        ) : (
          userData && (
            <DataSurvey surveyData={surveyData[0]} userData={userData} />
          ) // Pass the first element of surveyData and userData
        )}
      </div>
      <Footer />
    </>
  );
};

export default Survey;
