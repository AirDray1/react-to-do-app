import { Category, store, Tag, Task } from "../Redux/redux copy";
import ListElement from "./ListElement";

function ListsBlock(prop: { name: string, arr: Category[] | Tag[]}) {
    console.log("prop.arr: ",prop.arr)
    let taskElements = prop.arr.map(el => {
        let listLength: number = store.getState().todos.filter(e => e.categoryId === el.id).length;
        return(<ListElement icon={el.color} text={el.name} counter={listLength} />)
    })
    return (
    <div className="lists bar">
        <h4 className="block-headling">{prop.name}</h4>   
        <div className="block-list lists-block">
            {taskElements}
        </div>      
    </div>);
}

export default ListsBlock;