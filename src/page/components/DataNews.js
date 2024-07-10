import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/Firebase"; // Adjust the import path as necessary
import Header from "../components/Header";
import Footer from "../components/Footer";

const DataNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        console.log(id);
        const docRef = doc(db, "news", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setNewsItem({ id: docSnap.id, ...docSnap.data() });
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
        <div className="pt-24 pb-24">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Detail Berita</p>
            <a className="text-white text-xl mt-16 font-medium" href="/">
              Beranda{" "}
              <span className="ml-3 font-medium">
                {" "}
                <span className="mr-3 font-medium">></span> Detail News
              </span>
            </a>
          </div>
        </div>
        <section id="about" className="pb-32">
          <div className="container mx-auto">
            {loading ? (
              <p>Loading...</p>
            ) : (
              newsItem && (
                <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-10 p-6">
                  {newsItem.image && (
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="w-full mb-6"
                    />
                  )}
                  <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
                  <p className="font-medium text-base text-stroke mb-4">
                    {newsItem.content}
                  </p>
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
