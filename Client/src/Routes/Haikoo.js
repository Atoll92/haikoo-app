import React from 'react';
import axios from 'axios';
import Login from '../Login';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import SignInScreen from '../Login';
import Loginalt from './Loginalt';
import UserView from './UserView';
import db from '../FireStoreDB';
import { StyledFirebaseAuth } from 'react-firebaseui';





import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';
import SelectHaikoo from '../SelectHaikoo';
import { Footer, Textarea } from '@mantine/core';
import { createStyles, Card, Overlay, CardProps, Button, Text, rem } from '@mantine/core';
import Footer1 from './Footer1';


const auth = getAuth();




const Haikoo = () => {




    const [isSignedIn, setIsSignedIn] = React.useState(false); // Local signed-in state.

    // Listen to the Firebase Auth state and set the local state.
    React.useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false,
        },
      };


    const [invitation , setInvitation] = React.useState(null)
   
        function initInvite() {
            const urlParams = new URLSearchParams(window.location.search);
            var blob = urlParams.get('invite');
            if (blob) {
                var bob = JSON.parse(atob(blob));
                console.log(bob);
                setInvitation(bob);
            }

        }
        React.useEffect( ()=> {
        initInvite();
        } , [])

      


    var inventaire;

    function initInventaire(length) {
        //var result           = '';
        var resultArray = [];
        var characters = 'AAAAAAAAABBCCDDDEEEEEEEEEEEEEEEFFGGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            //result += characters.charAt(Math.floor(Math.random() * charactersLength));
            resultArray.push({ value: characters.charAt(Math.floor(Math.random() * charactersLength)), used: false });
        }

        return resultArray;

        //result = [{letter:'A',used:false},{letter:'A',used:false}]
    }

    function initInventaireFromInvite(invite) {
        var resultArray = [];
        for (var i = 0; i < invite.batch.length; i++) {
            resultArray.push({ value: invite.batch[i], used: false });
        }
        return resultArray;
    }


    function init() {

        if (invitation) {
            inventaire = initInventaireFromInvite(invitation);
        } else {
            inventaire = initInventaire(75);
        }

        // inventaire[12].used = true;

        displayInventaire(inventaire);
        playSound('/Audio/time-is-now-585.mp3');
        console.log(inventaire);
        document.getElementById("letterslist").classList.add("shaky");
        document.getElementById("chosen_haikoo").classList.add("invisible");
        
      




        setTimeout(() => {
            document.getElementById("letterslist").classList.remove("shaky")
        }, 500);

        document.getElementById("userinput").value = "";
        document.getElementById("letcount").innerHTML = inventaire.length + " inspirations left";
        submit();
    }

    function displayInventaire(inventaire) {

        var str = '<div class="letlist">';
        var lettersnum = inventaire.length;

        inventaire.forEach(function (letter) {
            str += '<h1 class="letter ' + (letter.used ? 'used' : 'notused') + '">' + letter.value + '</h1>';
        });

        str += '</div>';
        document.getElementById("letterslist").innerHTML = str;

        document.getElementById("startbutton").innerHTML = "Reset";
        document.getElementById("startbutton").classList.remove("startbutton_init");


    }


    function submit() {
        document.getElementById("goalreach").innerHTML = Math.floor(document.getElementById("userinput").value.toString().replace(/ /g, "").replace(/,/g, "").replace(/\-/g, "").replace(/\;/g, "").replace(/\./g, "").replace(/\?/g, "").replace(/\!/g, "").length * 100 / 75) + "%";

    }

    


    function share() {
        var user_id = "Anonymous"
        console.log(user_id)
        var batch = inventaire.map(obj => obj.value).join('');
        var haikoo = document.getElementById("userinput").value;
        var signature = "";
        var title = "";
        var social_score = 0;
        var score = Math.floor(document.getElementById("userinput").value.toString().replace(/ /g, "").replace(/,/g, "").replace(/\-/g, "").replace(/\;/g, "").replace(/\./g, "").replace(/\?/g, "").replace(/\!/g, "").length * 100 / 75)  + "%"  ;
        // + "%" 
        if(!isSignedIn){
            signature = window.prompt("signez votre haikoo");
        } else {
            signature = firebase.auth().currentUser.displayName;
            user_id = firebase.auth().currentUser.uid;
            title = window.prompt("donnez un titre à votre haikoo");
        }
        var shared_data = { signature: signature, haikoo: haikoo, batch: batch, title: title , score:score, social_score : social_score, batch : batch};

        var b64Data = btoa(JSON.stringify(shared_data));
        document.getElementById("popup_invite_link").innerHTML = "Your haikoo has been succesfully posted ! " ;
        document.getElementById("popup_invite").style.display = "block";
        document.getElementById("playable_block").style.display = "none";

        async function updateAPI(note) { 

            const idToken = await firebase.auth().currentUser.getIdToken(true);

            const response = await axios.post('https://haikoo-bc326-default-rtdb.europe-west1.firebasedatabase.app/Haikoos.json?auth=' + idToken, note)
            console.log(response)
            console.log(response.data)
            console.log("fetchingcalled")
        }
    
        // Test data
        const note = {
            content: haikoo,
            author: signature,
            title: title,
            score: score,
            social_score:0,
            user_id : user_id,
            batch : batch,
        }
    

        updateAPI(note);
        


       
       

       



    }


  

   
    //function to print occurrence of character
    function printans(ans) {
        for (let [key, value] of ans) {
            // if()
            console.log(`${key}  occurs  ${value} times`);

        }

    }

    // function count occurrence of character
    function count(str, outp_map) {
        for (let i = 0; i < str.length; i++) {

            let k = outp_map.get(str[i]);
            outp_map.set(str[i], k + 1);


        }
        //calling  print function
        printans(outp_map);
    }

    function letterIsAvailable(letter, lettersstock) {

        if (letter == ' ' || letter == ',' || letter == '.' || letter == '-' || letter == '=' || letter == '+' || letter == ';' || letter == '?' || letter == '!') {
            return true;
        }

        for (var i = 0; i < lettersstock.length; i++) {
            if (letter == lettersstock[i].value && !lettersstock[i].used) {
                lettersstock[i].used = true;
                playSound('/Audio/when-604.mp3');
                return true;

            }
        }

        return false;
    }

    function unuseLetter(letter, lettersstock) {
        for (var i = 0; i < lettersstock.length; i++) {
            if (letter == lettersstock[i].value && lettersstock[i].used) {
                lettersstock[i].used = false;
                return;
            }
        }
    }

    const playSound = (url) => {
        const audio = new Audio(url);
        audio.play();
    }


    //function create map to count character
    function count_occurs(event) {
        console.log("keyup begin");
        const key = event.key;

        // test string
        let userinput = document.getElementById("userinput").value;
        let userinputpurged = userinput.replace(/[\ \'\"\.\,\?\:\!\;\+]+/g, '').length;

        console.log("purge :" + userinputpurged);

        var userinputArray = userinput.toUpperCase().split('');

        // map for storing count values
        let ans = new Map();
        for (let i = 0; i < userinput.length; i++) {
            ans.set(userinput[i], 0);
        }

        count(userinput, ans);
        console.log(inventaire);
        console.log(userinput.split(''));
        console.log("userinputlength:" + userinput.length);
        submit();
        console.log("correct lengthy:" + userinput.replace(/ /g, "").replace(/,/g, "").length);

        if (inventaire.length - userinput.replace(/ /g, "").replace(/,/g, "").replace(/;/g, "").length == 0) {
            playSound('/Audio/accomplished-579.mp3');
        }

        if (key != "Backspace") {

            //checking string is valid or not
            if (userinput.length === 0) {
                console.log(" empty string ");

                return;
            }
            else {


                //const intersection = userinputArray.filter(letter => inventaire.includes(letter));



                var letteravailable = letterIsAvailable(userinputArray[userinputArray.length - 1], inventaire);
                console.log('letter ' + userinputArray[userinputArray.length - 1] + ' available : ' + letteravailable);

                if (!letteravailable) {
                    document.getElementById("userinput").value = document.getElementById("userinput").value.slice(0, -1);
                    playSound('/Audio/clearly-602.mp3');
                    userinput = document.getElementById("userinput").value;
                    userinputArray = userinput.toUpperCase().split('');
                }




            }

            document.getElementById("letcount").innerHTML = inventaire.length - userinput.replace(/ /g, "").replace(/,/g, "").replace(/;/g, "").length + " inspirations left";
            displayInventaire(inventaire);
            console.log("count_occurs finished");
        }
        console.log("keyup finish");
    }

    function handle_delete(event) {

        console.log("keydown begin");
        let userinput = document.getElementById("userinput").value;
        var userinputArray = userinput.toUpperCase().split('');

        const key = event.key;
        if (key === "Backspace" && userinput.length > 0) {

            playSound('/Audio/glitch-in-the-matrix-600.mp3');
            console.log("backspace used");
            console.log(userinputArray);
            console.log(inventaire);
            unuseLetter(userinputArray[userinputArray.length - 1], inventaire);

            document.getElementById("letcount").innerHTML = inventaire.length - userinputArray.length + 1 + " characters";
            displayInventaire(inventaire);
        }

        console.log("keydown finish");
    }


    function darkmode() {
        var dark = document.querySelector('#dark');
        if (dark.checked){
               document.querySelector('body').style.background = "#222";
            document.querySelector('body').style.filter = "invert()";
        } else if (!dark.checked) {
              document.querySelector('body').style.background = "#E7E7E7";
            document.querySelector('body').style.filter = "none";
        } 
        else {
           document.querySelector('body').style.background = "#222";
            document.querySelector('body').style.filter = "invert()";
        }
    }
    function show_userview() {
        document.getElementById("userview").style.display = document.getElementById("userview").style.display == "block" ? "none" : "block" ;
        
    }
    function hideuserview() {
        document.getElementById("userview").style.display = document.getElementById("userview").style.display == "block" ? "none" : "none" ;
        
    }
    function hide_haikoopast() {
        document.getElementById("haikoopast").style.display = "none";


    }

    if (!isSignedIn) {
        return (<>
            <div id="presentation"><strong>Haikooz</strong> is a word game for those who seek to create works using constrained writing techniques.<br></br> 
            Haikoonauts have to make the most of a daily renewed batch of random letters. <br></br>
            Creativity is rewarded through peer reviewed criteria such as originality and poetry.<br>
            </br>
            A technical score is also given to an haikoo depending on its length. <br></br>
            As a platform promoting inner peace there is no time limit so you can let your imagination thrive. <br></br>
            We encourage kindness and there is no such thing as bad haikoo, votes can only go up.<br></br> 
            Everyday, top ranking haikoos will be featured on the homepage and compiled into a miscellany celebrating human inventivity and exchange of ideas.<br></br>
            Haikoo is free to play, if you enjoy playing it, support development by contributing <a>here</a>.<br></br>
            
        </div>

<h2 id="mottoCTA">Sign in and start writing !</h2>


</>
   



            // Future features we are thinking of :  penpal system based on writing styles compatibility, daily challenges, possibility of creating your own set of rules and experimenting within those with your own tribe, better UI, Ads free, etc... 
        )
    }
if(isSignedIn) {
    
    return (
        <div>
                            {/* <Loginalt show_userview={show_userview} hideuserview={hideuserview}/> */}
{/* <Loginalt></Loginalt> */}
            <div id="container" className="container">
           
               
                   {/* <div className="checkboxcont">
                   
               
                   <input type="checkbox" id="dark" name="dark" onClick={darkmode} unchecked />
                   <label for="dark">Enable dark mode</label>
               </div> */}
               {/* <h2 id="welcome">{isSignedIn ? 'Welcome to Haikoo' : ''}</h2> */}
                <h1 id="batch"></h1>
         
               <SelectHaikoo/>
                
               

                
               
                <div id="popup_invite">
                
                    <p id="popup_invite_link"></p>
                </div>
                <div id="playable_block">
                <h1 id="letcount">Counter</h1>
                <div id="letterslist">
                </div>
              
                <p id="goalreach"></p>
                <form action="" method="post" >

                <Textarea
                    
                     name="haikoo" placeholder="Let your mind go for a stroll..."
                      onKeyUp={count_occurs} 
                      onKeyDown={handle_delete}
                        id="userinput"
                     autosize
                     minRows={5}>
                </Textarea>

                    {/* <button id="startbutton-main"  onClick={init}>Start</button> */}
                </form>
                <div className='play_controls'>
                <button id="startbutton"  onClick={init}>Start</button> 
                 <button id="submitbutton" onClick={share}>Publish your Haikoo ! </button>
                </div>
               
                </div>

                
                


            </div>
           <Footer1></Footer1>
          

            <svg>
                <filter id="shaka">
                    <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"></feTurbulence>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G">
                    </feDisplacementMap>
                </filter>
            </svg>
            <svg>
                <filter id="shaka2">
                    <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence"></feTurbulence>
                    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="50" xChannelSelector="R" yChannelSelector="G">
                    </feDisplacementMap>
                </filter>
            </svg>

        </div>
    );
};
}

export default Haikoo;

