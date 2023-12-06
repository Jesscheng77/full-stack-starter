import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoInput from './Components/PhotoInput';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BobaForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    Restaurants: '',
    Address: '',
    Images: '',
    Number: '',
    Rating: '',
    Hours: '',
    Feedback: '',
    City: '',
  });
  const [isConfirmDeleteShowing, setConfirmDeleteShowing] = useState(false);
  

  function showConfirmDeleteModal() {
    setConfirmDeleteShowing(true)
  }

  function handleClose() {
    setConfirmDeleteShowing(false)
  }

  async function onDelete() {
    handleClose();
    try {
        await fetch(`/api/bobas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        navigate('/');
    } catch (error) {
        console.log(error);
    }
  }


  useEffect(() => {
    if (id) {
      fetch(`/api/bobas/${id}`)
        .then((response) => response.json())
        .then((json) => setData(json));
    }
  }, [id]);

  function onChange(event) {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      let path = '/api/bobas';
      let method = 'POST';
      if (id) {
        path = `/api/bobas/${id}`;
        method = 'PATCH';
      }
      const response = await fetch(path, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log(json);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }


  return <div className="container">
    <h1>Boba Form</h1>
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="Restaurants">Restaurants</label>
        <input type="text" id="Restaurants" name="Restaurants" value={data.Restaurants}
               onChange={onChange}
               className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="Address">Address</label>
        <textarea id="Address" name="Address" value={data.Address}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="Images">Attachments</label>
        <PhotoInput id="Images" name="Images"
                    onChange={onChange}
                    value={data.Images} valueUrl={data.ImagesUrl}
                    className="card">
          <div className="card-body">
            Click here or drag-and-drop here.
          </div>
        </PhotoInput>
      </div>
      <div className="mb-3">
        <label htmlFor="Number">Number</label>
        <textarea id="Number" name="Number" value={data.Number}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="Rating">Rating</label>
        <textarea id="Rating" name="Rating" value={data.Rating}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="Hours">Hours</label>
        <textarea id="Hours" name="Hours" value={data.Hours}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="Feedback">Feedback</label>
        <textarea id="Feedback" name="Feedback" value={data.Feedback}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="City">City</label>
        <textarea id="City" name="City" value={data.City}
                  onChange={onChange}
                  className="form-control" />
      </div>
      <div className="d-flex justify-content-between">
    <button type="submit" className="btn btn-primary">Submit</button>
    {id && <button onClick={showConfirmDeleteModal} type="button" className="btn btn-danger">Delete</button>}
  </div>
  <Modal show={isConfirmDeleteShowing} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this entry</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

    </form>

  </div>;
  
}






export default BobaForm;