import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../config/Firebase";
import ScrollReveal from "scrollreveal";
import Footer from "../components/Footer";
import Header from "../components/Header";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      // Mengambil semua berita
      const newsCollection = collection(db, "news");
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Mengambil URL gambar berita jika ada
      const newsDataWithImages = await Promise.all(
        newsList.map(async (newsItem) => {
          if (newsItem.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `news/${newsItem.image}`)
            );
            return { ...newsItem, imageUrl };
          }
          return newsItem;
        })
      );

      setNewsData(newsDataWithImages);

      // Query untuk berita populer berdasarkan jumlah views
      const popularNewsQuery = query(
        newsCollection,
        orderBy("views", "desc"), // Mengurutkan berdasarkan views
        limit(2) // Membatasi hanya 2 berita populer
      );

      const popularNewsSnapshot = await getDocs(popularNewsQuery);
      const popularNewsList = popularNewsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPopularNews(popularNewsList);
      console.log("Data Berita Populer ", popularNewsList);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    ScrollReveal().reveal(".scroll", {
      delay: 500,
      duration: 3000,
      distance: "68px",
      origin: "bottom",
    });
    ScrollReveal({ reset: true });
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="pt-24 pb-24 scroll">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Berita Alumni</p>
            <a className="text-white text-xl mt-16 font-medium" href="/">
              Beranda{" "}
              <span className="ml-3 font-medium">
                {"/"}
                <span className="mr-3 font-medium"></span> News
              </span>
            </a>
          </div>
        </div>
        <section id="news" className="pb-32 scroll">
          <div className="container mx-auto">
            <div className="flex flex-wrap px-4 mx-auto">
              <div className="w-full flex md:w-3/4 p-6 gap-6 grid grid-cols-1 lg:grid-cols-2">
                {loading ? (
                  <div className="flex justify-end items-center ">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
                  </div>
                ) : (
                  newsData.map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="bg-white rounded-xl overflow-hidden shadow-xl mb-10"
                    >
                      {newsItem.imageUrl && (
                        <img
                          src={newsItem.imageUrl}
                          alt={newsItem.title}
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
                            {newsItem.title}
                          </a>
                        </h3>
                        <p className="font-medium text-base text-stroke mb-1 truncate">
                          {newsItem.content}
                        </p>
                        <div className="flex justify-end pt-3">
                          <Link
                            to={`/news/${newsItem.id}`}
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
              <aside className="w-full h-full md:w-1/4 bg-white rounded-xl overflow-hidden shadow-xl mb-10 pt-4 pl-6">
                <h2 className="text-xl font-semibold mb-4">Berita Populer</h2>
                {loading ? (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-500"></div>
                  </div>
                ) : (
                  popularNews.map((newsItem) => (
                    <div key={newsItem.id} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {/* Link to detail page of popular news */}
                        <Link
                          to={`/news/${newsItem.id}`}
                          className="hover:underline hover:text-blue-400 text-primary"
                        >
                          {newsItem.title}
                        </Link>
                      </h3>
                      <p className="text-gray-700">
                        {newsItem.content.split(" ").slice(0, 5).join(" ")}...
                      </p>
                    </div>
                  ))
                )}
              </aside>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default News;
