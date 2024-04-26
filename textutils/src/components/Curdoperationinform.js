import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
import PropTypes from 'prop-types';
import '../App.css';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import the icons
import { toggleMode } from './callexternalfunction';


function ResponsiveExample() {
    const titles = ["SR No", "Title", "Document Type", "ContactMobile", "Department", "View", "Edit", "Delete"];
    const [mode, setMode] = useState("light");
    const [alert, setAlert] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [title, setTitle] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [documentType, setDocumentType] = useState('');
    const [ContactMobile, setContactMobile] = useState('');
    const [error, setError] = useState({});
    const [Email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [editedDocument, setEditedDocument] = useState({
        Id: '',
        Title: '',
        UploadDocumentType: '',
        ContactMobile: '',
        Department: ''
    });

    const [selectedId, setSelectedId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);



    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.0.180:8000/fetchdocument');
            setDocuments(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("enter");
        fetchData(); //for fetching data on edit document
    }, [showAddModal]); //for displaying data when user fill add 

    const showAlert = (message, type) => {
        console.log("showAlert called with message:", message, "and type:", type);
        setAlert({
            msg: message,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "white";
            showAlert("Dark mode has been enabled", "success");
            document.title = "TextUtils - Dark Mode";
            setInterval(() => {
                document.title = "TextUtils is Amazing";
            }, 2000);
            setInterval(() => {
                document.title = "Install TextUtils";
            }, 1500);
        } else {
            setMode("light");
            document.body.style.backgroundColor = "white";
            showAlert("Light mode has been enabled", "success");
        }
    };


    //----------------------------------------------AddDocument Start//------------------------------------

    const handleAddNew = () => {
        setShowAddModal(true);
    };

    const handleAddSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Validate mobile number length
        if (ContactMobile.length !== 10) {
            setError({ ...error, ContactMobile: 'Mobile number should be 10 digits' });
            return;
        }

        const payload = {
            title: title,
            documentType: documentType,
            ContactMobile: ContactMobile,
            department: department
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        axios.post('http://192.168.0.180:8000/adddocument', formData)
            .then(response => {
                setLoading(false); // Hide spinner

                if (response.data.status === false) {
                    // alert(response.data.message);
                } else {
                    // Update the data state with the newly added data
                    setData([...data, response.data.data]);
                    setShowAddModal(false); // Close the modal
                    // alert(response.data.message);
                }

            })
            .catch(error => {
                setLoading(false); // Hide spinner
                console.log(error);
            });

        // Clear form fields
        setTitle("");
        setContactMobile("");
        setDepartment("");
        setDocumentType("");
    };



    //----------------------------------------------AddDocument End//------------------------------------



    //----------------------------------------------EditDocument Start//------------------------------------

    const handleEditfetchdata = async (id) => {
        try {
            const response = await axios.get(`http://192.168.0.180:8000/singlefetchData/${id}`);
            debugger;
            if (response.data.status) {
                const selectedData = response.data.data;
                console.log("selectedData=>", selectedData)
                setEditedDocument({
                    Id: selectedData["Id"],
                    Title: selectedData["Title"],
                    UploadDocumentType: selectedData["UploadDocumentType"],
                    ContactMobile: selectedData["ContactMobile"],
                    Department: selectedData["Department"]
                });
                setShowEditModal(true);
            } else {
                console.error(response.data.message || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching document:', error.response ? error.response.data : error.message);
        }
    };


    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedDocument(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const handleEditSubmit = async (event) => {
        console.log("editedDocument", editedDocument);
        event.preventDefault();
        setLoading(true);



        // Validate form fields
        if (!editedDocument.Id || !editedDocument.Title || !editedDocument.UploadDocumentType || !editedDocument.ContactMobile || !editedDocument.Department) {
            setLoading(false);
            showAlert("Please fill in all the fields", "danger");
            return;
        }


        const payload = {
            Id: editedDocument.Id,
            title: editedDocument.Title,
            documentType: editedDocument.UploadDocumentType,
            ContactMobile: editedDocument.ContactMobile,
            department: editedDocument.Department
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        try {
            const response = await axios.post('http://192.168.0.180:8000/editdocument', formData);
            if (response.data.status) {
                setShowEditModal(false);
                showAlert(response.data.message, "success");
                // Clear the editedDocument state after successful submission
                setEditedDocument({
                    Id: '',
                    Title: '',
                    UploadDocumentType: '',
                    ContactMobile: '',
                    Department: ''
                });

                fetchData();


            } else {
                console.error(response.data.message);
                showAlert(response.data.message, "danger");
            }
        } catch (error) {
            console.error('Error editing document:', error);
            showAlert("Failed to edit document", "danger");
        } finally {
            setLoading(false);
        }
    };

    //----------------------------------------------EditDocument End//------------------------------------



    //----------------------------------------------ViewDocument Start//------------------------------------
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewDocument, setViewDocument] = useState({});

    //a function to open the view modal and fetch the data for the selected document:
    const handleViewDocument = async (id) => {
        try {
            const response = await axios.get(`http://192.168.0.180:8000/singlefetchData/${id}`);
            if (response.data.status) {
                setViewDocument(response.data.data);
                setShowViewModal(true);
            } else {
                console.error(response.data.message || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching document:', error.response ? error.response.data : error.message);
        }
    };

    //----------------------------------------------ViewDocument End//------------------------------------


    //----------------------------------------------close Modal Start//------------------------------------


    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowEditModal(false);
        setTitle('');
        setDocumentType('');
        setContactMobile('');
        setDepartment('');

    };


    //----------------------------------------------close Modal End//------------------------------------

    //----------------------------------------------DeleteAllRecords Start//------------------------------------


    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all records?")) {
            try {
                // Delete records from the backend
                const response = await axios.delete('http://192.168.0.180:8000/delete-all/');

                if (response.status) {
                    console.log('All records deleted successfully:');
                    //showAlert('All records deleted successfully', 'success');
                    fetchData();
                } else {
                    //showAlert(response.data.message || 'Failed to delete records', 'danger');
                }
            } catch (error) {
                console.error('Error deleting records:', error);
                showAlert('Failed to delete records', 'danger');
            }
        }
    };


    const handleDelete = (rowIndex) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            const newData = [...data];
            newData.splice(rowIndex, 1);
            setData(newData);
        }
    };
    //----------------------------------------------DeleteAllRecords Start//------------------------------------

    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        const trimmedQuery = searchQuery.trim();
        console.log('handleSearch called with query:', trimmedQuery);

        try {
            const response = await axios.get('http://192.168.0.180:8000/search_document', {
                params: {
                    Title: trimmedQuery,
                    ContactMobile: trimmedQuery,
                    Department: trimmedQuery,
                }
            });

            console.log('Response:', response.data);

            if (response.data.status) {
                setDocuments(response.data.data);
                showAlert('Search results updated', 'success');
            } else {
                showAlert('No search record found', 'warning');
            }
        } catch (error) {
            console.error('Error searching documents:', error);
            showAlert('Failed to search documents', 'danger');
        }
    };


    const handleSearchChange = (e) => {
        console.log('handleSearchChange called with value:', e.target.value);
        setSearchQuery(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setDocuments(data); // Reset the documents list
        showAlert('Search cleared', 'info');
    };


    const handleShowDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        const payload = {
            Id: editedDocument.Id,
            title: editedDocument.Title,
            documentType: editedDocument.UploadDocumentType,
            ContactMobile: editedDocument.ContactMobile,
            department: editedDocument.Department
        };
    
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        
        try {
            const response = await axios.delete(`http://192.168.0.180:8000/delete-document/${deleteId}`, formData);
    
            if (response.data.status) {
                // Remove the deleted record from the documents state
                setDocuments(documents.filter(doc => doc.Id !== deleteId));
                setShowDeleteModal(false);
                showAlert('Record deleted successfully', 'success');
            } else {
                showAlert(response.data.message || 'Failed to delete record', 'danger');
            }
        } catch (error) {
            console.error('Error deleting document:', error);
            showAlert('Failed to delete record', 'danger');
        }
    };
    
    

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <>

            <Navbar className='mb-4' title="TextUtils" mode={mode} toggleMode={toggleMode} />
            <div style={{ marginTop: '45px' }}>
                <div style={{ marginTop: '7%', marginBottom: '1%', right: '5%' }}>
                    <Button variant="info" style={{ marginLeft: '1%' }} onClick={handleAddNew}>ADD NEW</Button>
                    {documents.length > 0 && (
                        <Button variant="danger" style={{ marginLeft: '1%' }} onClick={handleDeleteAll} disabled={documents.length <= 5}>Delete All Records</Button>
                    )}
                    {/* Search Input Field */}
                    <input
                        type="text"
                        placeholder="Search by Title or Contact Mobile or Email ID ..."
                        style={{ width: '422px', height: '35px', borderRadius: '25px', marginLeft: '510px' }}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {searchQuery && (
                        <FaTimes
                            style={{ position: 'absolute', top: '19%', right: '168px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                            onClick={() => {
                                setSearchQuery('');  // Reset the search query
                            }}
                        />
                    )}
                    <Button variant="primary" onClick={handleSearch} disabled={documents.length <= 0}>
                        <FaSearch /> Search
                    </Button>
                </div>
                {/* Search Button */}


            </div>


            <Table style={{ backgroundColor: "white" }}>
                <thead style={{ textAlign: 'center' }}>
                    <th>SR No</th>
                    <th>ID</th>
                    <th >Title</th>
                    <th >Upload Document Type</th>
                    <th >Contact Mobile</th>
                    <th >Department</th>
                    <th >Edit</th>
                    <th >View</th>
                    <th>Delete</th>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {documents.length === 0 ? (
                        <tr >
                            <td colSpan={titles.length} style={{ color: 'red' }}>No record found</td>
                        </tr>
                    ) : (
                        documents.map((document, index) => (
                            <tr key={document.Id}>
                                <td>{index + 1}</td>
                                <td>{document.Id}</td>
                                <td>{document.Title}</td>
                                <td>{document.UploadDocumentType}</td>
                                <td>{document.ContactMobile}</td>
                                <td>{document.Department}</td>
                                <td><Button variant="warning" onClick={() => handleEditfetchdata(document.Id)}>Edit</Button></td>
                                <td>
                                    <Button variant="info" onClick={() => handleViewDocument(document.Id)}>
                                        View
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleShowDeleteModal(document.Id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>



            <Modal show={showAddModal} onHide={handleCloseModal} size='sm' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Record</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(110vh - 200px)', overflowY: 'auto' }}>

                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={title}
                                required
                                maxLength={25}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter documentType"
                                name="documentType"
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                            />
                        </div>
                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter ContactMobile"
                                name="ContactMobile"
                                value={ContactMobile}
                                required
                                maxLength={10}
                                onChange={(e) => {
                                    const mobileNumber = e.target.value;

                                    // Validate mobile number length
                                    if (mobileNumber.length <= 10) {
                                        setContactMobile(mobileNumber);
                                        setError({ ...error, ContactMobile: '' }); // Clear previous error
                                    } else {
                                        setError({ ...error, ContactMobile: 'Mobile number should be 10 digits' });
                                    }
                                }}
                            />
                            {error.ContactMobile && <p className="error">{error.ContactMobile}</p>}
                        </div>

                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter Department"
                                name="Department"
                                value={department}
                                required
                                maxLength={25}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="primary">Submit</Button>
                    </form>
                </Modal.Body>
            </Modal>



            <Modal show={showEditModal} onHide={handleCloseModal} size='sm' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Record</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(110vh - 200px)', overflowY: 'auto' }}>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="Title"
                                value={editedDocument?.Title || ''}
                                onChange={handleInputChange}
                                required
                                maxLength={25}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter documentType"
                                name="UploadDocumentType"
                                value={editedDocument?.UploadDocumentType || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter ContactMobile"
                                name="ContactMobile"
                                value={editedDocument?.ContactMobile || ''}
                                onChange={handleInputChange}
                                required
                                maxLength={25}

                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Department"
                                name="Department"
                                value={editedDocument?.Department || ''}
                                onChange={handleInputChange}
                                required
                                maxLength={25}
                            />
                        </div>
                        <Button type="submit" variant="primary">Submit</Button>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size='lg' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>View Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Title:</strong> {viewDocument.Title}</p>
                    <p><strong>Upload Document Type:</strong> {viewDocument.UploadDocumentType}</p>
                    <p><strong>Contact Mobile:</strong> {viewDocument.ContactMobile}</p>
                    <p><strong>Department:</strong> {viewDocument.Department}</p>
                </Modal.Body>
            </Modal>



            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ResponsiveExample;