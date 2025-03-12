import { RootState, Tag } from "../../redux/redux";
import { useSelector } from "react-redux";

function TagSelect({ tags: selectedTags, setTag }: { tags: Tag[]; setTag: (tags: Tag[]) => void }) {
    const allTags = useSelector((state: RootState) => state.tags);
    
    const changeSelect = (selectedTag: Tag) => {
        const isSelected = selectedTags.some(tag => tag.id === selectedTag.id);

        if (isSelected) {
            setTag(selectedTags.filter(tag => tag.id !== selectedTag.id));
        } else {
            setTag([...selectedTags, selectedTag]);
        }
    };    

    return (
    <div className="custom-task-select-block">
        <span className="custom-task-select-text">You select {selectedTags.length} tags</span> 
        <div className="custom-tag-select-block">
            <input type="checkbox" className="custom-tag-select-checkbox" />
            <div className="custom-tag-select-checkbox-block">
                <span className="custom-tag-select-span">Choose tags</span>
                <ul className="cts">
                    {allTags.map(tag => {
                            const isChecked = selectedTags.some(selectedTag => selectedTag.id === tag.id);

                            return (
                                <li key={tag.id} className="custom_task_selections">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => changeSelect(tag)}
                                        />
                                        <span className="custom-task-span">{tag.name}</span>
                                    </label>
                                </li>
                            );
                    })}
                </ul>
            </div>
        </div>
    </div>);
}

export default TagSelect;