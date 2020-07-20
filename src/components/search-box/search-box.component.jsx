import React from "react";
import './search-box.styles.css';

//We use components when we just want to render som HTML without a state or lifecycle
export const SearchBox = ({ placeholder, handleChange }) => (
    <div>
        {/*We make a dynamic search field with a dynamic function*/}
        <input type={`search`} className='search' placeholder={placeholder} onChange={handleChange}/>
    </div>
)