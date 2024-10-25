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
  const [loading, setLoading] = useState(false); // Add loading state

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/consultations`); // Fetch from the backend API
      if (!response.ok) {
        throw new Error("Failed to fetch consultations");
      }

      const data = await response.json();

      if (data.success) {
        setConsultations(data.consultations);
      } else {
        throw new Error("Failed to fetch consultations");
      }
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
    setReply(''); // Reset reply field when opening modal
    setSuccessMessage(''); // Reset success message
    setLoading(false); // Reset loading state
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReply('');
    setSuccessMessage('');
    setLoading(false); // Reset loading state
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-sms`, { // API endpoint for sending SMS
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: selectedConsultation.phoneNumber,
          message: reply,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send SMS");
      }

      setSuccessMessage("Reply sent successfully!");

      // Update consultations array to reflect the change
      setConsultations((prev) =>
        prev.map((consultation) =>
          consultation._id === selectedConsultation._id
            ? { ...consultation, hasReplied: true } // Flag to indicate a reply was sent
            : consultation
        )
      );
    } catch (error) {
      console.error("Error sending SMS reply:", error);
      setSuccessMessage("Failed to send reply.");
    } finally {
      setLoading(false); // Reset loading state
    }

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
              <th>Session ID</th> {/* Changed from Username to Session ID */}
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
                  <td>{consultation.sessionId}</td> {/* Changed from userName to sessionId */}
                  <td>{consultation.phoneNumber}</td>
                  <td>{consultation.question}</td>
                  <td>{new Date(consultation.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleReplyClick(consultation)}
                      className="tb-btn"
                      disabled={consultation.hasReplied} // Disable if already replied
                    >
                      {consultation.hasReplied ? "Send Another Reply" : "Send SMS Reply"} {/* Update button text based on reply status */}
                    </button>
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
              <h2>Reply to {selectedConsultation?.phoneNumber}</h2> {/* Displaying the session ID */}
              <p><strong>Question:</strong> {selectedConsultation?.question}</p>
              <form onSubmit={handleSendReply}>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter your reply here..."
                  required
                ></textarea>
                <div className="modal-actions">
                  <button type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? "Sending..." : "Send"} {/* Change button text based on loading state */}
                  </button>
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
