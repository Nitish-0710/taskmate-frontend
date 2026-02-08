import AddButton from "./AddButton";
import DraggableCard from "./DraggableCard";
import { useDrop } from "react-dnd";
import { theme } from "./Theme";
// import { useDarkMode } from "../Context/DarkModeContext";
import { useDeviceType } from "../Hooks/UseDeviceType";
import React from "react";

function Column(props) {

    const colors = props.darkMode
        ? theme[props.status].dark
        : theme[props.status].primary;

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => {
            // console.log("DROPPED", item, "IN", props.header);
            // Only update if moving to a different column
            if (item.category !== props.header) {
                props.onTaskMove(item.id, props.header);
            }
        },
        hover: (item, monitor) => {
            if(monitor.isOver({shallow: true})){}
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const deviceType = useDeviceType()

    const cards = props.alltasks
        .filter((task) => task.category === props.header)
        .map((task) => (
            <React.Fragment>
                <DraggableCard
                    key={task.id}
                    taskid={task.id}
                    title={task.title}
                    description={task.desc}
                    duedate={task.duedate}
                    edit={() => props.edit(task.id)}
                    delete={() => props.delete(task.id)}
                    category={task.category} // Pass current category
                    status={props.status}
                />
                {isOver && (
                    <div
                        style={{
                            border: `2px dashed ${colors}`,
                            borderRadius: "4px",
                            padding: "16px",
                            textAlign: "center",
                            margin: "8px",
                            color: colors,
                        }}>
                        Drop task here
                    </div>
                )}
            </React.Fragment>
        ));

    return (
        <div
            ref={drop}
            className="column"
            style={{
                // backgroundColor: colors.primary, // Add opacity on hover
                minHeight: deviceType ? "100px" : "auto",
                border: `3px solid ${colors}`,
                borderRadius: "12px",
                transition: "background-color 0.2s ease",
            }}>
            <div
                className="columnTitle text-center"
                style={{
                    backgroundColor: colors,
                    // color: colors.text,
                    color: props.darkMode ? "#ffffff" : "#3a4b56",
                }}>
                <h3 className="m-0">{props.header}</h3>
            </div>

            <div className="columnBody">
                {cards.length > 0
                    ? cards
                    : isOver && (
                          <div
                              style={{
                                  border: `2px dashed ${colors}`,
                                  borderRadius: "4px",
                                  padding: "16px",
                                  textAlign: "center",
                                  margin: "8px",
                                  color: colors,
                              }}>
                              Drop task here
                          </div>
                      )}
            </div>            

            <div className="columnFooter" style={{borderTop: `2px solid ${colors}`}}>
                <AddButton
                    buttonId={props.buttonId}
                    bgcolor={colors}
                    class={`${props.header}-addBtn`}
                    showModal={props.showModal}
                    modalsubmit={props.modalsubmit}
                    status={props.status}
                    darkMode={props.darkMode}
                />
            </div>
        </div>
    );
}

export default Column;
