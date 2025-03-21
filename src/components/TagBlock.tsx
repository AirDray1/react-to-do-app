import { Tag } from "../redux/redux";
import TagElement from "../components/TagElement";
import { useMemo } from "react";

function TagsBlock({ arr }: { arr: Tag[] }) {
    const tagElements = useMemo(() => {
        return arr.map(el => (
            <TagElement key={el.id} icon={el.color} text={el.name} />
        ));
    }, [arr]);

    if (!arr || arr.length === 0) {
        return (
            <div className="lists bar">
                <h4 className="block-heading">Tags</h4>
                <p>No tags available</p>
            </div>
        );
    }

    return (
        <div className="lists bar">
            <h4 className="block-headling">Tags</h4>
            <div className="tag-list">
                {tagElements}
            </div>
        </div>
    );
}

export default TagsBlock;
