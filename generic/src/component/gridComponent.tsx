import React from 'react';
// import { Fruit } from '../App';

// with Array
// interface Item {
//     id : string
// }
type Item = {
    id: number
}
// with HashMap
interface AppProp {
    items: {
        [key: string] : Item 
    }
}

// interface AppProp {
//     items: {
//         [key :string]: T 
//     }
// }
const GridComponent =({items}:AppProp) => {
    return (
        <div>
            {Object.keys(items).map((id )=> <p key={id}>{JSON.stringify(items[id])}</p>)}
        </div>
    );
};
// const GridComponent  = <T extends {}>({items}:AppProp<T>) => {
//     return (
//         <div>
//             {Object.keys(items).map((id )=> <p key={id}>{JSON.stringify(items[id])}</p>)}
//         </div>
//     );
// };
// <p key={item.id}>{JSON.stringify(item)}</p>
export default GridComponent;