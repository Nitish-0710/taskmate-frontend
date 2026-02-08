import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import formatDate from "../Utils/formatDate.js"

export default function MyModal(props) {
    // console.log(props)
  const [submitting, setSubmitting] = useState(false);

  const modalTitle = props.isEditing ? "Update Task" : "Add Task";

  return (
    <Modal
      show={props.show || props.isEditing}
      onHide={props.onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);

          try {
            await props.modalsubmit(); 
            props.onHide();            
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Modal.Body>
          <Form.Group className="mb-3" controlId="task-name">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              value={props.title}
              onChange={props.titlevalue}
              placeholder="Learn a Chapter"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="task-description">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              value={props.description}
              onChange={props.descriptionvalue}
              rows={3}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="task-due-date"
            style={{ width: "30%" }}
          >
            <Form.Label>Task Due Date</Form.Label>
            <Form.Control
              type="date"
              value={formatDate(props.duedate)}
              onChange={props.datevalue}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            type="button"
            onClick={props.onHide}
            disabled={submitting}
          >
            Close
          </Button>

          <Button type="submit" disabled={submitting}>
            {submitting
              ? props.isEditing
                ? "Updating..."
                : "Adding..."
              : modalTitle}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
