import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DataNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let newsData = { id: docSnap.id, ...docSnap.data() };

          if (newsData.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `news/${newsData.image}`)
            );
            newsData.imageUrl = imageUrl;
          }

          const currentViews = newsData.views || 0;

          await updateDoc(docRef, {
            views: currentViews + 1,
          });

          setNewsItem({ ...newsData, views: currentViews + 1 });
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news item:", error);
        setLoading(false);
      }
    };

    fetchNewsItem();
  }, [id]);

  return (
    <>
      <div>
        <Header />
        <div className="pt-24 pb-24 scroll">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Berita Alumni</p>
            <a className="text-white text-xl mt-16 font-medium" href="/news">
              News{" "}
              <span className="ml-3 font-medium">
                {"/"}
                <span className="mr-3 font-medium"></span>Detail News
              </span>
            </a>
          </div>
        </div>
        <section id="about" className="pb-32 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              newsItem && (
                <div className="w-3/5 mx-auto bg-white rounded-lg shadow-md mb-10 p-6">
                  {newsItem.imageUrl && (
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="w-full mb-6 rounded-lg max-h-100 object-cover mx-auto"
                    />
                  )}

                  <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    {newsItem.title}
                  </h1>
                  <p className="text-sm text-gray-600 mt-4 flex items-center">
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    {newsItem.views}
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {newsItem.content}
                  </p>

                  {/* Menampilkan jumlah views dengan ikon mata */}
                </div>
              )
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DataNews;
