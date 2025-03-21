import { Category, RootState, Tag } from "../redux/redux";
import ListElement from "../components/ListElement";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function ListsBlock({ name, arr }: { name: string, arr: Category[] | Tag[] }) {
    const todos = useSelector((state: RootState) => state.todos);

    const todosByCategory = useMemo(() => {
        return todos.reduce((acc, todo) => {
            acc[todo.categoryId] = (acc[todo.categoryId] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [todos]);

    const taskElements = useMemo(() => {
        return arr.map(el => {
            const listLength = todosByCategory[el.id] || 0;
            return (
                <ListElement
                    key={el.id}
                    icon={el.color}
                    text={el.name}
                    counter={listLength}
                    onClick={() => console.log(el.name)}
                />
            );
        });
    }, [arr, todosByCategory]);

    return (
        <div className="lists bar">
            <h4 className="block-headling">{name}</h4>
            <div className="block-list lists-block">
                {taskElements}
            </div>
        </div>
    );
}

export default ListsBlock;
