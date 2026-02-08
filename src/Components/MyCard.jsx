import Card from "react-bootstrap/Card";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { theme } from "./Theme";
import formatDate from "../Utils/formatDate.js"

// style={{ backgroundColor: '#ffe3e8' }}

function MyCard(props) {
    // console.log(props)
    const colors = theme[props.status];

    return (
        <Card
            show={props.showcard}
            className="mb-2 w-100"
            style={{
                borderLeft: `4px solid ${colors.primary}`,
                backgroundColor: colors.primary + "50",
            }}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
                <div className="buttons mb-2">
                    <EditButton click={() => props.edit(props.taskid)} />
                    <DeleteButton click={() => props.delete(props.id)} />
                </div>
            </Card.Body>
            <Card.Footer className="text-muted">{formatDate(props.duedate)}</Card.Footer>
        </Card>
    );
}

export default MyCard;
