import React from "react";
import { useState } from "react";
import { animated } from "react-spring";
import { getDatabase, ref, onValue, runTransaction} from "firebase/database";
import { getApps } from "firebase/app";
// import FavStar from "../Svg/favorite-star-svgrepo-com.svg"


const NavigateHaikoos = () => {
  console.log(getApps());
  const [selected, setSelected] = useState({});
  const [fetched_haikoo, setFetchedHaikoo] = React.useState([]);

  const SelectHaikoo = (HaikooId = null,trueHaikooId) => {
    if (selected[HaikooId]) {
      playSound("/Audio/240776__f4ngy__card-flip.wav");
      setSelected({ ...selected, [HaikooId]: false });
      console.log("unselect");
      setCount(count - 1);
      UpdateSocialScoreDown(trueHaikooId);

      console.log([HaikooId]);
      console.log(HaikooId.key);
    } else {
      playSound("/Audio/when-604.mp3");
      setSelected({ ...selected, [HaikooId]: !selected[HaikooId] });
      setCount(count + 1);
      UpdateSocialScore(trueHaikooId);
    }
    console.log(count);
    console.log(HaikooId);
  };

  function UpdateSocialScore(HaikooId) {

    const db = getDatabase();
    const haikooref = ref(db, 'Haikoos/' + HaikooId + '/')

    runTransaction(haikooref, (haikoo) => {
        if (haikoo) {
            haikoo.social_score ++
        }
        return haikoo;
      });
  }

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.play();
  };


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

        // var twoRandomHaikoo = [
        //   haikoo_array[randomId1],haikoo_array[randomId2],
        // ]

        // console.log(twoRandomHaikoo);
        setFetchedHaikoo(haikoo_array);
    });
  }

  const [count, setCount] = useState(0);

  function UpdateSocialScoreDown(HaikooId) {

    const db = getDatabase();
    const haikooref = ref(db, 'Haikoos/' + HaikooId + '/')

    runTransaction(haikooref, (haikoo) => {
        if (haikoo) {
            haikoo.social_score --
        }
        console.log("transaction runned down")
        return haikoo;
      });
  }

  function UnselectHaikoo(HaikooId) {
    playSound("/Audio/240776__f4ngy__card-flip.wav");
    setCount(0);
    setSelected(false);
    // UpdateSocialScoreDown(HaikooId);
    // SelectHaikoo(HaikooId)
    UpdateSocialScoreDown(HaikooId);
    
  }

  function Evaluate() {}

  return (
    <div>
      <div id="fixed_head_count">
        <p>You selected {count} haikoos</p>
        <button onClick={UnselectHaikoo}>Reset</button>
        <button onClick={Evaluate}>Evaluate</button>
      </div>
      <li id="haikoopast">
        {fetched_haikoo.map((haikoo, i) => (
          <animated.ul
            style={{
              opacity: selected[i] ? 1 : 0.9,
              zIndex: selected[i] ? 98 : 1,
            }}
            onClick={() => SelectHaikoo(i,haikoo.id)}
            key={i}
            className={selected[i] ? "haikoo_card_selected " : "haikoo_cards"}
          >
            {/* <FavStar/> */}
            <h1 className="title_haikoo">{haikoo.title}</h1>
            <p className="haikoo_text">"{haikoo.content}"</p>
            {/* <p className="haikoo_text">"{haikoo.id}"</p> */}
            <br></br>
            <i> by {haikoo.author}</i>
            <p id="technical_score">{haikoo.score}</p>
            <p id="popular_score">{haikoo.social_score}</p>
          </animated.ul>
        ))}
      </li>
    </div>
  );
};

export default NavigateHaikoos;