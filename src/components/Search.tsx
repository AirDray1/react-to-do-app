import { useState } from "react";
import { SearchIcon } from "../icons/icons"

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const searchRegex = /^[a-zA-Z0-9\s]*$/;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (searchRegex.test(value) || value === "") {
          setSearchTerm(value);
        }
    };
    return (
    <div className="search bar">
        <SearchIcon height={22} width={22} />
        <input 
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            className="search-input"
        />            
    </div>);
}

export default Search;