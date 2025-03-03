import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import ScrollReveal from "scrollreveal";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Discover = () => {
  const [discoveryData, setDiscoveryData] = useState([]);

  const [popularPosts, setPopularPosts] = useState([]);
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

      setDiscoveryData(discoveryDataWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching discovery:", error);
      setLoading(false);
    }
  }, []);

  const fetchPopularPosts = useCallback(async () => {
    try {
      const popularPostsQuery = query(
        collection(db, "discovery"),
        orderBy("views", "desc"),
        limit(2)
      );

      const popularPostsSnapshot = await getDocs(popularPostsQuery);
      const popularPostsList = popularPostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPopularPosts(popularPostsList);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    fetchPopularPosts();
  }, [fetchNews, fetchPopularPosts]);

  function truncateText(text, maxLength) {
    let words = text.split(" ");
    if (words.length > maxLength) {
      words = words.slice(0, maxLength);
      return words.join(" ") + "...";
    }
    return text;
  }

  useEffect(() => {
    ScrollReveal().reveal(".scroll", {
      delay: 500,
      duration: 3000,
      distance: "68px",
      origin: "bottom",
    });
    ScrollReveal({ reset: true });
  }, []);

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
      <div className="bg-slate-50 scroll">
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

        <section id="about" className="pb-32 pt-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap px-4 mx-auto">
              <div className="w-full flex md:w-3/4 p-6 gap-6 grid grid-cols-1 lg:grid-cols-2">
                {loading ? (
                  <div className="flex justify-end items-center ">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
                  </div>
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
                          <p className="block mb-4 font-semibold text-xl text-blue-500 hover:text-highlight text-ellipsis">
                            {discoverItem.title}
                          </p>
                          <p className="font-medium text-base text-stroke mb-1 truncate">
                            {discoverItem.content}
                          </p>
                          <h3>
                            <a
                              href="#s"
                              className="block mb-1 font-semibold text-md text-primary hover:text-highlight text-ellipsis"
                            >
                              {formatDate(discoverItem.createdAt)}
                            </a>
                          </h3>
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

              {/* Sidebar Postingan Populer */}
              <aside className="w-full h-full md:w-1/4 bg-white rounded-xl overflow-hidden shadow-lg mb-10 p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Postingan Populer
                </h2>
                {loading ? (
                  <div className="flex justify-center items-center mt-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
                  </div>
                ) : (
                  popularPosts.map((post) => (
                    <div key={post.id} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        <Link
                          to={`/discover/${post.id}`}
                          className="hover:underline hover:text-blue-500 text-primary"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700">
                        {truncateText(post.content, 6)}
                      </p>
                    </div>
                  ))
                )}
              </aside>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Discover;
