import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
      <Header />
      <div className="container mx-auto max-w-screen-lg">
        <div className="pt-24">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Buat Postingan Baru</h1>
            <h2 className="text-2xl font-bold">Pratinjau</h2>
          </div>
          <section id="about" className="pb-32">
            <div className="flex space-x-8">
              <form
                onSubmit={handleSubmit}
                className="w-1/3 space-y-4 bg-white p-6 rounded-lg shadow-lg"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Judul:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Konten:
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Headline image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="secondImage"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Featured image:
                  </label>
                  <input
                    type="file"
                    id="secondImage"
                    accept="image/*"
                    onChange={handleSecondImageChange}
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="closingContent"
                    className="block mb-1 text-lg font-semibold"
                  >
                    Penutup Konten:
                  </label>
                  <textarea
                    id="closingContent"
                    value={closingContent}
                    onChange={(e) => setClosingContent(e.target.value)}
                    required
                    className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan Postingan"}
                </button>
              </form>
              <div className="w-2/3 bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="rounded-xl overflow-hidden">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full mb-6 rounded-xl"
                    />
                  )}
                  <h1 className="text-3xl font-bold mb-4">{title}</h1>
                  <p className="font-medium text-base text-stroke mb-4">
                    {content}
                  </p>
                  {secondImagePreview && (
                    <img
                      src={secondImagePreview}
                      alt="Preview"
                      className="w-full mb-6 rounded-xl"
                    />
                  )}
                  <p className="font-medium text-base text-stroke mb-4">
                    {closingContent}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewDiscover;
