import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../config/Firebase";
import Alert from "../Alert";

const ModalEditDiscover = ({ show, handleClose, discoverData }) => {
  const [formData, setFormData] = useState({
    title: discoverData.title || "",
    content: discoverData.content || "",
    closingContent: discoverData.closingContent || "",
    imageUrl: discoverData.imageUrl || "",
    secondImageUrl: discoverData.secondImageUrl || "",
    status: discoverData.status || "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [secondImageUpload, setSecondImageUpload] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = () => setShowAlert(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, setImageFunc) => {
    if (e.target.files[0]) {
      setImageFunc(e.target.files[0]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.files[0].name,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "discovery", discoverData.id);

      const uploadImage = async (image, name) => {
        const imageRef = ref(storage, `discovery/${docRef.id}/${image.name}`);
        await uploadBytes(imageRef, image);
        return getDownloadURL(imageRef);
      };

      if (imageUpload) {
        const imageUrl = await uploadImage(imageUpload, "image");
        formData.imageUrl = imageUrl;
      }

      if (secondImageUpload) {
        const secondImageUrl = await uploadImage(
          secondImageUpload,
          "secondImage"
        );
        formData.secondImageUrl = secondImageUrl;
      }

      await updateDoc(docRef, {
        title: formData.title,
        content: formData.content,
        closingContent: formData.closingContent,
        imageUrl: formData.imageUrl,
        secondImageUrl: formData.secondImageUrl,
      });

      setAlertMessage("Berhasil edit Discover Data");
      setShowAlert(true);
      handleClose();
    } catch (error) {
      setAlertMessage("Gagal Update Discover Data: " + error.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    setFormData({
      title: discoverData.title || "",
      content: discoverData.content || "",
      closingContent: discoverData.closingContent || "",
      imageUrl: discoverData.imageUrl || "",
      secondImageUrl: discoverData.secondImageUrl || "",
    });
  }, [discoverData]);

  return (
    <>
      {/* Modal Overlay */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {/* Modal Box */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mx-4 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Edit Discover</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Konten
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows={5}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Edit Gambar Pertama
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, setImageUpload)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Edit Gambar Kedua
                </label>
                <input
                  type="file"
                  name="secondImage"
                  onChange={(e) => handleFileChange(e, setSecondImageUpload)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Penutup Konten
                </label>
                <textarea
                  name="closingContent"
                  value={formData.closingContent}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows={5}
                />
              </div>
            </form>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleClose}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Tutup
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert */}
      <Alert
        show={showAlert}
        handleClose={handleAlertClose}
        message={alertMessage}
        timeout={3000}
      />
    </>
  );
};

export default ModalEditDiscover;
