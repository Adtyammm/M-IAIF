import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/Firebase"; // Sesuaikan dengan konfigurasi Firebase Anda

const DataSurvey = ({ surveyData, userData }) => {
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Tambahkan state untuk animasi close
  const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);

  // Fungsi untuk menangani perubahan pada jawaban survei
  const handleFormChange = (event, questionIndex) => {
    const { value } = event.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [questionIndex]: value };
      checkAllQuestionsAnswered(updatedFormData);
      return updatedFormData;
    });
  };

  // Fungsi untuk memeriksa apakah semua pertanyaan telah dijawab
  const checkAllQuestionsAnswered = (updatedFormData) => {
    const answeredQuestions = Object.keys(updatedFormData);
    const allQuestions = surveyData.questions.map((question, index) =>
      index.toString()
    );

    setIsAllQuestionsAnswered(
      answeredQuestions.length === allQuestions.length &&
        answeredQuestions.every((questionIndex) =>
          allQuestions.includes(questionIndex)
        )
    );
  };

  const handleSubmit = async () => {
    try {
      if (!isAllQuestionsAnswered) {
        alert("Harap isi semua pertanyaan sebelum mengirim survei.");
        return;
      }

      const surveyDocRef = doc(db, "surveys", surveyData.id);
      const answersCollectionRef = collection(surveyDocRef, "answers");
      const answerDocRef = doc(answersCollectionRef);

      const responses = surveyData.questions.map((question, index) => ({
        question: question.question,
        options: question.options || [],
        answer: formData[index.toString()] || "", // Perhatikan penggunaan index.toString()
      }));

      await setDoc(
        answerDocRef,
        {
          name: userData.name,
          nim: userData.nim,
          timestamp: Timestamp.now(),
          responses: arrayUnion(...responses),
        },
        { merge: true }
      );

      console.log("Jawaban survei berhasil dikirim ke Firestore!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Gagal mengirim jawaban survei:", error);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsModalOpen(false);
    }, 300); // Durasi animasi sesuai dengan CSS
  };

  return (
    <>
      <div className="pt-24">
        <div className="items-center bg-saintek w-full h-dvh bg-no-repeat bg-cover">
          <div className="container items-center w-screen mx-auto text-center pt-28">
            <div className="bg-white rounded-2xl shadow-lg max-w-2xl p-5 mx-auto">
              <div className="px-16">
                <h2 className="text-4xl font-bold text_primary mt-16 mb-8">
                  {surveyData.name}
                </h2>
                <div className="flex flex-col gap-1">
                  <input
                    className="p-2 mt-4 rounded-xl border w-full border-gray-300 border-4"
                    value={userData.nim || ""}
                    readOnly
                    placeholder="NIM"
                  />
                  <input
                    className="p-2 mt-4 rounded-xl border w-full border-gray-300 border-4"
                    value={userData.name || ""}
                    readOnly
                    placeholder="Nama"
                  />
                  {surveyData.questions.map((question, index) => (
                    <div key={index} className="mt-4">
                      <p className="text-base text-left px-1">
                        {question.question}
                      </p>
                      {Array.isArray(question.options) &&
                      question.options.length > 0 ? (
                        <select
                          className="p-2 mt-4 rounded-xl border w-full border-gray-300 border-4"
                          value={formData[index] || ""}
                          onChange={(event) => handleFormChange(event, index)}
                        >
                          <option value="">Pilih Jawaban</option>
                          {question.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="p-2 mt-4 rounded-xl border w-full border-gray-300 border-4"
                          value={formData[index] || ""}
                          onChange={(event) => handleFormChange(event, index)}
                          placeholder="Masukkan Jawaban"
                        />
                      )}
                    </div>
                  ))}
                  <button
                    className={`bg-primary rounded-xl mt-8 py-2 text-white ${
                      isAllQuestionsAnswered
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleSubmit}
                    disabled={!isAllQuestionsAnswered}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-8 max-w-sm w-full transform transition-transform duration-300 ${
              isClosing ? "scale-90" : "scale-100"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Survey Dikirim</h2>
            <p className="mb-4">Anda telah berhasil menyelesaikan survei!.</p>
            <button
              className="bg-primary text-white rounded-lg px-4 py-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DataSurvey;
