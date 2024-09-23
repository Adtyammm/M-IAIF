import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const NewDiscover = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [closingContent, setClosingContent] = useState("");
  const [image, setImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [secondImagePreview, setSecondImagePreview] = useState(null);
  const [, setCreatedAt] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSecondImageChange = (e) => {
    if (e.target.files[0]) {
      setSecondImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setSecondImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const timestamp = new Date();
    setCreatedAt(timestamp);

    try {
      const docRef = await addDoc(collection(db, "discovery"), {
        title,
        content,
        closingContent,
        imageUrl: "",
        secondImageUrl: "",
        createdAt: timestamp,
        status: "pending",
      });

      if (image) {
        const storageRef = ref(storage, `discovery/${docRef.id}/${image.name}`);
        await uploadBytes(storageRef, image);

        const imageUrl = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "discovery", docRef.id), {
          imageUrl,
        });
      }

      if (secondImage) {
        const storageRef = ref(
          storage,
          `discovery/${docRef.id}/${secondImage.name}`
        );
        await uploadBytes(storageRef, secondImage);

        const secondImageUrl = await getDownloadURL(storageRef);

        await updateDoc(doc(db, "discovery", docRef.id), {
          secondImageUrl,
        });
      }

      setTitle("");
      setContent("");
      setClosingContent("");
      setImage(null);
      setSecondImage(null);
      setImagePreview(null);
      setSecondImagePreview(null);
      setLoading(false);

      alert("Postingan berhasil dibuat!");
    } catch (error) {
      console.error("Error creating post:", error.message);
      setLoading(false);
      alert("Terjadi kesalahan saat membuat postingan.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mt-10 bg-white shadow-xl rounded-lg overflow-hidden sm:rounded-lg">
            <div className="p-6 sm:p-10">
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
                Buat Postingan Baru
              </h1>
              <div className="flex flex-col lg:flex-row gap-8">
                <form
                  onSubmit={handleSubmit}
                  className="w-full lg:w-1/2 space-y-6"
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Judul
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Konten
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Headline image
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="secondImage"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Featured image
                    </label>
                    <input
                      type="file"
                      id="secondImage"
                      accept="image/*"
                      onChange={handleSecondImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="closingContent"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Penutup Konten
                    </label>
                    <textarea
                      id="closingContent"
                      value={closingContent}
                      onChange={(e) => setClosingContent(e.target.value)}
                      required
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Simpan Postingan"}
                  </button>
                </form>
                <div className="w-full lg:w-1/2">
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Pratinjau
                  </h2>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-600 mb-4">{content}</p>
                    {secondImagePreview && (
                      <img
                        src={secondImagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <p className="text-gray-600">{closingContent}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDiscover;
