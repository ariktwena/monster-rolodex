//Import React
import React from "react";

//Import CSS
import './card.styles.css';


//Export function Card that will return a <div>
export const Card = (props) => (
    <div className='card-container'>
        {/*Remember to use `` in the src!!*/}
        <img alt='monster' src={`https://robohash.org/${props.currentElement.id}?set=set2&size=180x180`} />
        <h2> {props.currentElement.name} </h2>
        <p> {props.currentElement.email} </p>
    </div>
);




