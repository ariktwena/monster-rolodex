import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

//Import Card-list component
import { CardList1, CardList2, CardList3, CardList } from "./components/card-list/card-list.component";

//Import search field
import { SearchBox } from "./components/search-box/search-box.component";

//Class gives us access to the "state"
class App extends Component {

    constructor() {
        super();

        //The state
        this.state = {
            stringMessage: 'Scroll down to see the monster app',
            stringMessage1: 'Change this text by clicking',

            //We make an array of monsters
            monsters: [
                {
                    name: 'Frankenstein',
                    id: 34
                },
                {
                    name: 'Dracula',
                    id: 55
                },
                {
                    name: 'Zombie',
                    id: '5hdf'
                },
            ],
            monstersFromAPI: [],
            searchField: '',

        };

        // for the handleChange to work, we need to point "this" to the state. We only use this when handleChange is NOT a arrow function
        // this.handleChange = this.handleChange.bind(this);
    }

    //componentDidMount = when the component mounts on the page, it runs the code inside
    componentDidMount() {

        //We fetch() from an API, and that returns a promise with a response. We convert that response to JSON and then
        //again return a promise with we call "responseUsers".
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(responseUsers => {

            //We can see the array we are getting in the console
            console.log(responseUsers);

            //We set the monstersFromAPI array in out state, to the data we get from our API call
            this.setState({monstersFromAPI: responseUsers});

        });
    }

    //Handle change method that we use in our search box
    //In this format we have to bind "this" to the method
    // handleChange(event){
    //     //We console the value in the search field
    //     console.log(event.target.value);
    //
    //     //We set the state to the search field value, and make a call back function to see the result in the console
    //     //We use the call back function because the setState i asynchronous function, så the values can come faster then the function
    //     this.setState({searchField: event.target.value}, () => console.log(this.state.searchField));
    // }
    //In the arrow function we can set "this", and we dont need to bind
    handleChange = (event) => {
        //We console the value in the search field
        console.log(event.target.value);

        //We set the state to the search field value, and make a call back function to see the result in the console
        //We use the call back function because the setState i asynchronous function, så the values can come faster then the function
        this.setState({searchField: event.target.value}, () => console.log(this.state.searchField));
    }

    //The html to show
    render() {

        //We are destructuring so we can convert state properties to constants
        const {monstersFromAPI, searchField } = this.state;
        //Now we filter the monsters that match the search field
        const filterMonsters = monstersFromAPI.filter(monstersFromAPI => monstersFromAPI.name.toLowerCase().includes(searchField.toLowerCase()));

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} width="200px" className="App-logo" alt="logo" />

                    {/*From the state*/}
                    <p>{this.state.stringMessage}</p>

                    {/*From the state*/}
                    <p>{this.state.stringMessage1}</p>

                    {/*How to change value based on state*/}
                    <button onClick={() => this.setState({stringMessage1: 'Booom... it is changed!'})}>Change text</button>

                    {/*<p>*/}
                    {/*    Edit <code>src/App.js</code> and save to reload.*/}
                    {/*</p>*/}

                    {/*<a*/}
                    {/*    className="App-link"*/}
                    {/*    href="https://reactjs.org"*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*>*/}
                    {/*    Learn React*/}
                    {/*</a>*/}
                </header>

                {/*Monster app*/}
                <div className="Monsters">
                    {/*We render javaScript betwen the {}*/}
                    {

                        //We use "map" because it will be used on every element in the array, and will return a new array
                        //We give every element a uniq key, if we need to update a element
                        this.state.monsters.map(currentElement => <h1 key={currentElement.id}> {currentElement.name} </h1>)

                    }
                </div>

                {/*Monsters from API*/}
                <div className="Monsters1">

                    {/*CardList component*/}
                    <CardList1 name='Props'/>

                    {/*Props children */}
                    <CardList2 name='Parent prop'><h1>The child prop</h1></CardList2>

                    {/*CardList that holds mosters with CSS*/}
                    <CardList3 name='monsterGrid'>

                        {/*We render javaScript betwen the {}*/}
                        {

                            //We use "map" because it will be used on every element in the array, and will return a new array
                            //We give every element a uniq key, if we need to update a element
                            this.state.monstersFromAPI.map(currentElement => (<h1 key={currentElement.id}> {currentElement.name} </h1>))

                        }

                    </CardList3>


                    {/*Monster APP*/}
                    <h1> Monsters Rolodex </h1>

                    {/*Input element for the search field with a onChange function*/}
                    {/*<input type={`search`} placeholder={`Search for monster`} onChange={event => {*/}

                    {/*    //We console the value in the search field*/}
                    {/*    console.log(event.target.value);*/}

                    {/*    //We set the state to the search field value, and make a call back function to see the result in the console*/}
                    {/*    //We use the call back function because the setState i asynchronous function, så the values can come faster then the function*/}
                    {/*    this.setState({searchField: event.target.value}, () => console.log(this.state.searchField));*/}

