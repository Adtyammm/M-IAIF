import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Discover = () => {
  const [discoveryData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      const discoveryCollection = collection(db, "discovery");
      const discoverySnapshot = await getDocs(discoveryCollection);
      const discoveryList = discoverySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));

      const discoveryDataWithImages = await Promise.all(
        discoveryList.map(async (discoverItem) => {
          if (discoverItem.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `discovery/${discoverItem.image}`)
            );
            return { ...discoverItem, imageUrl };
          }
          return discoverItem;
        })
      );

      setNewsData(discoveryDataWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching discovery:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  function truncateText(text, maxLength) {
    let words = text.split(" ");
    if (words.length > maxLength) {
      words = words.slice(0, maxLength);
      return words.join(" ") + "...";
    }
    return text;
  }

  function formatDate(date) {
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <Header />
      <div className="bg-slate-50">
        <div className="pt-24">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Portal Alumni</p>
            <a className="text-white text-xl mt-16 font-medium" href="/">
              Beranda{" "}
              <span className="ml-3 font-medium">
                {"/"}
                <span className="mr-3 font-medium"></span> Discover
              </span>
            </a>
          </div>
        </div>
        <div className="container bg-red max-w-screen-lg flex justify-end mx-auto">
          <div className="mt-20">
            <a
              href="/newpost"
              className=" text-lg text-[#a1a4aa] hover:text-primary "
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "#a1a4aa" }}
                className="mr-1.5 pb-0.5 text-2xl "
                size="lg"
              />
              Buat Postingan
            </a>
          </div>
        </div>

        <section id="about" className="pb-32">
          <div className="container mx-auto">
            <div className="flex flex-wrap px-4 mx-auto">
              <div className="w-full flex md:w-3/4 p-6 gap-6 grid grid-cols-1 lg:grid-cols-2">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  discoveryData
                    .filter((discoverItem) => discoverItem.status === "accept")
                    .map((discoverItem) => (
                      <div
                        key={discoverItem.id}
                        className="bg-white rounded-xl overflow-hidden shadow-lg mb-10"
                      >
                        {discoverItem.imageUrl && (
                          <img
                            src={discoverItem.imageUrl}
                            alt={discoverItem.title}
                            className="w-full"
                            style={{ height: "300px" }}
                          />
                        )}
                        <div className="py-6 px-6">
                          <h3>
                            <a
                              href="#s"
                              className="block mb-4 font-semibold text-xl text-primary hover:text-highlight text-ellipsis"
                            >
                              {formatDate(discoverItem.createdAt)}
                            </a>
                          </h3>
                          <p className="font-medium text-base text-stroke mb-1 truncate">
                            {truncateText(discoverItem.content, 25)}
                          </p>
                          <div className="flex justify-end pt-3">
                            <Link
                              to={`/discover/${discoverItem.id}`}
                              className="font-medium text-sm text-white bg-blue-500 py-2 px-4 rounded-lg hover:opacity-60 duration-300"
                            >
                              Baca Selengkapnya
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Discover;
