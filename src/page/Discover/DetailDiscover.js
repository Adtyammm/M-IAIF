import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore"; // Import increment and updateDoc
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DetailDiscover = () => {
  const { id } = useParams();
  const [discoveryItem, setDiscoveryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const fetchDiscoveryItem = async () => {
      try {
        const docRef = doc(db, "discovery", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let discoveryData = { id: docSnap.id, ...docSnap.data() };

          // Increment views
          if (discoveryData.views === undefined) {
            discoveryData.views = 0; // Initialize views if not available
          }
          // Increment views field in Firestore
          await updateDoc(docRef, {
            views: increment(1), // Increment views by 1
          });

          if (discoveryData.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `discovery/${discoveryData.image}`)
            );
            discoveryData.imageUrl = imageUrl;
          }

          if (discoveryData.createdAt) {
            discoveryData.createdAt = discoveryData.createdAt.toDate();
          }

          if (discoveryData.authorId) {
            const usersRef = collection(db, "users");
            const q = query(
              usersRef,
              where("uid", "==", discoveryData.authorId)
            ); // Menggunakan authorID untuk mencari berdasarkan uid
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const userData = doc.data();
                setAuthorName(userData.name); // Set nama user ke state authorName
              });
            } else {
              console.error(
                `No user found with UID: ${discoveryData.authorID}`
              );
            }
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
        <div className="pt-24 pb-24 scroll">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Discover</p>
            <a
              className="text-white text-xl mt-16 font-medium"
              href="/discover"
            >
              Discover{" "}
              <span className="ml-3 font-medium">
                {"/"}
                <span className="mr-3 font-medium"></span>Detail Discover
              </span>
            </a>
          </div>
        </div>
        <section id="about" className="pb-32 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
              </div>
            ) : discoveryItem ? (
              <div className="w-3/5 mx-auto bg-white rounded-lg shadow-md mb-10 p-6">
                {discoveryItem.imageUrl && (
                  <img
                    src={discoveryItem.imageUrl}
                    alt={discoveryItem.title}
                    className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-6"
                  />
                )}

                <h1 className="text-3xl font-bold mb-2 text-gray-800">
                  {discoveryItem.title}
                </h1>
                <p className="text-gray-500 mb-1s">
                  {authorName && <span>By : {authorName}</span>} |{" "}
                  {formatDate(discoveryItem.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mt-2 mb-4 flex items-center">
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  {discoveryItem.views}
                </p>
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line mb-4">
                  {discoveryItem.content}
                </p>

                {discoveryItem.secondImageUrl && (
                  <img
                    src={discoveryItem.secondImageUrl}
                    alt={discoveryItem.title}
                    className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-6"
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
            z
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default DetailDiscover;
