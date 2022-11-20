import React, { useEffect } from 'react';
import { useState } from "react";
import { animated } from "react-spring";
import { getDatabase, ref, onValue, runTransaction} from "firebase/database";
import { getApps } from "firebase/app";
import { getDownloadURL } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import { ref as sRef } from 'firebase/storage';

const storage = getStorage();

const Leaderboard = () => {

    const [fetched_haikoo, setFetchedHaikoo] = React.useState([]);

    React.useEffect(() => {
        fetchHaikoos()
      }, []);
    
      async function fetchHaikoos(){
        console.log("begin fetchHaikoos")
        const db = getDatabase();
        const haikoos = ref(db, 'Haikoos/');
        onValue(haikoos, (snapshot) => {
            console.log("got value")
            const data = snapshot.val();
           
            let haikoo_array = Object.values(data);
            // let randomId1 = Math.floor(Math.random() * haikoo_array.length) 
            // let randomId2 = Math.floor(Math.random() * haikoo_array.length) 
            // while(randomId1 === randomId2){
            //   randomId2 = Math.floor(Math.random() * haikoo_array.length) 
            // }
            //let HaikooDuo = Math.floor(random);
            let haikoo_ids = Object.keys(data);
            for (var i = 0; i < haikoo_array.length; i++) {
              haikoo_array[i].id = haikoo_ids[i];
            }

             haikoo_array = haikoo_array.sort((A,B) => (B.social_score - A.social_score))


    
            // var twoRandomHaikoo = [
            //   haikoo_array[randomId1],haikoo_array[randomId2],
            // ]
    
            // console.log(twoRandomHaikoo);
            setFetchedHaikoo(haikoo_array);

    //         getDownloadURL(ref(storage, `images/${current_user.uid}`))
    //   .then((url) => {
    //     // `url` is the download URL for 'images/stars.jpg'
    
      
    //     // Or inserted into an <img> element
    //     const img = document.getElementById('userpic');
    //     img.setAttribute('src', url);
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
    // }
        });
       
       
      }

      function fetchImage() {
        for (var i = 0; i < fetched_haikoo.length; i++) {
          var userID = fetched_haikoo[i].user_id
          // haikoo_array[i].id = haikoo_ids[i];
          getDownloadURL(sRef(storage, `images/${fetched_haikoo[i].user_id}`))
          
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
        
          
            // Or inserted into an <img> element
            const img = document.getElementById(userID);
            img.setAttribute('src', url);
          })
          .catch((error) => {
            console.log(error)
          });
        }
      }
    
    return (
        <div>
          <button onClick={fetchImage}>fetch image</button>
            <li id="haikoopast">
        {fetched_haikoo.map((haikoo, i) => (
          <animated.ul
            // style={{
            //   opacity: selected[i] ? 1 : 0.9,
            //   zIndex: selected[i] ? 98 : 1,
            // }}
            // onClick={() => SelectHaikoo(i,haikoo.id)}
            key={i}
            className={"haikoo_cards"}
          >
            <h1 className="title_haikoo">{haikoo.title}</h1>
            <p className="haikoo_text">"{haikoo.content}"</p>
            {/* <p className="haikoo_text">"{haikoo.id}"</p> */}
            <br></br>
            <span>
            <i> by {haikoo.author}</i><img className="miniature_pic" id={haikoo.user_id} /></span>
            <p id="technical_score">{haikoo.score}</p>
            <p id="popular_score">{haikoo.social_score}</p>
            
            {/* id={fetched_haikoo[i].user_id} */}
          </animated.ul>
        ))}
      </li>
        </div>
        
    );
};

export default Leaderboard;