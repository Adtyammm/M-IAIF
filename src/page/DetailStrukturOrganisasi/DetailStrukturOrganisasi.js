import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import TableComponent from "../components/TableComponet.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DetailStrukturOrganisasi = () => {
  const [jabatanData, setJabatanData] = useState([]);
  const [filteredKewirausahaanData, setFilteredKewirausahaanData] = useState(
    []
  );
  const [filteredExoffData, setFilteredExoffData] = useState([]);
  const [filteredInfokomData, setFilteredInfokomData] = useState([]);
  const [filteredKerjasamaData, setFilteredKerjasamaData] = useState([]);
  const [filteredKebijakanData, setFilteredKebijakanData] = useState([]);
  const [filteredPengembanganData, setFilteredPengemabanganData] = useState([]);
  const [filteredSeniorData, setFilteredSeniorData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getJabatan();
  }, []);

  useEffect(() => {
    filterKewirausahaanData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterExoffData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterInfokomData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterKerjasamaData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterKebijakanData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterPengembanganData();
  }, [jabatanData, filter]);

  useEffect(() => {
    filterSeniorData();
  }, [jabatanData, filter]);

  const getJabatan = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jabatan"));
      const jabatanDataGrouped = {};

      querySnapshot.forEach((doc) => {
        const jabatan = doc.data();
        const namaBidang = jabatan.nama_bidang;

        if (!jabatanDataGrouped[namaBidang]) {
          jabatanDataGrouped[namaBidang] = {
            namaBidang: namaBidang,
            pengurus: [],
          };
        }

        if (jabatan.pengurus) {
          Object.entries(jabatan.pengurus).forEach(
            ([nama, jabatanPengurus]) => {
              jabatanDataGrouped[namaBidang].pengurus.push({
                nama: nama,
                jabatan: jabatanPengurus,
              });
            }
          );
        }
      });

      const jabatanDataArray = Object.values(jabatanDataGrouped);

      setJabatanData(jabatanDataArray);
    } catch (error) {
      console.error("Error fetching jabatan data:", error.message);
    }
  };

  const filterKewirausahaanData = () => {
    setFilteredKewirausahaanData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("kewirausahaan")
      )
    );
  };

  const filterExoffData = () => {
    setFilteredExoffData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("ex officio")
      )
    );
  };

  const filterInfokomData = () => {
    setFilteredInfokomData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("informasi dan komunikasi")
      )
    );
  };

  const filterKerjasamaData = () => {
    setFilteredKerjasamaData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("kerjasama")
      )
    );
  };

  const filterKebijakanData = () => {
    setFilteredKebijakanData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("kebijakan")
      )
    );
  };

  const filterPengembanganData = () => {
    setFilteredPengemabanganData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("pengembangan")
      )
    );
  };

  const filterSeniorData = () => {
    setFilteredSeniorData(
      jabatanData.filter((item) =>
        item.namaBidang.toLowerCase().includes("seni")
      )
    );
  };

  console.log(filteredInfokomData);

  return (
    <>
      <Header />
      <div className="pt-24">
        <div className="w-screen px-4 py-32 items-center bg-saintek bg-cover bg-right flex flex-col justify-center text-center">
          <p className="text-6xl font-bold text-white">Struktur Jabatan</p>
        </div>
      </div>
      <section id="about" className="pt-24 pb-24">
        <div className="container mx-auto items-center">
          <h3 className="text-4xl font-bold text-center">
            SUSUNAN KEPENGURUSAN IKATAN ALUMNI INFORMATIKA
          </h3>
          <h3 className="text-4xl font-bold text-center">
            UIN SUNAN GUNUNG DJATI BANDUNG
          </h3>
          <h3 className="text-4xl font-bold text-center">PERIODE 2022-2025</h3>
          {/* Tabel untuk menampilkan struktur organisasi */}
          <h1 className="text-2xl font-bold text-center pt-14 pb-8">
            Bidang Ex Officio
          </h1>
          <TableComponent data={filteredExoffData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Informasi dan Komunikasi
          </h1>
          <TableComponent data={filteredInfokomData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Kewirausahaan
          </h1>
          <TableComponent data={filteredKewirausahaanData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Kerjasama
          </h1>
          <TableComponent data={filteredKerjasamaData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Kebijakan
          </h1>
          <TableComponent data={filteredKebijakanData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Pengembangan
          </h1>
          <TableComponent data={filteredPengembanganData} />
          <br />
          <h1 className="text-2xl font-bold text-center pt-8 pb-8">
            Bidang Senior
          </h1>
          <TableComponent data={filteredSeniorData} />
          <br />
        </div>
      </section>
    </>
  );
};

export default DetailStrukturOrganisasi;
