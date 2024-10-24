import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.css";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [reply, setReply] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchConsultations = async () => {
    try {
      const response = await fetch("/mockConsultations.json");
      if (!response.ok) {
        throw new Error("Failed to fetch consultations");
      }
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleReplyClick = (consultation) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReply('');
    setSuccessMessage('');
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    // Simulating a successful send
    setSuccessMessage("Reply sent successfully!");

    // Close the modal after a short delay for better user experience
    setTimeout(() => {
      handleCloseModal();
    }, 1000); // Close modal after 1 second

    setReply('');
  };

  return (
    <>
      <Navbar />
      <div className="container-consultations">
        <div className="title-consultations">
          <h1>
            <span>Consultations </span>
          </h1>
        </div>
        <table className="consultation-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Question</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <tr key={consultation._id}>
                  <td>{consultation.userName}</td>
                  <td>{consultation.phoneNumber}</td>
                  <td>{consultation.question}</td>
                  <td>{new Date(consultation.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleReplyClick(consultation)} className="tb-btn">Send SMS Reply</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No consultations found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for reply */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Reply to {selectedConsultation?.userName}</h2>
              <p><strong>Question:</strong> {selectedConsultation?.question}</p> {/* Displaying the question */}
              <form onSubmit={handleSendReply}>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter your reply here..."
                  required
                ></textarea>
                <div className="modal-actions">
                  <button type="submit">Send</button>
                  <button type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
                {successMessage && <p className="success-message">{successMessage}</p>}
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Consultations;
