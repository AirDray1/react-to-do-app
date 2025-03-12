import { useState } from "react";
import { Category, store, Tag, Task } from "../../redux/redux";

interface AddInputProps {
    regex: RegExp;
    pushObj: (obj: Task | Category | Tag) => void;
    placeholder?: string;
}

const AddInput: React.FC<AddInputProps> = ({ regex, pushObj, placeholder = "Add new item" }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && regex.test(inputValue.trim())) {
            const newObj: Partial<Task | Category | Tag> = {
                id: crypto.randomUUID(),
                userId: 1, // This should be dynamically set
                name: inputValue.trim(),
                color: "#000000", // Default color (for categories/tags)
            };

            pushObj(newObj as Task | Category | Tag);
            setInputValue("");
        }
    };

    return (
        <input
            className="task-input border p-2 rounded shadow"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
}