import { ReactElement } from "react";

function TagElement(prop: {icon: string, text: string}) {
    return (
        <a href="#" className="tag-elem" style={{ backgroundColor: prop.icon }}>
            <div className="tag-elem-text">
                {prop.text}
            </div>
        </a>);
}

export default TagElement;