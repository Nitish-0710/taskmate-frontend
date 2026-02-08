import { useDrag } from "react-dnd";
import MyCard from "./MyCard";

function DraggableCard(props) {
    // console.log(props)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: props.taskid, category: props.category},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: "move", touchAction: "none" }}>
            <MyCard
                title={props.title}
                description={props.description}
                duedate={props.duedate}
                edit={props.edit}
                delete={props.delete}
                status={props.status}
            />
        </div>
    );
}

export default DraggableCard;
