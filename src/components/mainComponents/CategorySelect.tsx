import { useSelector } from "react-redux";
import { Category, RootState, Tag } from "../../redux/redux";

function CategorySelect(prop:{category: Category, setCategory: (category: Category) => void}) {
    const categories = useSelector((state: RootState) => state.categories);
    const changeSelect = (select: Category | Tag, checkboxClass: string, setFunc: (item: Category | Tag) => void, onClose: string) => {
            const checkbox = document.querySelector<HTMLInputElement>(`.${checkboxClass}`)
            if (checkbox && onClose === "on") {
                checkbox.checked = false;
            }
            setFunc(select)
    }
    return (
        <div className="custom-task-select-block">
        <span className="custom-task-select-text">Choose the category:</span>
        <div className="custom-task-select">
            <span className="custom-task-select-category">{prop.category.name}</span>
            <input type="checkbox" className="custom-task-select-checkbox" />
            <ul className="cts">
                {categories.map(e => <li className="custom_task_selections" key={e.id} onClick={() => changeSelect(e, "custom-task-select-checkbox", prop.setCategory, "on")}>{e.name}</li>)}
            </ul>
        </div>
    </div>);
}

export default CategorySelect;