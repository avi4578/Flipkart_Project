import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import Navbar from './Navbar';
// import PropTypes from 'prop-types';
import '../App.css';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import the icons
// import { toggleMode } from './callexternalfunction';
// import { apibaseurl } from './Constant';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ToggleButton from 'react-bootstrap';


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
    const [colour, setcolour] = useState('');
    const [lastupdated, setlastupdated] = useState('');
    const [imageLoaded, setImageLoaded] = useState(true); // Initialize image loaded state
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
        size: '',
        colour: '',
    });

    const [selectedId, setSelectedId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const DocumentProperty = ({ label, value, children }) => (
        <p>
            <strong>{label}:</strong> {value || children}
        </p>
    );

    const baseurl = "http://192.168.0.210:8000/media/documents/doc/";

    const fetchData = async () => {
        try {
            const response = await axios.get(`${'http://192.168.0.210:8000'}/fetchproductDatawithproductid`);
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
            document.body.style.backgroundcolour = "white";
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
            document.body.style.backgroundcolour = "white";
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

        if (!title) {
            toast.error('Please Enter  title');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }





        if (!description) {
            toast.error('Please Enter  description');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        if (!product) {
            toast.error('Please Select  product');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }
        if (!category) {
            toast.error('Please Select  category');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }


        const imageFile = event.target.image.files[0];
        if (!imageFile) {
            toast.error('Please Select an image');
            return;
        }

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(imageFile.type)) {
            toast.error('Only PNG, JPEG, and JPG file types are allowed for the image');
            return;
        }
        if (!quantity) {
            toast.error('Please Select  quantity');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }





        if (!status) {
            toast.error('Please Select status');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        if (!size) {
            toast.error('Please Select  size');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }


        if (!colour) {
            toast.error('Please Enter  colour');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        const payload = {
            title: title,
            image: image,
            description: description,
            product: product,
            quantity: quantity,
            price: price,
            category: category,
            status: status,
            size: size,
            colour: colour,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        formData.append("image", event.target.image.files[0]);

        axios.post(`${'http://192.168.0.210:8000'}/add_products`, formData)
            .then(response => {
                setLoading(false); // Hide spinner${apibaseurl}

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
        setcolour("");
        setlastupdated("");

    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];


        setEditedDocument(prevState => ({
            ...prevState,
            image: file,
        }));


    };

    //----------------------------------------------AddDocument End//------------------------------------



    //----------------------------------------------EditDocument Start//------------------------------------

    const handleEditfetchdata = async (id) => {
        try {
            const response = await axios.get(`${'http://192.168.0.210:8000'}/handleEditfetchdata/${id}`);
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
                    colour: selectedData["colour"],

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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;



        setEditedDocument(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handlePriceChange = (e) => {
        // Get the entered value
        let value = parseInt(e.target.value);

        // Check if the entered value is less than zero
        if (value < 0) {
            // If less than zero, set it to zero
            value = 0;
        }

        // Update the state with the new value
        setEditedDocument(prevState => ({
            ...prevState,
            price: value
        }));
    };



    const handleEditSubmit = async (event) => {
        console.log("editedDocument", editedDocument);
        event.preventDefault();
        setLoading(true);
        if (editedDocument.title == null || editedDocument.title == "") {
            toast.error('Please Enter  title');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        // if (editedDocument.image==null ||editedDocument.image=="") {
        //     toast.error('Please Select  image');
        //     // setError({ ...error, country: 'Please select a country' });

        //     return;
        // }
        if (editedDocument.description == null || editedDocument.description == "") {
            toast.error('Please Enter  description');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        if (editedDocument.product == null || editedDocument.product == "") {
            toast.error('Please Select  product');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }
        if (editedDocument.category == null || editedDocument.category == "") {
            toast.error('Please Select  category');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }


        if (editedDocument.price == null || editedDocument.price == "") {
            toast.error('Please Enter  price');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }
        if (editedDocument.quantity == null || editedDocument.quantity == "") {
            toast.error('Please Select  quantity');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }



        if (editedDocument.status == null || editedDocument.status == "") {
            toast.error('Please Select status');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }

        if (editedDocument.size == null || editedDocument.size == "") {
            toast.error('Please Select  size');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }
        if (editedDocument.colour == null || editedDocument.colour == "") {
            toast.error('Please Enter colour');
            // setError({ ...error, country: 'Please select a country' });

            return;
        }








        const payload = {
            Id: editedDocument.Id,
            title: editedDocument.title,
            image: editedDocument.image,
            description: editedDocument.description,
            product: editedDocument.product,
            category: editedDocument.category,
            price: editedDocument.price,
            quantity: editedDocument.quantity,
            status: editedDocument.status,
            size: editedDocument.size,
            colour: editedDocument.colour,

            lastupdated: editedDocument.lastupdated,



        };

        // const formData = new FormData();
        // formData.append("data", JSON.stringify(payload));

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        formData.append("image", editedDocument.image); // Add this line to include the new image data

        try {
            const response = await axios.post(`${'http://192.168.0.210:8000'}/edit_products`, formData);
            if (response.data.status) {
                setShowEditModal(false);
                showAlert(response.data.message, "success");
                // Clear the editedDocument state after successful submission
                setEditedDocument({
                    Id: '',
                    title: '',
                    image: '',
                    description: '',
                    product: '',
                    category: '',
                    price: '',
                    quantity: '',
                    status: '',
                    size: '',
                    colour: '',
                    lastupdated: ''
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
            const response = await axios.get(`${'http://192.168.0.210:8000'}/ViewsinglefetchData/${id}`);
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
        setcolour('');
    };


    //----------------------------------------------close Modal End//------------------------------------

    //----------------------------------------------DeleteAllRecords Start//------------------------------------


    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all records?")) {
            try {
                // Delete records from the backend
                const response = await axios.delete(`${'http://192.168.0.210:8000'}/delete_all_products/`);

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
            const response = await axios.get(`${'http://192.168.0.210:8000'}/search_document`, {
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
            size: editedDocument.size,
            colour: editedDocument.colour,

        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));


        try {
            const response = await axios.delete(`${'http://192.168.0.210:8000'}/delete-document/${deleteId}`, formData);

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

                    <Button variant="danger" style={{ marginLeft: '1%' }} onClick={handleDeleteAll} disabled={documents.length <= 5}>Delete All Records</Button>

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
                            style={{ position: 'absolute', top: '19%', right: '157px', transform: 'translateY(-50%)', cursor: 'pointer' }}
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


            <Table style={{ backgroundcolour: "white" }}>
                <thead style={{ textAlign: 'center' }}>
                    <th>SR No</th>
                    <th>Title</th>
                    <th>image</th>
                    <th>Description</th>
                    <th>Product</th>
                    <th>category</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>size</th>
                    <th>colour</th>
                    <th>status</th>
                    <th>Edit</th>
                    <th>View</th>
                    <th>Delete</th>
                </thead>
                <tbody style={{ textAlign: 'center' }}>
                    {documents.length === 0 ? (
                        <tr>
                            <td colSpan={titles.length} style={{ colour: 'red' }}>No record found</td>
                        </tr>
                    ) : (
                        documents.map((document, index) => (
                            <tr key={document.Id}>
                                <td>{index + 1}</td>
                                <td>{document.title}</td>
                                <td>{document.image && (
                                    <img style={{ height: '46px' }}
                                        src={`${baseurl}/${document.image}`}
                                        alt="Document Image"
                                    />
                                )}</td>
                                <td>{document.description}</td>
                                <td>{document.product}</td>
                                <td>{document.category}</td>
                                <td>{document.price}</td>
                                <td>{document.quantity}</td>
                                <td>{document.size}</td>
                                <td>{document.colour}</td>
                                <td style={{ colour: document.status === 'Active' ? 'green' : document.status === 'Inactive' ? 'red' : 'inherit' }}>{document.status}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleEditfetchdata(document.Id)} >
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
                            {/* {error.handleImageUpload && <div className='error'>{error.handleImageUpload}</div>} */}

                        </div>



                        <div className="form-group ">
                            <input
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={description}
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
                                <option value="Headphones">Headphones</option>
                                <option value="Watches">Watches</option>
                                {/* <option value="Watches">Watches</option>
                                <option value="Watches">Watches</option>
                                <option value="Watches">Watches</option>
                                <option value="Watches">Watches</option>
                                <option value="Watches">Watches</option> */}
                                {/* Add more options as needed */}
                            </select>
                        </div>


                        <div className="form-group">
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)}
                                style={{ width: '99%' }}

                            >
                                <option value="">Select Category</option>
                                <option value="Kids">Kids</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="All">All</option>
                                <option value="Electronics">Electronics</option>


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
                                onChange={(e) => {
                                    const inputPrice = parseFloat(e.target.value);
                                    if (inputPrice > 0 || e.target.value === '') {
                                        setprice(inputPrice);
                                    }
                                }}
                            />
                        </div>




                        <div className="form-group">
                            <select
                                name="number"
                                value={quantity}
                                onChange={(e) => setquantity(e.target.value)}
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



                        <div className="form-group">
                            <select
                                 type="text"
                                 placeholder="Select Colour"
                                 name="colour"
                                 value={colour}
                                 onChange={(e) => setcolour(e.target.value)}
                                 style={{ width: '99%' }}

                            >
                                <option value="">Select Colour</option>
                                <option value="Red">Red</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <Button type="submit" variant="primary" style={{ marginLeft: '34%' }}>Submit</Button>
                    </form>
                </Modal.Body>
            </Modal>

            <ToastContainer />


            <Modal show={showEditModal} onHide={handleCloseModal} size='sm' scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Record</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(110vh - 200px)', overflowY: 'auto' }}>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label>Title:</label>

                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={editedDocument?.title || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Previous Image:</label>
                            <span>{editedDocument?.image ? editedDocument.image.name : "No previous image"}</span>
                        </div>



                        {/* Upload new image */}
                        {/* Input for uploading new image */}
                        <div className="form-group">
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
                                style={{ width: '99%' }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter description"
                                name="description"
                                value={editedDocument?.description || ''}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="form-group">
                            <select
                                name="product"
                                value={editedDocument?.product || ''}
                                onChange={handleInputChange}
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
                                type="number"
                                placeholder="Enter price"
                                name="price"
                                value={editedDocument.price}
                                style={{ width: '99%' }}
                                onChange={handlePriceChange}
                            />
                        </div>


                        <div className="form-group">
                            <select
                                name="quantity"
                                value={editedDocument?.quantity || ''}
                                onChange={handleInputChange}

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
                                name="status"
                                value={editedDocument?.status || ''}
                                onChange={handleInputChange}
                                style={{
                                    width: '99%',
                                    colour: editedDocument?.status === 'Active' ? 'green' : editedDocument?.status === 'Inactive' ? 'red' : 'black'
                                }}
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select
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

                           


                            <div className="form-group">
                            <select
                                 type="text"
                                 placeholder="Select Colour"
                                 name="colour"
                                 value={editedDocument?.colour || ''}
                                 onChange={handleInputChange}
                                style={{ width: '99%' }}
                            >
                                <option value="">Select Colour</option>
                                <option value="Red">Red </option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                            </select>
                        </div>



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
                    <DocumentProperty label="Title" value={viewDocument.title} />
                    <DocumentProperty label="Image">
                        {viewDocument.image && (
                            <img
                                src={`${baseurl}/${viewDocument.image}`}
                                alt="Document Image"
                                style={{ maxWidth: '100%', maxHeight: '400px' }}
                            />
                        )}
                    </DocumentProperty>
                    <DocumentProperty label="Description" value={viewDocument.description} />
                    <DocumentProperty label="Product" value={viewDocument.product} />
                    <DocumentProperty label="Category" value={viewDocument.category} />
                    <DocumentProperty label="Price" value={viewDocument.price} />
                    <DocumentProperty label="Quantity" value={viewDocument.quantity} />
                    <DocumentProperty label="Status" value={viewDocument.status} />
                    <DocumentProperty label="Size" value={viewDocument.size} />
                    <DocumentProperty label="colour" value={viewDocument.colour} />
                    <DocumentProperty label="Last Updated" value={viewDocument.lastupdated} />
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