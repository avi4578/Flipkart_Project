import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Navbar from './Navbar';
import PropTypes from 'prop-types'
import '../App.css';
import axios from 'axios';


function ResponsiveExample() {
    const titles = ["SR No", "Title", "Document Type", "ContactMobile", "Email ID", "Department", "View", "Edit", "Delete"];
    const [data, setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [currentPage, setCurrentPage] = useState(); // Define currentPage state
    const [itemsPerPage, setItemsPerPage] = useState(2); // Define itemsPerPage state
    const [showScrollButton, setShowScrollButton] = useState(false); // State to track if scroll button should be shown
    const tableRef = useRef(null); // Reference to the table element
    const [text, setText] = useState('');
    const [mode, setMode] = useState("dark"); // Whether dark mode is enabled or not

    const [alert, setAlert] = useState(null);
    const [title, settitle] = useState('')
    const [documentType, setdocumentType] = useState('')
    const [ContactMobile, setContactMobile] = useState('')
    const [email, setemail] = useState('')
    const [department, setdepartment] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const [formData, setformData] = useState({
        title: '',
        documentType: '',
        ContactMobile: '',
        email: '',
        department: ''
    });






    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type, // Changed 'Type' to 'type' to match the state key
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    // Define your toggleMode function
    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "#042743";
            showAlert("Dark mode has been enabled", "success"); // Corrected the message
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
            showAlert("Light mode has been enabled", "success"); // Corrected the message
        }
    };

    useEffect(() => {
        toggleMode(); // Call toggleMode once when component mounts
    }, []);




    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('tableData');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    // Update localStorage when data changes
    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(data));
    }, [data]);

    // Add scroll event listener to show/hide scroll button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const { current: table } = tableRef;
            if (table) {
                const scrollHeight = table.scrollHeight - table.clientHeight;
                setShowScrollButton(table.scrollTop > scrollHeight * 0.25); // Show button when scrolled 25% down
            }
        };

        const { current: table } = tableRef;
        if (table) {
            table.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (table) {
                table.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleAddNew = () => {
        setformData({
            title: '',
            documentType: '',
            ContactMobile: '',
            email: '',
            department: ''

        })
        setShowAddModal(true);

    };

    

    const handleCloseModal = () => {
        setShowAddModal(false);
        setShowViewModal(false);
        setShowEditModal(false);
        // Clear form data
        setformData({
            title: '',
            documentType: '',
            ContactMobile: '',
            email: '',
            department: ''
        });

    };


    //---------------------------------------------------------------------------------//
   


    const handleAddSubmit = (event) => {
        event.preventDefault();
        const formData = new formData();
        formData.append("data", JSON.stringify(payload));
        // Validate form fields
        if (
            formData.title.trim() === '' ||
            formData.documentType.trim() === '' ||
            formData.ContactMobile.trim() === '' ||
            formData.email.trim() === '' ||
            !isValidEmail(formData.email) || // Check if email is valid
            formData.department.trim() === ''
        ) {
            showAlert('Please fill in all fields and provide a valid email address.', 'danger');
            return;
        }


        // Create payload
        const payload = {
            title: title,
            documentType: documentType,
            ContactMobile: ContactMobile,
            confirmpassword: confirmpassword,
            email: email,
            department: department,
        };

      


        //connect backend with django -----------------//
        // Send POST request
        axios.post('http://192.168.0.180:8000/adddocument',)
            .then(response => {
                console.log("res -------->" + response);
                setLoading(false); // Hide spinner

                if (response.data.status === false) {
                    alert(response.data.message);
                    // Clear form fields
                    settitle('');
                    setdocumentType('');
                    setPassword('');
                    setContactMobile('');
                    setemail('');
                    setdepartment('');
                } else {
                    console.log(response);
                    setLoading(false);
                    alert(response.data.message);
                }
            })
            .catch(error => {
                setLoading(false); // Hide spinner
                console.log(error);
            });
    //---------------------------------------------------------------------------------//

    // Create a new row array with the form data
    const newRow = [
        formData.title,
        formData.documentType,
        formData.ContactMobile,
        formData.email,
        formData.department

    ];
    // Add the new row to the data state
    setData([...data, newRow]);
    // Show the View modal with the entered data
    // setShowViewModal(true);
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
};

const handleEditSubmit = (event) => {
    event.preventDefault();
    // Validate form fields
    if (
        formData.title.trim() === '' ||
        formData.documentType.trim() === '' ||
        formData.ContactMobile.trim() === '' ||
        formData.email.trim() === '' ||
        !isValidEmail(formData.email) || // Check if email is valid
        formData.department.trim() === ''
    ) {
        alert('Please fill in all fields and provide a valid email address.');
        return;
    }


    // Update the row in the data state with the edited data
    setData(prevData => {
        const newData = [...prevData];
        newData[selectedRow] = Object.values(formData);
        return newData;
    });
    setShowEditModal(false);
};
const handleView = (rowIndex) => {
    const adjustedIndex = data.length - 1 - rowIndex; // Adjust the index based on the reversed order
    setSelectedRow(adjustedIndex);

    // Update formData with data of the selected row
    const selectedData = data[adjustedIndex];
    setformData({
        title: selectedData[0],
        documentType: selectedData[1],
        ContactMobile: selectedData[2],
        email: selectedData[3],
        department: selectedData[4]
    });
    setShowViewModal(true);
};


const handleEdit = (rowIndex) => {
    const adjustedIndex = data.length - 1 - rowIndex; // Adjust the index based on the reversed order
    if (adjustedIndex !== null) {
        setShowEditModal(true);

        // Populate formData with data of the selected row
        const selectedData = data[adjustedIndex];
        setformData({
            title: selectedData[0],
            documentType: selectedData[1],
            ContactMobile: selectedData[2],
            email: selectedData[3],
            department: selectedData[4]
        });
        // setShowViewModal(true);
    }
};

const handleDelete = (rowIndex) => {
    //DELETE CONFRMATION MESSAGE 
    if (window.confirm("Are you sure you want to delete this record?")) {
        const newData = [...data];
        newData.splice(rowIndex, 1); // Remove the row at rowIndex
        setData(newData);
    }
};


const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


// Inside the component function
const handleDeleteAll = () => {
    // Confirmation dialog before deleting all records
    if (window.confirm("Are you sure you want to delete all records?")) {
        // Clear the data array
        setData([]);
    }
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });


};

