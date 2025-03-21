import Search from "../components/Search";
import TasksBlock from "../components/TasksBlock";
import ListsBlock from "../components/ListsBlock";
import TagsBlock from "../components/TagBlock";
import ListElement from "../components/ListElement";
import { SettingsIcon, ExitIcon } from "../icons/icons";
import { Category, RootState, store, Tag } from "../redux/redux";
import AddInput from "./mainComponents/AddInput";
import { useSelector } from "react-redux";


function Sidebar() {    
    let categoriesList: Category[] = useSelector((state: RootState) => state.categories);
    const tagList: Tag[] = useSelector((state: RootState) => state.tags);

    const handleAddCategory = (newTask: string) => {
        let pushObj: Category = {
            id: `${crypto.randomUUID()}`,
            userId: 1,
            name: newTask,
            color: '#fac'
        }    
        store.dispatch({type: "ADD_CATEGORY", payload: pushObj});
    };

    const handleAddTag = (NewTag: string) => {
        let pushObj: Tag = {
            id: `${crypto.randomUUID()}`,
            userId: 1,
            name: NewTag,
            color: '#fac'
        }    
        store.dispatch({type: "ADD_TAG", payload: pushObj});
    }

    return (<div className="sidebar">
        <div className="sidebar-head bar">
            <h2>Menu</h2>
            <div className="burger"></div>
        </div>
        <Search />
        <TasksBlock />
        <hr/>
        <ListsBlock name="Lists" arr={categoriesList}/>
        <div className="block-list lists-block">
            <AddInput regex={/^[a-zA-Z0-9\s]{3,30}$/} pushObj={handleAddCategory} placeholder="Enter a new category..." maxLength={10}/>
        </div>
        <hr/>
        <TagsBlock arr={tagList}/>
        <div className="block-list lists-block">
            <AddInput regex={/^[a-zA-Z0-9\s]{3,30}$/} pushObj={handleAddTag} placeholder="Enter a new tag..." maxLength={10}/>
        </div>
        <div className="sidebar-bot block-list bar">
            <ListElement 
                icon={<SettingsIcon width={22} height={22}/>}
                text="Settings"
                onClick={() => console.log("1")} />
            <ListElement 
                icon={<ExitIcon width={22} height={22}/>}
                text="Sign out"
                onClick={() => console.log("1")} />
        </div>        
    </div>);
}

export default Sidebar;