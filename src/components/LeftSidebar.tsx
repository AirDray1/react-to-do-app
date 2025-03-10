import Search from "./Search";
import TasksBlock from "./TasksBlock";
import ListsBlock from "./ListsBlock";
import lists from "../ToDo.json";
import TagsBlock from "./TagBlock";
import ListElement from "./ListElement";
import { SettingsIcon, ExitIcon } from "../icons/icons";
import { Category, store, Tag } from "../Redux/redux copy";


function Sidebar() {    
    let categoriesList: Category[] = store.getState().categories;
    let tagList: Tag[] = store.getState().tags;

    return (<div className="sidebar">
        <div className="sidebar-head bar">
            <h2>Menu</h2>
            <div className="burger"></div>
        </div>
        <Search />
        <TasksBlock />
        <hr/>
        <ListsBlock name="Lists" arr={categoriesList}/>
        <hr/>
        <TagsBlock arr={tagList}/>
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