                    {/*}}/>*/}
                    {/*We use aur created search component with the two props we created i the search box component (placeholder, handleChange) */}
                    {/*handleChange is a method we created above render()*/}
                    <SearchBox placeholder={`Search for monster`} handleChange={this.handleChange}/>
                    {/*We move all the code to CardList*/}
                    {/*we display monsters based on the search field and not the state*/}
                    {/*<CardList monstersFromAPI={this.state.monstersFromAPI}/>*/}
                    <CardList monstersFromAPI={filterMonsters}/>

                </div>
            </div>
        );
    }
}

//Function where we don't have access to the state, and it's more static
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

/**
 *
 * Different Development concepts
 *
 */


/**
 *
 *
 * Map()
 *
 */

const customArray = [1, 2, 3, 4];
console.log(customArray);

//If we want to increase the value of each value in the array, we use map() that will effect the value of every element in
// the array trough a function, and return a new array. We use this instead of a forEach loop
const newcustomArray1 =  customArray.map((currentElement) => currentElement + 1);
console.log(newcustomArray1);
//If we want to change all the values to "b"
const newcustomArray2 =  customArray.map((currentElement) => 'b');
console.log(newcustomArray2);
//If we completely change only the element, we can use an anonymous function
const newcustomArray3 =  customArray.map(() => 'change');
console.log(newcustomArray3);
console.log('--------');
//The info we can extract from map()
customArray.map((currentElement, index, array) => {
    console.log('Current element: ' +currentElement);
    console.log('Index number: ' + index);
    console.log('Array: ' + array);
    return null;
});
console.log('--------');


/**
 *
 * Filter
 *
 */

const customArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(customArray1);

//Filter will return a new array based on true or false compared to the function we give each value in the array
const newCustomArray12 = customArray1.filter((currentElement) => currentElement > 5);
console.log(newCustomArray12);
console.log('--------');


/**
 *
 * Include()
 *
 */

//We check to se if a element is included in an array
const defaultArray = [1, 2, 3, 4, 5];
console.log('Is 3 in the array: ' + defaultArray.includes(3));
console.log('Is 6 in the array: ' + defaultArray.includes(6));
console.log('Is 3 in the array from index 2: ' + defaultArray.includes(3, 2));
console.log('Is 3 in the array from index 3: ' + defaultArray.includes(3, 3));
//Searching the whole element in the array
const defaultArray1 = ['Arik', 'Hans'];
console.log('Is "ri" in the array: ' + defaultArray1.includes('ri'));
console.log('Is "Arik" in the array: ' + defaultArray1.includes('Arik'));
//Searching fragments of the array element
const mapArray = defaultArray1.map(currentElement => {
    console.log(currentElement + ' incl. "ri": ' + currentElement.includes('ri'));
})
console.log(mapArray);
//Searching objects
const defaultArray2 = [{id: 1}, {id: 3}];
console.log('{id: 1} is in the array: ' + defaultArray2.includes({id: 1})); //False because we can't search objects this way
const object1 = {id: 1};
const object2 = {id: 2};
const defaultArray3 = [object1, object2];
console.log('Object 2 is in the array: ' + defaultArray3.includes(object2)); //This is the way we search objects -> result is true


/**
 *
 * Find()
 *
 */

const findArray = [1, 2, 3, 4, 5];

//Result returns true/false depending on the result
//We want to see if an element is equal to 3. The Array gives us ONLY the first value that is true, so it stops at 3!!!
const result1 = findArray.find(currentElement => currentElement === 3);
console.log('Find result: ' + result1); //3
const result2 = findArray.find(currentElement => currentElement > 2);
console.log('Find result: ' + result2); //3
//We can find objects
const findPeople = [{id: 1, name: 'Hans'}, {id: 4, name: 'Arik'}, {id: 7, name: 'Peter'}];
const result3 = findPeople.find(currentElement => currentElement.id === 4);
console.log(result3);
console.log('Object id: ' + result3.id + ', and object name: ' + result3.name);


/**
 *
 * Reduce()
 *
 */

//We use reduce when we want ONE value at the end, and we want to add the values in an array together
const reduceArray = [1, 2, 3, 4, 5];
//The accumulator is the sum of the values in the array. The 0 is the accumulator start value
const result4 = reduceArray.reduce((accumulator, currentElement) => accumulator + currentElement, 0);
console.log('Reduce result with start accumulator value at 0: ' + result4) //15
const result5 = reduceArray.reduce((accumulator, currentElement) => accumulator + currentElement, 2);
console.log('Reduce result with start accumulator value at 2: ' + result5); //12



/**
 *
 * Promise
 *
 */

//A new promise is initialized. A promise will only return a resolve or a reject value. The promise will wait
    // until it get one of the values.
const myPromise = new Promise((resolve, reject) => {

    //We set a test delay
    setTimeout(() => {
        //After 3 sec out promise now holds the resolve value. To access that value we need to run a result function
        console.log('--------');
        resolve('Everything is okay!');
    }, 3000);

});

//A result function to get the value of the promise.
myPromise.then(result => console.log(result));

//We can chain as many .then() to a result as we want, because each one will be a new promise
myPromise.then(result => result + '&').then(result => result + '?').then(result => result + '**').then(result => console.log(result));

