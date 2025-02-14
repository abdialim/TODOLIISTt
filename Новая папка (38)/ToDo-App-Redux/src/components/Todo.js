import React, { useContext, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarIcon from '@mui/icons-material/Star';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Remove, Update_data } from "../redux/actions/action";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteContext } from './context/ContextProvider';

const Todo = () => {
    const { User_data } = useSelector((state) => state.todoreducers);

    const { dlttask, setDlettask } = useContext(DeleteContext);

    const dispatch = useDispatch();

    const [showeye, setShoweye] = useState(false);
    const [showeyevalue, setShoweyeValue] = useState("");
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState("");
    const [ind, setInd] = useState("");
    
    const [crossedItems, setCrossedItems] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]); 

    const handleClose = () => setShow(false);

    const handleShow = (el) => {
        setShow(true);
        setUpdate(el);
    }

    const remove = (id) => {
        dispatch(Remove(id));
        setDlettask(true);
    }

    const usertask_update = () => {
        dispatch(Update_data(update, ind));
        handleClose();
    }

    const toggleCrossItem = (index) => {
        if (crossedItems.includes(index)) {
            setCrossedItems(crossedItems.filter(item => item !== index));
        } else {
            setCrossedItems([...crossedItems, index]);
        }
    };

    const toggleFavoriteItem = (index) => {
        if (favoriteItems.includes(index)) {
            setFavoriteItems(favoriteItems.filter(item => item !== index));
        } else {
            setFavoriteItems([...favoriteItems, index]);
        }
    };

    return (
        <>
            <div className="todo_data col-lg-5 mx-auto mt-2">
                {
                    User_data.map((ele, k) => {
                        return (
                            <div
                                className="todo_container mb-2 d-flex justify-content-between align-items-center px-2"
                                key={k}
                                style={{
                                    background: favoriteItems.includes(k) ? "red" : "#dcdde1", 
                                    borderRadius: "3px",
                                    height: "45px",
                                    textDecoration: crossedItems.includes(k) ? 'line-through' : 'none'
                                }}
                            >
                                <li style={{ listStyle: "none", cursor: "pointer", color: favoriteItems.includes(k) ? "white" : "black" }}>
                                    {ele}
                                </li>
                                <div className="edit_dlt col-lg-4 py-2 d-flex justify-content-between align-items-center">
                                    <ModeEditIcon
                                        onClick={() => {
                                            handleShow(ele);
                                            setInd(k);
                                            toggleCrossItem(k);
                                        }}
                                        style={{ color: "#3c40c6", cursor: "pointer" }}
                                    />
                                    <DeleteIcon
                                        onClick={() => {
                                            remove(k);
                                            toggleCrossItem(k);
                                        }}
                                        style={{ color: "red", cursor: "pointer" }}
                                    />
                                    <RemoveRedEyeIcon
                                        onClick={() => {
                                            setShoweye(true);
                                            setShoweyeValue(ele);
                                            toggleCrossItem(k);
                                        }}
                                        style={{ color: "#1dd1a1", cursor: "pointer" }}
                                    />
                                    <StarIcon
                                        onClick={() => toggleFavoriteItem(k)}
                                        style={{
                                            color: favoriteItems.includes(k) ? "white" : "gray",
                                            cursor: "pointer"
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })
                }

                <Modal show={showeye}>
                    <h1 className='text-center'>{showeyevalue}</h1>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShoweye(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show} onHide={handleClose}>
                    <h3 className='text-center mt-2'>Update Your Task</h3>
                    <Modal.Header>
                        <div className="todo col-lg-5 mx-auto d-flex justify-content-between align-items-center">
                            <input
                                name='task'
                                value={update}
                                onChange={(e) => setUpdate(e.target.value)}
                                className='form-control col-lg-5 mt-2'
                            />
                        </div>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => usertask_update()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Todo;
