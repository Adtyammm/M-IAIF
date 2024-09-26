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
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { auth, db, storage } from "../../config/Firebase";
import ModalEditDiscover from "../components/modals/ModalEditDiscover";

const MyDiscover = () => {
  const [discover, setDiscover] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscover, setSelectedDiscover] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [discoverToDelete, setDiscoverToDelete] = useState(null);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

  const handleShowDeleteModal = (discover) => {
    setDiscoverToDelete(discover);
    setShowDeleteModal(true);
  };

  const handleDelete = async (discoverId, imageName) => {
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
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    }
  };

  const handleUpdateStatus = async (discoverId, newStatus) => {
    try {
      const docRef = doc(db, "discovery", discoverId);
      await updateDoc(docRef, { status: newStatus });

      setDiscover((prevDiscover) =>
        prevDiscover.map((discover) =>
          discover.id === discoverId
            ? { ...discover, status: newStatus }
            : discover
        )
      );
    } catch (error) {
      console.error("Error updating status: ", error.message);
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
      width: "15%",
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
      width: "15%",
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
          <Button variant="success" onClick={() => handleShowEditModal(row)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button
            className="text-xl ml-4 text-red-800"
            variant="danger"
            onClick={() => handleDelete(row.id, row.image)}
          >
            <FontAwesomeIcon icon={faTrash} />
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
        <div className="mt-24 ml-52">
          <Row>
            <Col lg={2}></Col>
            <Col lg={10}>
              <div className="mt-4">
                <h2>Daftar Artikel Anda</h2>
                {isLoading ? (
                  <Spinner animation="border" />
                ) : (
                  <DataTable columns={columns} data={discover} pagination />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {selectedDiscover && (
        <ModalEditDiscover
          show={showEditModal}
          handleClose={handleCloseEditModal}
          discoverData={selectedDiscover}
        />
      )}
    </div>
  );
};

export default MyDiscover;
