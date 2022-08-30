import React, { useId } from 'react';
import axios from 'axios';
import { useState } from 'react';

import {useSpring, animated} from 'react-spring'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { getDatabase, ref, set } from "firebase/database";


const NavigateHaikoos = () => {

    // const [selected, setSelected] = useState(false);

    const [selected, setSelected] = useState({});
  
 
// This is really `ToggleTab` rather than `SelezionaTab`
const SelectHaikoo = (HaikooId = null) => {
   

    if (selected[HaikooId]) {
        playSound('/Audio/240776__f4ngy__card-flip.wav')
        // setSelected(false);
        setSelected({ ...selected, [HaikooId]: false });
        console.log("unselect")
        setCount(count - 1)
        UpdateSocialScore()
        console.log([HaikooId])
        console.log(HaikooId.key)
        // var new_social_score = [HaikooId].social_score + 1;
        // console.log( new_social_score)

   
    }
    else 
    {
        playSound('/Audio/when-604.mp3')
        setSelected({ ...selected, [HaikooId]: !selected[HaikooId] });
        setCount(count + 1)

        
        
    }

   
    console.log(count)

    console.log(HaikooId)

 
}


    // const idToken = await firebase.auth().currentUser.getIdToken(true);

    //     const social_score_response = await axios.post('https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json?auth=' + idToken, social_score_note)
    //     console.log(social_score_response)


    //     const social_score_note = {
           
    //         social_score: social_score,
    //     }

 

    function UpdateSocialScore(social_score) {
      const db = getDatabase();
      set(ref(db, 'haikoos/'+ "-NAgK4BiD52WEXKOVFGV" ), {
        social_score: social_score,
        
      });
    }
   
//     const db = getDatabase();

//     // A post entry.
//     const postData = {
//    social_score : social_score
//     };
  
//     // Get a key for a new Post.
//     const newPostKey = push(child(ref(db), 'haikoos')).key;
  
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/haikoos/' + newPostKey] = postData;
//     // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
//     return update(ref(db), updates);


const playSound = (url) => {
    const audio = new Audio(url);
    audio.play();
}






    const [fetched_haikoo, setFetchedHaikoo] = React.useState([]);

    React.useEffect(() => {
        fetchAPI();
      }, []);
    

    //   var selected = {author:"none", content:'not yet loaded'};

     async function fetchAPI() { 

        const idToken = await firebase.auth().currentUser.getIdToken(true);

        const response =  axios.get(
            'https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json?auth=' + idToken
            ).then(
            (response) => {
                let haikoo_array = Object.values(response.data);
                
                console.log(response)
                console.log(haikoo_array)
                console.log("fetchApi" )
                let rnd = Math.random() * haikoo_array.length 
                let rounded_rnd = Math.floor(rnd);
                setFetchedHaikoo(haikoo_array);
                // setSelectedHaikoo(haikoo_array[rounded_rnd])
            }
        )

        
        // const shuffled = Object.values(response.data).sort(() => 0.5 - Math.random());
        // console.log(shuffled)
        // selected = shuffled[0];
   
       
      
    }
    const inverseOpacity = o => 1 - o;
const inverseTransform = t =>
 `${t} rotateY(180deg)`;


  

//     const { opacity, transform } = useSpring({
//         config: {
//             friction: 22,
//             tension: 500
//         },

// 	opacity: selected ? 1 : 0,
// 	transform: `rotateY(
// 	 ${selected ? 90 : 0}deg)`
// });
// const [props, set] = useSpring(() => ({
// 	state: [0, 0, 1]
// }


// ));

// const transformCard = (x, y, scale) =>
//  `perspective(1000px) rotateX(${x}deg)
// 	rotateY(${y}deg) scale(${scale})`;
    
// const [currentRating, setRating]
//  = useState(rating);


const [count, setCount] = useState(0);

 function UnselectHaikoo() {
    playSound('/Audio/240776__f4ngy__card-flip.wav')
   setCount(0);
    setSelected(false);

 }

 function Evaluate() {
   

 }


    return (
        <div>
            <div id="fixed_head_count">
             <p>You selected {count} haikoos</p>
             <button onClick={UnselectHaikoo}>Reset</button>
             <button onClick={Evaluate}>Evaluate</button>
             </div>
             <li id="haikoopast"  >{fetched_haikoo.map((haikoo, i) =>
                    <animated.ul 
                    style={{
                        
                        opacity: selected[i] ? 1 : 0.9,
                        zIndex: selected[i] ? 98 : 1
                       
                    }}

//                     onClick={() => { props.inputText === '' ? 
//    alert("Text cannot be blank.") : 
//    props.onSubmit(props.inputText)  }}
//   onClick={() => this.props.setSelected(this.props.name)}
//    onClick={ () => {selected[i] ? UnselectHaikoo(i) : SelectHaikoo(i)}}
   onClick={ () =>  SelectHaikoo(i)}

     key={i} className={selected[i] ? "haikoo_card_selected "  : "haikoo_cards"}><h1 className='title_haikoo'>{haikoo.title}</h1><p className='haikoo_text'>"{haikoo.content}"</p> <br></br> <i> by {haikoo.author}</i><p id="technical_score">{haikoo.score}</p>{haikoo.social_score}<p></p> </animated.ul>

                )}</li>
            
        </div>
    );
};

export default NavigateHaikoos;