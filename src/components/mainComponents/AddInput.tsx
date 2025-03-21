import { useState } from "react";

type InfoErrors = {
    maxLength: boolean;
    minLength: boolean;
    unique: boolean;
    tagAvalability: boolean;    
}

function AddInput (prop: { regex: RegExp, pushObj: (newTask: string) => void, placeholder: string, maxLength: number }) {
    const [inputValue, setInputValue] = useState<string>("");
    const [info, setInfo] = useState<InfoErrors>({maxLength: false, minLength: false, unique: false, tagAvalability: false});

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        let minLengthCheck: boolean = /^.{3,}$/.test(inputValue);
        // let maxLengthCheck: boolean = 

        for(let key in info){
            key === "maxLength" ? info[key as keyof InfoErrors] = /^.{3,}$/.test(inputValue) : console.log("missed maxLength")
            // key === "maxLength" ? info[key as keyof InfoErrors] = prop.maxLength
        }
        if (event.key === "Enter" && prop.regex.test(inputValue)) {
            prop.pushObj(inputValue.trim());
            setInputValue("");
        }
    };
    
    const handleClick = (event: React.MouseEvent) => {
        const el = document.elementFromPoint(event.clientX, event.clientY);
        if (el && window.getComputedStyle(el, "::before").content !== "none" && prop.regex.test(inputValue)) {
            prop.pushObj(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div className="task-input-content" onClick={handleClick}>
            <input
                className="task-input border p-2 rounded-md"
                placeholder={prop.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default AddInput