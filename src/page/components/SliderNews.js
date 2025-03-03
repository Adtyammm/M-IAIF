import React, { useCallback, useEffect, useState } from "react";
import { db, storage } from "../../config/Firebase.js";
import {
  doc,
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Slider from "react-slick";
import { getDownloadURL, ref } from "firebase/storage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import profile from "../../assets/images/user.jpg";

const arrowStyle = {
  margin: "0 10px", // Adds horizontal spacing between arrow and slide
};

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev mr-4" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="navy" // Sets arrow color to navy
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="navy" // Sets arrow color to navy
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}

function SliderComponent() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      const newsCollection = collection(db, "news");
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <div className="w-full mx-auto pt-12 items-center">
        <div className=" ">
          <Slider {...settings}>
            {newsData.map((news) => (
              <div key={news.id}>
                <div>
                  <div className="bg-white w-full text-black rounded-xl shadow-lg">
                    <div className="w-full rounded-t-xl flex justify-center items-center mb-2">
                      <img
                        src={news.imageUrl || profile}
                        alt="news"
                        className="rounded-lg h-72 w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 p-4 ">
                      <p className="text-xl font-semibold text-center mb-2">
                        {news.title || "News Title"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
