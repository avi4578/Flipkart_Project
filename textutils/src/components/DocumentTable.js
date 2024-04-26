import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocumentTable = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editedDocument, setEditedDocument] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.180:8000/fetchdocument');
        setDocuments(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://192.168.0.180:8000/singlefetchData/${id}`);
      setSelectedDocument(response.data);
      setEditedDocument(response.data); // Set edited document state
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDocument({
      ...editedDocument,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    // Update the document with editedDocument data
    try {
      const response = await axios.put(`http://192.168.0.180:8000/updateDocument/${editedDocument.Id}`, editedDocument);
      if (response.status === 200) {
        // Update documents state after successful update
        const updatedDocuments = documents.map(doc => 
          doc.Id === editedDocument.Id ? editedDocument : doc
        );
        setDocuments(updatedDocuments);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div>
      <h1>Document Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Upload Document Type</th>
            <th>Contact Mobile</th>
            <th>Email ID</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.Id}>
              <td>{document.Id}</td>
              <td>{document.Title}</td>
              <td>{document.UploadDocumentType}</td>
              <td>{document.ContactMobile}</td>
              <td>{document.Emailid}</td>
              <td>{document.Department}</td>
              <td>
                <button onClick={() => handleEdit(document.Id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <h2>Edit Document</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>ID:</label>
              <input 
                type="text" 
                name="Id" 
                value={editedDocument.Id || ''} 
                onChange={handleChange} 
                readOnly 
              />
            </div>
            <div>
              <label>Title:</label>
              <input 
                type="text" 
                name="Title" 
                value={editedDocument.Title || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Upload Document Type:</label>
              <input 
                type="text" 
                name="UploadDocumentType" 
                value={editedDocument.UploadDocumentType || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Contact Mobile:</label>
              <input 
                type="text" 
                name="ContactMobile" 
                value={editedDocument.ContactMobile || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Email ID:</label>
              <input 
                type="text" 
                name="Emailid" 
                value={editedDocument.Emailid || ''} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label>Department:</label>
              <input 
                type="text" 
                name="Department" 
                value={editedDocument.Department || ''} 
                onChange={handleChange} 
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleCloseModal}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;
