import { Tag } from "../Redux/redux copy";
import TagElement from "./TagElement";

function TagsBlock(prop: {arr: Tag[]}) {
    let tagElements = prop.arr.map(el => <TagElement icon={el.color} text={el.name} />)
    return (
    <div className="lists bar">
        <h4 className="block-headling">Tags</h4>   
        <div className="tag-list">
            {tagElements}
        </div>      
    </div>);
}

export default TagsBlock;