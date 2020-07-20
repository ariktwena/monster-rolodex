//Import react
import React from "react";

//Import CSS
import './card-list.styles.css';

//Import Card
import { Card } from '../card/card.component';


//We export out the card-list component with "props"
//Props is every component we add when we use it. Se the App.js file where we use the CardList
export const CardList1 = (props) => {
    console.log('---');
    console.log(props);
    console.log('---');
    return (<div>Hallo props</div>)
};

//We can also target children of props. This is what is between the tags <div> The children </div>
export const CardList2 = (props) => {
    console.log('---');
    console.log(props);
    console.log(props.children);
    console.log('---');
    return (<div>{props.children}</div>)
};

//We add css to the component and target the children that comes from our API
export const CardList3 = (props) => {
    return (<div className='card-list'>{props.children}</div>)
};

//We generate a CardList that includes the props and html
export const CardList = (props) => {
    //We use "map" because it will be used on every element in the array, and will return a new array
    //We give every element a uniq key, if we need to update a element
    return (<div className='card-list'>
        {props.monstersFromAPI.map(currentElement => (
            <Card key={currentElement.id} currentElement={currentElement}/>
        ))}
    </div>)
};