// Calculate the total number of pages based on the data length and itemsPerPage
const totalPages = Math.ceil(data.length / itemsPerPage);

// Calculate the index of the first item on the current page
const firstIndex = (currentPage - 1) * itemsPerPage;

// Calculate the index of the last item on the current page
const lastIndex = Math.min(currentPage * itemsPerPage, data.length);

// Get the current page data
const currentData = data.slice(firstIndex, lastIndex);

// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);


// Function to handle scroll event
useEffect(() => {
    const handleScroll = () => {
        const { current: table } = tableRef;
        if (table) {
            const scrollHeight = table.scrollHeight - table.clientHeight;
            setShowScrollButton(table.scrollTop > scrollHeight * 0.25); // Show button when scrolled 25% down
        }
    };

    const { current: table } = tableRef;
    if (table) {
        table.addEventListener('scroll', handleScroll);
    }

    return () => {
        if (table) {
            table.removeEventListener('scroll', handleScroll);
        }
    };
}, []);





// Function to scroll to the top of the page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Optional: smooth scrolling behavior
    });
};




return (
    <>
        <Navbar className='mb-4' title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <div className="mb-3 st">
            {data.length > 1 && <Button variant="danger" style={{ marginTop: '92px' }} onClick={handleDeleteAll}>Delete All Records</Button>}
            <Button variant="info" style={{ marginTop: '92px', float: 'right' }} onClick={handleAddNew}>+ADD NEW</Button>{' '}
        </div>
        <Table responsive >
            <thead>
                <tr>
                    {titles?.map((title, index) => (
                        // {/* Adjusted style based on mode */}
                        <th key={index} style={{ color: mode === 'dark' ? 'white' : 'black' }}>{title}</th>
                    ))}
                </tr>
            </thead>
            <tbody style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={titles.length} style={{ color: 'red' }}>No record found</td>
                    </tr>
                ) : (
                    data.slice().reverse().map((row, rowIndex) => ( // Reverse the order of data array
                        <tr key={rowIndex}>
                            <td>{data.length - rowIndex}</td> {/* Adjust the index to display descending order */}
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                            <td><Button variant="primary" onClick={() => handleView(rowIndex)}>View</Button></td>
                            <td><Button variant="warning" onClick={() => handleEdit(rowIndex)}>Edit</Button></td>
                            <td><Button variant="danger" onClick={() => handleDelete(rowIndex)}>Delete</Button></td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>


        {/* Add Modal */}
        <Modal show={showAddModal} onHide={handleCloseModal} size='sm' scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Add New Record</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(110vh - 200px)', overflowY: 'auto' }}> {/* Add custom styles for the modal body */}

                {/* Add form fields here */}
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required // Add this attribute for required validation
                        />
                    </Form.Group>
                    <Form.Group controlId="documentType">
                        <Form.Label>Document Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Document Type"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="ContactMobile">
                        <Form.Label>Contact Mobile</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Contact Mobile No"
                            name="ContactMobile"
                            pattern={/^[8-9][6]*$/}
                            value={formData.ContactMobile}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email ID"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Button variant="primary" onClick={handleAddSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>

        {/* View Modal */}
        <Modal show={showViewModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>View Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Document Type:</strong> {formData.documentType}</p>
                <p><strong>Contact Mobile:</strong> {formData.ContactMobile}</p>
                <p><strong>Email ID:</strong> {formData.email}</p>
                <p><strong>Department:</strong> {formData.department}</p>
                {/* Render other form fields here if needed */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/* Edit Modal */}

        <Modal show={showEditModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEditSubmit}>
                    <Form.Group controlId="editTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editDocumentType">
                        <Form.Label>Document Type</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Document Type"
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editContactMobile">
                        <Form.Label>Contact Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Contact Mobile"
                            name="ContactMobile"
                            value={formData.ContactMobile}
                            onChange={handleInputChange}
                            pattern="[8-9][0-9]*"
                            title="Please enter a valid Contact Mobile number starting with 8 or 9"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please enter a valid Contact Mobile number starting with 8 or 9.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="editEmail">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email ID"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editDepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>

        {/* Pagination */}

        <Pagination>
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>

        {/* Scroll To Top Button */}
        <Button variant="success" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }} disabled={!text || data.length === 0} // Disable the button when no records are found
        >
            Scroll To Top
        </Button>

    </>
);
    }


export default ResponsiveExample;
