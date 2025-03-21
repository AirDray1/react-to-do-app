import { useSelector } from "react-redux";
import { Category, isToday, RootState, store, Tag, Task } from "../../redux/redux";
import TaskComponent from "../mainComponents/TaskComponent";
import { useState } from "react";
import EditForm from "../mainComponents/EditForm";
import CategorySelect from "../mainComponents/CategorySelect";
import TagSelect from "../mainComponents/TagSelect";
import AddInput from "../mainComponents/AddInput";

function TodayPage() { 
    const todos = useSelector((state: RootState) => state.todos.filter(todo => isToday(todo.date)));
    const [tags, setTag] = useState<Tag[]>([]);
    const [category, setCategory] = useState<Category>(store.getState().categories[0]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleAddTask = (newTask: string) => {
        let pushObj = {
            id: `${crypto.randomUUID()}`,
            categoryId: category.id,
            tagsId: tags.reduce<string[]>((acc, el) => {
                acc.push(el.id);
                return acc;
            }, []),
            todo: newTask, 
            date: `${new Date().toISOString()}`,
            status: false,
            userId: 1
        }    
        store.dispatch({type: "ADD_TODO", payload: pushObj});
    };

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
                        <AddInput regex={/^[\w\s.,!?()'"-]{1,100}$/} pushObj={handleAddTask} placeholder="Enter a new task..." maxLength={38}/>
                        <CategorySelect category={category} setCategory={setCategory}/>
                        <TagSelect tags={tags} setTag={setTag} />
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