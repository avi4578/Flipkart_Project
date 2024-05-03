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


function EcommerceCurdoperationinform() {
    const titles = ["SR No", "title", "image ", "description", "product", "category", "price", "quantity", "status", "lastupdated", "View", "Edit", "Delete"];
    const [mode, setMode] = useState("light");
    const [alert, setAlert] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [title, setTitle] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [product, setproduct] = useState('');
    const [description, setdescription] = useState('');
    const [error, setError] = useState({});
    const [category, setcategory] = useState('');
    const [price, setprice] = useState('');
    const [loading, setLoading] = useState(false);
    const [quantity, setquantity] = useState('');
    const [status, setstatus] = useState('');
    const [image, setimage] = useState('');
    const [size, setsize] = useState('');
    const [lastupdated, setlastupdated] = useState('');

    const [editedDocument, setEditedDocument] = useState({
        Id: '',
        title: '',
        image: '',
        description: '',
        product: '',
        category: '',
        price: '',
        quantity: '',
        status: '',
        size: ''
    });

    const [selectedId, setSelectedId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);



    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.0.180:8000/fetchproductData');
            setDocuments(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        console.log("Title");
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

        // // Validate mobile number length
        // if (ContactMobile.length !== 10) {
        //     setError({ ...error, ContactMobile: 'Mobile number should be 10 digits' });
        //     return;
        // }

        const payload = {
            title: title,
            image: image,
            description: description,
            product: product,
            quantity: quantity,
            price: price,
            category: category,
            status: status,
            size: size
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        axios.post('http://192.168.0.180:8000/add_products', formData)
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
        setimage("");
        setdescription("");
        setproduct("");
        setstatus("");
        setcategory("");
        setprice("");
        setquantity("");
        setsize("");
        setlastupdated("");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        // Check file size
        if (file.size > 10 * 1024 * 1024) { // 10 MB in bytes
            setError("File size exceeds 10MB limit.");
            return;
        }

        // Check file type
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setError("Only PNG, JPEG, and JPG file types are allowed.");
            return;
        }

        setEditedDocument(prevState => ({
            ...prevState,
            image: file,
        }));
    };

    //----------------------------------------------AddDocument End//------------------------------------



    //----------------------------------------------EditDocument Start//------------------------------------

    const handleEditfetchdata = async (id) => {
        try {
            const response = await axios.get(`http://192.168.0.180:8000/handleEditfetchdata/${id}`);
            debugger;
            if (response.data.status) {
                const selectedData = response.data.data;
                console.log("selectedData=>", selectedData)
                console.log(response.data.data)

                setEditedDocument({
                    Id: selectedData["Id"],
                    title: selectedData["title"],
                    image: selectedData["image"],
                    description: selectedData["description"],
                    product: selectedData["product"],
                    category: selectedData["category"],
                    price: selectedData["price"],
                    quantity: selectedData["quantity"],
                    status: selectedData["status"],
                    size: selectedData["size"],
                    // lastupdated:selectedData["lastupdated"]
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
        if (!editedDocument.Id || !editedDocument.Title || !editedDocument.category || !editedDocument.product || !editedDocument.quantity || !editedDocument.price || !editedDocument.status || !editedDocument.size) {
            setLoading(false);
            showAlert("Please fill in all the fields", "danger");
            return;
        }


        const payload = {
            Id: editedDocument.Id,
            Title: editedDocument.Title,
            image: editedDocument.image,
            description: editedDocument.description,
            product: editedDocument.product,
            category: editedDocument.category,
            price: editedDocument.price,
            quantity: editedDocument.quantity,
            status: editedDocument.status,
            size: editedDocument.size,
            lastupdated: editedDocument.lastupdated,

        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        try {
            const response = await axios.post('http://192.168.0.180:8000/edit_products', formData);
            if (response.data.status) {
                setShowEditModal(false);
                showAlert(response.data.message, "success");
                // Clear the editedDocument state after successful submission
                setEditedDocument({
                    Id: '',
                    Title: '',
                    image: '',
                    description: '',
                    product: '',
                    category: '',
                    price: '',
                    quantity: '',
                    status: '',
                    size: '',
                    lastupdated:''
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
            const response = await axios.get(`http://192.168.0.180:8000/ViewsinglefetchData/${id}`);
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
        setimage('');
        setdescription('');
        setproduct('');
        setcategory('');
        setprice('');
        setquantity('');
        setstatus('');
        setsize('');
    };


    //----------------------------------------------close Modal End//------------------------------------

    //----------------------------------------------DeleteAllRecords Start//------------------------------------


    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all records?")) {
            try {
                // Delete records from the backend
                const response = await axios.delete('http://192.168.0.180:8000/delete_all_products/');

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
                    description: trimmedQuery,
                    product: trimmedQuery,
                    category: trimmedQuery,
                    price: trimmedQuery,
                    quantity: trimmedQuery,
                    status: trimmedQuery,
                    size: trimmedQuery
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
            Title: editedDocument.Title,
            description: editedDocument.description,
            image: editedDocument.image,
            product: editedDocument.product,
            category: editedDocument.category,
            price: editedDocument.price,
            quantity: editedDocument.quantity,
            status: editedDocument.status,
            created_at: editedDocument.created_at,
            updated_at: editedDocument.updated_at,
            size: editedDocument.size

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
                    <th >Title</th>
                    <th >image</th>
                    <th>Description</th>
                    <th>Product</th>
                    <th>category</th>
                    <th >price</th>
                    <th>quantity</th>
                    <th>size</th>
                    <th>status</th>
                    
                    {/* <th>lastupdated</th> */}
                    <th >Edit</th>
                    <th >View</th>
                    <th >Delete</th>
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
                                <td>{document.title}</td>
                                <td>{document.image}</td>
                                <td>{document.description}</td>
                                <td>{document.product}</td>
                                <td>{document.category}</td>
                                <td>{document.price}</td>
                                <td>{document.quantity}</td>
                                <td>{document.size}</td>
                                <td>{document.status}</td>
                                {/* <td>{document.lastupdated}</td> */}

                                {/* <td><Button variant="warning" onClick={() => handleEditfetchdata(document.Id)}>Edit</Button></td> */}
                                <td>
                                    <Button variant="warning" onClick={() => handleEditfetchdata(document.Id)}>
                                        Edit
                                    </Button>
                                </td>
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
                        <div className="form-group">
                            <input
                                type="file"
                                name="image"
                                accept=".png,.jpg,.jpeg"
                                onChange={handleImageUpload}
                                style={{ width: '99%' }}

                            />
                            {error.handleImageUpload && <div className='error'>{error.handleImageUpload}</div>}

                        </div>



                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={description}
                                required
                                maxLength={10}
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div>


                        <div className="form-group">
                            <select
                                value={product}
                                onChange={(e) => setproduct(e.target.value)}
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Product</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Watches">Watches</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>


                        <div className="form-group">
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                                required
                                style={{ width: '99%' }}

                            >
                                <option value="">Select Category</option>
                                <option value="Kids">Kids</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="All">All</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>




                        <div className="form-group ">
                            <input
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={price}
                                style={{ width: '99%' }}
                                required
                                maxLength={10}
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </div>



                        <div className="form-group">
                            <select
                                name="number"
                                value={quantity}
                                onChange={(e) => setquantity(e.target.value)}
                                required
                                style={{ width: '99%' }}

                            >
                                <option value="">Select Quantity</option>
                                <option value="1"> 1</option>
                                <option value="2"> 2</option>
                                <option value="3"> 3</option>
                                <option value="4"> 4</option>
                                <option value="5"> 5</option>
                                <option value="6"> 6</option>
                                <option value="7"> 7</option>
                                <option value="8"> 8</option>
                                <option value="9"> 9</option>
                                <option value="10"> 10</option>

                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div className="form-group">
                            <select
                                name="status"
                                value={status}
                                onChange={(e) => setstatus(e.target.value)}
                                required
                                style={{ width: '99%' }}

                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div className="form-group">
                            <select
                                name="size"
                                value={size}
                                onChange={(e) => setsize(e.target.value)}
                                required
                                style={{ width: '99%' }}

                            >
                                <option value="">Select Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <Button type="submit" variant="primary" style={{ marginLeft: '34%' }}>Submit</Button>
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
                                value={editedDocument?.title || ''}
                                onChange={handleInputChange}
                                required
                                maxLength={25}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                value={editedDocument?.image || ''}
                                // onChange={(e) => handleImageUpload(e)}
                                required
                                style={{ width: '99%' }}

                                maxLength={25}

                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="Title"
                                value={editedDocument?.title || ''}
                                onChange={handleInputChange}
                                required
                                maxLength={25}
                            />
                        </div>


                        <div className="form-group">
                            <select
                                name="product"
                                value={editedDocument?.product || ''}
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Product</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Watches">Watches</option>
                            </select>
                        </div>




                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter price"
                                name="price"
                                value={editedDocument?.price || ''}
                                onChange={handleInputChange}
                                required
                                style={{ width: '99%' }}
                                maxLength={25}
                            />
                        </div>


                        <div className="form-group">
                            <select
                                name="number"
                                value={editedDocument?.quantity || ''}
                                required
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Quantity</option>
                                {[...Array(10).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                            </select>
                        </div>




                        <div className="form-group">
                            <select
                                type="text"
                                placeholder="Select status"
                                name="status"
                                value={editedDocument?.status || ''}
                                onChange={handleInputChange}
                                required
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select
                                placeholder="Select size"
                                name="size"
                                value={editedDocument?.size || ''}
                                onChange={handleInputChange}
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Size</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                        </div>

                        <Button type="submit" variant="primary" style={{ marginLeft: '34%' }}>Submit</Button>
                    </form>
                </Modal.Body>
            </Modal>


            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size='lg' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>View Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>title:</strong> {viewDocument.title}</p>
                    <p><strong>Image:</strong></p>
                    {viewDocument.image && (
                        <img src={viewDocument.image} alt="Document Image" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                    )}
                    <p><strong>Description:</strong> {viewDocument.description}</p>
                    <p><strong>Product:</strong> {viewDocument.product}</p>
                    <p><strong>Category:</strong> {viewDocument.category}</p>
                    <p><strong>Price:</strong> {viewDocument.price}</p>
                    <p><strong>Quantity:</strong> {viewDocument.quantity}</p>
                    <p><strong>Status:</strong> {viewDocument.status}</p>
                    <p><strong>Size:</strong> {viewDocument.size}</p>
                    <p><strong>lastupdated:</strong> {viewDocument.lastupdated}</p>

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

export default EcommerceCurdoperationinform;