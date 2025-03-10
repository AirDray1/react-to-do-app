import { useSelector } from "react-redux";
import { Category, isToday, RootState, store, Task } from "../../Redux/redux copy";
import TaskComponent from "../mainComponents/TaskComponent";
import React, { useEffect, useState } from "react";
import EditForm from "../mainComponents/EditForm";

function TodayPage() { 
    const todos = useSelector((state: RootState) => state.todos.filter(todo => isToday(todo.date)));
    const categories = useSelector((state: RootState) => state.categories)
    const tags = useSelector((state: RootState) => state.tags)
    const [tag, setTag] = useState(tags[0])
    const [category, setCategory] = useState(categories[0])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const changeTag = (select: Category, checkboxClass: string) => {
        const checkbox = document.querySelector<HTMLInputElement>(`.${checkboxClass}`)
        if (checkbox) {
            checkbox.checked = false;
        }
        setCategory(select)
    }

    const changeCategory = (select: Category, checkboxClass: string) => {
        const checkbox = document.querySelector<HTMLInputElement>(`.${checkboxClass}`)
        if (checkbox) {
            checkbox.checked = false;
        }
        setCategory(select)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const todoText: string = event.currentTarget.value.trim();
        const todoRegex: RegExp = /^[\w\s.,!?()'"-]{1,100}$/;
        if (event.key === 'Enter' && todoText !== "" && todoRegex.test(todoText)) {
            let pushObj = {
                id: crypto.randomUUID(),
                categoryId: category.id,
                tagsId: [],
                todo: event.currentTarget.value, 
                date: new Date().toISOString(),
                status: false,
                userId: 1
                
            }
            store.dispatch({type: "ADD_TODO", payload: pushObj})
            event.currentTarget.value = "";
        }
    }

    return (
    <>
        <div className="mainblock">
            <div className="main-container">
                <div className="main-tasks">
                    <div className="main-headline-block">
                        <h1 className="main-headling">
                            Today
                        </h1>
                        <span className="main-counter">
                            {todos.length}
                        </span>
                    </div>
                    <div className="task-input-wrapper">
                        <input className="task-input" placeholder="Add New Task" onKeyDown={handleKeyDown} />
                        <div className="custom-task-select-block">
                            <span className="custom-task-select-text">Choose the category:</span>
                            <div className="custom-task-select">
                                <span className="custom-task-select-category">{category.name}</span>
                                <input type="checkbox" className="custom-task-select-checkbox" />
                                <ul className="cts">
                                    {categories.map(e => <li className="custom_task_selections" key={e.id} onClick={() => changeCategory(e, "custom-task-select-checkbox")}>{e.name}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div className="custom-task-select-block">
                            <span className="custom-task-select-text">Select tags:</span>
                            <div className="custom-task-select">
                                <span className="custom-task-select-category">{tag.name}</span>
                                <input type="checkbox" className="custom-tag-select-checkbox" />
                                <ul className="cts">
                                    {tags.map(e => <li className="custom_task_selections" key={e.id} onClick={() => changeCategory(e, "custom-tag-select-checkbox")}>{e.name}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="tasks-content today-content">
                    {todos.map(e => (
                        <TaskComponent key={e.id} element={e} onTaskSelect={setSelectedTask} />
                    ))}
                    </div>
                </div>
                <div className="main-edit-block">
                {selectedTask ? (
                    <EditForm element={selectedTask} onClose={() => setSelectedTask(null)} />
                ) : null}
                </div>
            </div>
        </div>
    </>);
}

export default TodayPage;