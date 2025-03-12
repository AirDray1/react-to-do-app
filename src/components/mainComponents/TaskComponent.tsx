import { useState } from "react";
import { CalendarIcon, ChevronRightIcon } from "../../icons/icons";
import { formatDate, Task, Category, store } from "../../redux/redux";

function TaskComponent(prop: { element: Task, onTaskSelect: (task: Task) => void }) {
    const [completed, setCompleted] = useState<boolean>(prop.element.status)
    const changeCompleted = () => {
        setCompleted((prev: boolean) => !prev);
    };
    let categoryName: string = store.getState().categories.find((e: Category) => prop.element.categoryId === e.id)?.name || "";
    let categoryColor: string = store.getState().categories.find((e: Category) => prop.element.categoryId === e.id)?.color || "";  
    return (
    <div className="lists task-component">
        <input className="task-component-checkbox" type="checkbox" name={prop.element.todo} onChange={changeCompleted} checked={completed} />
        <h4 className="task-component-headling">{prop.element.todo}</h4>
        <ChevronRightIcon width={24} height={24} onClick={() => prop.onTaskSelect(prop.element)} />
        <div className="task-component-information">
            <span className="task-info-tag-calendar"><CalendarIcon width={16} height={16} /> {formatDate(prop.element.date)}</span>
            <span className="task-info-tag-count task-info-bar">
                <span className="task-info-tag-counter">{prop.element.tagsId.length}</span> 
                <span className="task-info-tag-text">Tags</span>
            </span>
            <span className="task-info-category task-info-bar">
                <span className="task-info-category-color" style={{ backgroundColor: categoryColor }}></span>
                <span className="task-info-category-name">{categoryName}</span>
            </span>
        </div>
    </div>);
}

export default TaskComponent;