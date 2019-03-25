import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import _findIndex from 'lodash/findIndex';

// import axios from 'axios';

function save(data) {
    localStorage.setItem("nasa", JSON.stringify(data));
}

function addData(item, data, linkId, changeState) {
    item.link = `https://images-api.nasa.gov/asset/${linkId}`
    item.favorite = false;
    data.push(item);
    save(data);
}

function editData(id, item, data) {
    let dataIndex = _findIndex(data, {"id" : id});
    data[dataIndex] = item;
    save(data);
}

const AddModal = (props) => {
    const { item, list, open, handleClose, toggleNo, purpose } = props;

    if (purpose === "add") {
        return (
            <Modal show={open} onHide={() => {handleClose(toggleNo)}}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Form.Group controlId="itemTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title..." defaultValue={item.title}  onChange={(e) => { item.title = e.target.value }}/>
                        <Form.Text className="text-muted">
                        Your media title. Make it short and informative.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="itemDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" style={{resize: "none"}} placeholder="Enter description..." defaultValue={item.description}  onChange={(e) => { item.description = e.target.value }}/>
                        <Form.Text className="text-muted">
                        Your media description.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="itemPreviewLink">
                        <Form.Label>Media Preview Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter link..." defaultValue={item.preview}  onChange={(e) => { item.preview = e.target.value }} />
                    </Form.Group>
                    <Form.Group controlId="itemMediaLink">
                        <Form.Label>Media Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter link..." defaultValue={`https://images-api.nasa.gov/asset/${item.nasa_id}`}  onChange={(e) => { item.link = e.target.value }}/>
                    </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleClose(toggleNo)}}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {addData(item, list, item.nasa_id); handleClose(toggleNo); window.location.reload(); }}>
                  Add This Item
                </Button>
              </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={open} onHide={() => {handleClose(toggleNo)}}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Form.Group controlId="itemTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title..." defaultValue={item.title}  onChange={(e) => { item.title = e.target.value }}/>
                        <Form.Text className="text-muted">
                        Your media title. Make it short and informative.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="itemDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" style={{resize: "none"}} placeholder="Enter description..." defaultValue={item.description} onChange={(e) => { item.description = e.target.value }}/>
                        <Form.Text className="text-muted">
                        Your media description.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="itemPreviewLink">
                        <Form.Label>Media Preview Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter link..." defaultValue={item.preview} onChange={(e) => { item.preview = e.target.value }} />
                    </Form.Group>
                    <Form.Group controlId="itemMediaLink">
                        <Form.Label>Media Link</Form.Label>
                        <Form.Control type="text" placeholder="Enter link..." defaultValue={item.link} onChange={(e) => { item.link = e.target.value }}/>
                    </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {handleClose(toggleNo)}}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => {editData(item.id, item, list); handleClose(toggleNo)}}>
                    Save Item
                </Button>
              </Modal.Footer>
            </Modal>
        )
    }
}

export default AddModal;