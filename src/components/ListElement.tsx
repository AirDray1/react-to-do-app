import { ReactElement } from "react";

function ListElement(prop: {icon: ReactElement | string, text: string, counter?: number, onClick: () => void}) {
    let counter = <div className="task-element-counter">
                    {prop.counter}
                </div>
    let ColorBlock: React.FC<{ color: string }> = ({color}) => {
        return (<div
            className="color-block-elem"
            style={{ backgroundColor: color }}
        ></div>)}
        
    return (
        <a href="#" className="list-elem" onClick={() => prop.onClick()}>
            <div className="list-elem-icon">
                {typeof(prop.icon) === "object" ? prop.icon : <ColorBlock color={prop.icon} />}
            </div>
            <div className="list-elem-text">
                {prop.text}
            </div>
            {prop.counter ? counter : <></>}
        </a>);
}

export default ListElement;