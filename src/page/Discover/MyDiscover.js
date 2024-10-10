import {
  faInfo,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { auth, db, storage } from "../../config/Firebase";
import ModalEditDiscover from "../components/modals/ModalEditDiscover";

const MyDiscover = () => {
  const [discover, setDiscover] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // State untuk animasi loading saat delete
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscover, setSelectedDiscover] = useState(null);
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false); // Modal untuk menampilkan berhasil hapus

  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchDiscoverData = useCallback(async (userId) => {
    try {
      const discoveryQuery = query(
        collection(db, "discovery"),
        where("authorId", "==", userId)
      );
      const querySnapshot = await getDocs(discoveryQuery);

      console.log("Query Snapshot: ", querySnapshot.size); // Tambahkan ini untuk memeriksa hasil query

      if (querySnapshot && querySnapshot.docs) {
        const dataPromises = querySnapshot.docs.map(async (doc) => {
          const discoverData = { id: doc.id, ...doc.data() };
          if (discoverData.image) {
            const imageUrl = await getDownloadURL(
              ref(storage, `discovery/${discoverData.image}`)
            );
            discoverData.imageUrl = imageUrl;
          }
          return discoverData;
        });

        const data = await Promise.all(dataPromises);
        setDiscover(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Gagal mengambil discover data : ", error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User ID:", user.uid); // Menampilkan UID pengguna di konsol
        fetchDiscoverData(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [fetchDiscoverData, navigate]);

  const handleShowEditModal = (discover) => {
    setSelectedDiscover(discover);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleDelete = async (discoverId, imageName) => {
    setIsDeleting(true); // Aktifkan spinner

    try {
      if (imageName) {
        const imageRef = ref(storage, `discovery/${imageName}`);
        await deleteObject(imageRef).catch((error) => {
          console.error("Error deleting image: ", error.message);
        });
      }

      const userDoc = doc(db, "discovery", discoverId);
      await deleteDoc(userDoc);

      setDiscover((prevDiscover) =>
        prevDiscover.filter((discover) => discover.id !== discoverId)
      );

      // Tampilkan modal sukses penghapusan
      setDeleteSuccessModal(true);
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    } finally {
      setIsDeleting(false); // Matikan spinner setelah selesai
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#ffc107", color: "white" };
      case "accept":
        return { backgroundColor: "#28a745", color: "white" };
      case "rejected":
        return { backgroundColor: "#dc3545", color: "white" };
      default:
        return { backgroundColor: "gray" };
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Judul",
      selector: (row) => row.title,
      width: "25%",
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          style={{
            backgroundColor: getStatusStyle(row.status).backgroundColor,
            color: getStatusStyle(row.status).color,
            padding: "5px 10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {row.status}
        </div>
      ),
      width: "15%",
    },
    {
      name: "Tanggal",
      selector: (row) => (
        <p className="text-gray-500">{formatDate(row.createdAt.toDate())}</p>
      ),
      width: "20%",
    },
    {
      name: "Foto",
      selector: (row) =>
        row.imageUrl ? (
          <img
            className="my-2"
            src={row.imageUrl}
            alt="image_headline"
            style={{ width: "100px", height: "50px" }}
          />
        ) : (
          "No Image"
        ),
      width: "15%",
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div>
          {/* Tombol Edit */}
          <Button
            className="text-xl text-blue-800 -ml-2"
            variant="success"
            onClick={() => handleShowEditModal(row)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>

          {/* Tombol Delete */}
          <Button
            className="text-xl ml-4 text-red-800"
            variant="danger"
            onClick={() => handleDelete(row.id, row.image)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
          </Button>
        </div>
      ),
      width: "10%",
    },
  ];

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Container fluid>
        <Sidebar />
        <div className="mt-24 ml-10 sm:max-w-7xl lg:ml-52">
          <Row>
            <Col>
              <div className="mt-4">
                <h2>Daftar Artikel Anda</h2>

                {/* Wrapper tabel dengan overflow agar bisa scroll di layar kecil */}
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <Spinner animation="border" />
                  ) : (
                    <DataTable
                      columns={columns}
                      data={discover}
                      pagination
                      className=" table-auto w-full"
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Modal untuk edit discover */}
      {selectedDiscover && (
        <ModalEditDiscover
          show={showEditModal}
          handleClose={handleCloseEditModal}
          discoverData={selectedDiscover}
        />
      )}

      {/* Modal untuk konfirmasi penghapusan */}
      {/* Modal untuk konfirmasi penghapusan */}
      {deleteSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform scale-100 ease-out duration-300">
            <div className="flex items-center justify-center">
              {/* SVG untuk ceklis */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-green-500"
              >
                <path className="checkmark" d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center mt-4">
              Artikel berhasil dihapus!
            </h2>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 w-full"
              onClick={() => setDeleteSuccessModal(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDiscover;
