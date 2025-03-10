import { useSelector } from 'react-redux';
import { UpcommingArrowIcon, TaskListIcon, CalendarIcon, StikyWallIcon } from "../icons/icons";
import TasksElement from "./ListElement";
import TodayPage from "./mainPages/TodayPage";
import { store, RootState, isToday } from  "../Redux/redux copy"

function TasksBlock() {
    const todos = useSelector((state: RootState) => state.todos);

    const isUpcoming = (taskDate: string): boolean => {
        const now = new Date();
        const endOfWeek = new Date(); 
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    
        const taskDateObj = new Date(taskDate);
    
        return taskDateObj >= now && taskDateObj <= endOfWeek;
    };

    const upcomingCount = todos.filter(todo => !todo.status && isUpcoming(todo.date)).length;
    const todayCount = todos.filter(todo => !todo.status && isToday(todo.date)).length;

    return (
    <div className="tasks bar">
        <h4 className="block-headling">Tasks</h4>   
        <div className="block-list tasks-block">
            <TasksElement 
                icon={<UpcommingArrowIcon width={22} height={22}/>}
                text="Upcoming"
                counter={upcomingCount}
                onClick={() => store.dispatch({ type: 'SET_SELECTED_PAGE', payload: "Upcoming" })} />
            <TasksElement 
                icon={<TaskListIcon width={22} height={22}/>}
                text="Today" 
                counter={todayCount}
                onClick={() => store.dispatch({ type: 'SET_SELECTED_PAGE', payload:  "Today"})} />
            <TasksElement 
                icon={<CalendarIcon width={22} height={22}/>}
                text="Calendar"
                onClick={() => store.dispatch({ type: 'SET_SELECTED_PAGE', payload: "Calendar" })} />
            <TasksElement 
                icon={<StikyWallIcon width={22} height={22}/>}
                text="Stiky wall"
                onClick={() => store.dispatch({ type: 'SET_SELECTED_PAGE', payload: "Stiky wall" })} />
        </div>      
    </div>);
}

export default TasksBlock;