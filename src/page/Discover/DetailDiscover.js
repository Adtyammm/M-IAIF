import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DetailDiscover = () => {
  const { id } = useParams();
  const [discoveryItem, setDiscoveryItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscoveryItem = async () => {
      try {
        const docRef = doc(db, "discovery", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let discoveryData = { id: docSnap.id, ...docSnap.data() };

          if (discoveryData.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `discovery/${discoveryData.image}`)
            );
            discoveryData.imageUrl = imageUrl;
          }

          if (discoveryData.createdAt) {
            discoveryData.createdAt = discoveryData.createdAt.toDate();
          }

          setDiscoveryItem(discoveryData);
        } else {
          console.error("No such document!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching discovery item:", error);
        setLoading(false);
      }
    };

    fetchDiscoveryItem();
  }, [id]);

  function formatDate(date) {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <div>
        <Header />
        <div className="pt-24 pb-24 bg-gray-100">
          <div className="w-screen px-4 py-32 items-center bg-gray-800 bg-cover bg-center flex flex-col justify-center text-center">
            <p className="text-5xl font-bold text-white">Detail Discover</p>
            <a className="text-white text-lg mt-4 font-medium" href="/">
              Beranda <span className="ml-3 font-medium">Detail Discover</span>
            </a>
          </div>
        </div>
        <section id="about" className="pb-32 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : discoveryItem ? (
              <div className="w-3/5 mx-auto bg-white rounded-lg shadow-md mb-10 p-6">
                {discoveryItem.imageUrl && (
                  <img
                    src={discoveryItem.imageUrl}
                    alt={discoveryItem.title}
                    className="w-full mb-6 rounded-lg max-h-100 object-cover mx-auto"
                  />
                )}

                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                  {discoveryItem.title}
                </h1>
                <p className="text-gray-500 mb-4">
                  {formatDate(discoveryItem.createdAt)}
                </p>
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                  {discoveryItem.content}
                </p>

                {discoveryItem.secondImageUrl && (
                  <img
                    src={discoveryItem.secondImageUrl}
                    alt={discoveryItem.title}
                    className="w-full mb-6 rounded-lg max-h-96 object-cover mx-auto"
                  />
                )}

                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {discoveryItem.closingContent}
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Document does not exist
              </p>
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DetailDiscover;