//To access the reject, for example a if statement. We don't need the reject, but it's good to have it, to debug API calls.
const myPromise1 = new Promise((resolve, reject) => {

    const testValue = false;

    if(testValue === true){

        //We set a test delay
        setTimeout(() => {
            resolve('Everything is okay!');
        }, 3000);

    } else {

        //The reject value
        console.log('--------');
        reject('This is the reject value');

    }

});

//To view the reject value, we need to add an catch() to the function
myPromise1.then(result => console.log(result)).catch(rejectResult => console.log(rejectResult));

//Fetch() is a promise
//No error
fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(json => console.log(json)).catch(error => console.log(error));
//With error
fetch('htt://jsonplaceholder.typicode.com/ERROR').then(response => response.json()).then(json => console.log(json)).catch(error => console.log('Error with website'));


/**
 *
 * Async Await
 *
 */

//We make a API request, and stack .then() promises to is. This is NOT a Async function
fetch('https://jsonplaceholder.typicode.com/users')
    //We get a response from the API
    .then(response => response.json())
    //The response gives us back users => response = users
    .then(users => {
        console.log('------ NOT Async Await ------');
        console.log(users);
        const firstUser = users[0];
        console.log(firstUser);
        return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
    })
    //We get a new response from the API
    .then(response => response.json())
    //We get a response from the API => response = posts
    .then(posts => console.log(posts))
    //We make a catch statement to catch ALL the error response
    .catch(error => console.log(error));

//This is how we convert the fetch() to Async function
const myAsyncFunction = async () => {
    //We make a try/catch for our await function
    try{
        console.log('------ Async Await!! ------');
        //We await a response from the fetch() and cast it to a const
        const myUserResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        //We convert to JSON, but this "operation" cant start before fetch() is done. We also make JSON an await for the next operation
        const users = await myUserResponse.json();
        const secondUser = users[1];
        console.log(secondUser);
        //We make an await again for the fetch() response
        const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id);
        //We convert to JSON, but this "operation" cant start before fetch() is done. We also make JSON an await for the next operation
        const posts = await postResponse.json();
        console.log(posts);
    } catch (error) {
        console.log(error);
    }
};
//We call the Async function
myAsyncFunction();



/**
 *
 * Memoization is a form of caching
 *
 */

//We make a simple function that doesn't remember the previous value
function addTo80(number) {
    return number + 80;
}
console.log(addTo80(5)); //85
console.log(addTo80(5)); //85

//We make a cache to store earlier calculations
let cache = {};
function memoizedAddTo80(number) {

    //If the operation takes long time, the number is stored in the cache
    if(number in cache){
        return cache[number];
    } else {
        //What happens the first time, when there is no number in the cache
        console.log('Long time');
        cache[number] = number + 180;
        return cache[number];
    }
}
console.log(memoizedAddTo80(5)); //185 + Long time (New calculation that is not in the cache)
console.log(memoizedAddTo80(5)); //185 (because it knows how to calculate 180 + 5, and it's in the cache)
console.log(memoizedAddTo80(5)); //185 (because it knows how to calculate 180 + 5, and it's in the cache)
console.log(memoizedAddTo80(7)); //187 + Long time (New calculation that is not in the cache)
console.log(memoizedAddTo80(7)); //187 (because it knows how to calculate 180 + 7, and it's in the cache)
console.log(memoizedAddTo80(5)); //185 (because it knows how to calculate 180 + 5, and it's in the cache)


/**
 *
 * Currying
 *
 */

//We change a function from taking multiple parameters, to taking one at a time = currying
//No currying:
const multiply = (a, b) => a * b;
console.log('Multiply: ' + multiply(2, 6)); //12
//Currying
const curryingMulti = (a) => (b) => a * b;
//Each element is being called in a ()
console.log('Multiply with currying: ' + curryingMulti(6)(6)); //36
const curryingMulti1 = (a) => (b) => (c) => a * b + c;
//Each element is being called in a ()
console.log('Multiply with currying: ' + curryingMulti1(6)(6)(10)); //46

//We can store a part of the currying and use later
const curryingMulti2 = (a) => (b) => a + b;
//We have to call a first. We cant store b and leave a blank!!!
const storesFirstPartOfCurrying = curryingMulti2(160);
//We can now use the stores curry value and finish the function.
console.log('Finish the curry function that has a = 160, and b = 70: ' + storesFirstPartOfCurrying(70)); //230


/**
 *
 * Update React
 *
 */

//1. Got to the folder in the Terminal and write: npm list react react-dom react-scripts

//2. Add a tilda(^) to the dependencies you want to update to latest version
//In the JSON file, we can add "^" in front of the version we want to auto update.
//The "^" will make sure, that we dont get a smaller version, and we will always update to highest stable version

//3. updated the dependencies by writing: npm update
//npm will update all packages even without tilda(^), but tilda(^) makes sure we npm doesnt skip updates by mistake


/**
 *
 * Fixing vulnerabilities
 *
 */

//If an update or install gives a vulnerability, the write: npm audit fix
//This will make npm find later versions without vulnerabilities that are compatible with all packages







export default App;
