import { useEffect, useState } from "react";
import { CloseIcon } from "../../icons/icons";
import { RootState, store, Task } from "../../redux/redux";
import { useSelector } from "react-redux";
import CalendarForm from "./CalendarForm";

function EditForm(prop: {element: Task, onClose: () => void}) {
    const categories = useSelector((state: RootState) => state.categories)
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(new Date())
    
    
    useEffect(() => {
        setCategory(prop.element.categoryId);
        setTask(prop.element.todo);
        setDate(new Date(prop.element.date));
    }, [prop.element]); 


    const changeCategory = (select: string, checkboxClass: string) => {
        const checkbox = document.querySelector<HTMLInputElement>(`.${checkboxClass}`)
        if (checkbox) {
            checkbox.checked = false;
        }
        setCategory(select)
    }
    
    return (
        <div className="edit-block">
            <div className="edit-block-headling">
                <h4 className="edit-block-headling">Task:</h4>
                <CloseIcon width={18} height={18} onClick={prop.onClose}/>
            </div>
            <input className="edit-block-input" type="text" name="Task" value={task}  onChange={(e) => setTask(e.target.value)}/>
            {}
            <div className="edit-block-inforamtion">
                <div className="edit-block-part">
                    <span className="edit-block-key">Category:</span>
                    <div className="edit-block-category-value">
                        <span className="edit-block-select-category">{categories.find(e => e.id === category)?.name}</span>
                        <input type="checkbox" className="edit-block-select-checkbox" />
                        <ul className="cts edit-cts">
                            {categories.map(e => <li className="custom_task_selections" onClick={() => changeCategory(e.id, "edit-block-select-checkbox")}>{e.name}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="edit-block-part">
                    <span className="edit-block-key">Selected Date:</span>
                    <div className="edit-block-calendar-value">
                        <span className="edit-block-calendar-value">{date.toString().split(" ").slice(0, 4).join(" ")}</span>
                        <input type="checkbox" className="edit-block-calendar-checkbox" />
                        <CalendarForm date={date} setDate={setDate}/>
                    </div>
                </div>
                <div className="edit-block-part">
                    <span className="edit-block-key">Tags</span>
                    <div className="edit-block-value"></div>
                </div>
            </div>
            <div className="edit-block-buttons">
                <button className="edit-block-delete-button">Delete Task</button>
                <button className="edit-block-save-button" 
                        onClick={() => 
                            store.dispatch({
                                type: "UPDATE_TODO", 
                                payload: {id: prop.element.id, updates: {todo: task, categoryId: category, date: date.toString()}}
                        })}>Save changes</button>
            </div>      
        </div>
    )
};

export default EditForm;