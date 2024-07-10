import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../config/Firebase"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsCollection = collection(db, "news");
        const newsSnapshot = await getDocs(newsCollection);
        const newsList = newsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewsData(newsList);

        const popularNewsQuery = query(
          newsCollection,
          orderBy("views", "desc"),
          limit(5)
        );
        const popularNewsSnapshot = await getDocs(popularNewsQuery);
        const popularNewsList = popularNewsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPopularNews(popularNewsList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div>
        <Header />
        <div className="pt-24 pb-24">
          <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
            <p className="text-6xl font-bold text-white">Berita Alumni</p>
            <a className="text-white text-xl mt-16 font-medium" href="/">
              Beranda{" "}
              <span className="ml-3 font-medium">
                {" "}
                <span className="mr-3 font-medium">></span> News
              </span>
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
                  newsData.map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="bg-white rounded-xl overflow-hidden shadow-lg mb-10"
                    >
                      {newsItem.imageUrl && (
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="w-full"
                        />
                      )}
                      <div className="py-6 px-6">
                        <h3>
                          <a
                            href="#"
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
              <aside className="w-full h-full md:w-1/4 bg-white rounded-xl overflow-hidden shadow-lg mb-10 p-4">
                <h2 className="text-xl font-semibold mb-4">Berita Populer</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  popularNews.map((newsItem) => (
                    <div key={newsItem.id} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {newsItem.title}
                      </h3>
                      <p className="text-gray-700">
                        {newsItem.content.split(" ").slice(0, 5).join(" ")}
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
