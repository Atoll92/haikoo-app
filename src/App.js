import logo from './logo.svg';
import './App.css';


function App() {

  var inventaire;

  function initInventaire(length) {
    var resultArray = [];
    var characters = 'AAAAAAAAABBCCDDDEEEEEEEEEEEEEEEFFGGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        resultArray.push({ value: characters.charAt(Math.floor(Math.random() * charactersLength)), used: false });
    }

    return resultArray;
    console.log(inventaire);


    
}

  function init() {
    inventaire = initInventaire(60);

    // inventaire[12].used = true;

    displayInventaire(inventaire);
    playSound('/wp-content/themes/twentytwentyone-child/AUDIO/time-is-now-585.mp3');
    console.log(inventaire);
    document.getElementById("letterslist").classList.add("shaky");




    setTimeout(() => {
        document.getElementById("letterslist").classList.remove("shaky")
    }, 500);

     document.getElementById("userinput").value = "";
   document.getElementById("letcount").innerHTML = inventaire.length - userinput.length + 1 + " inspirations left";
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



    // document.getElementById("letterslist").classList.add("shaky");

    // setTimeout(() => {
    // 	document.getElementById("letterslist").classList.remove("shaky")
    // }, 500);
}


function updatebatch() {


    var letters = makebatch(5).split('');
    var str = '<div class="letlist">';
    var lettersnum = letters.length;


    letters.forEach(function (letter) {
        str += '<h1 class="letter">' + letter + '</h1>';
    });

    str += '</div>';
    document.getElementById("letterslist").innerHTML = str;

    document.getElementById("startbutton").innerHTML = "Reset";

    document.getElementById("letcount").innerHTML = lettersnum + " inspirations left";

    document.getElementById("letterslist").classList.add("shaky");

    setTimeout(() => {
        document.getElementById("letterslist").classList.remove("shaky")
    }, 500);

  }

  function lettercounter() {

    var lettersnum = letters.length;

}
function submit() {
document.getElementById("goalreach").innerHTML =  Math.floor(document.getElementById("userinput").value.toString().replace(/ /g,"").replace(/,/g,"").replace(/-/g,"").replace(/;/g,"").length*100 / 60)  + "%"; 

}

function letterIsAvailable(letter, lettersstock) {

  if (letter == ' ' || letter == ',' || letter == '.' || letter == '-' || letter == '=' || letter == '+' || letter == ';' || letter == '?' || letter == '!') {
      return true;
  }

  for (i = 0; i < lettersstock.length; i++) {
      if (letter == lettersstock[i].value && !lettersstock[i].used) {
          lettersstock[i].used = true;
          playSound('/wp-content/themes/twentytwentyone-child/AUDIO/when-604.mp3');
          return true;

      }
  }

  return false;
}

function unuseLetter(letter, lettersstock) {
  for (i = 0; i < lettersstock.length; i++) {
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
function count_occurs() {
console.log("keyup begin");
  const key = event.key;

  // test string
  let userinput = document.getElementById("userinput").value;
  let userinputpurged = userinput.replace(/[\ \'\"\.\,\?\:\!\;\+]+/g,'').length;

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
  console.log("correct lengthy:" + userinput.replace(/ /g,"").replace(/,/g,"").length);

  if (inventaire.length -  userinput.replace(/ /g,"").replace(/,/g,"").replace(/;/g,"").length == 0) {
    playSound('/wp-content/themes/twentytwentyone-child/AUDIO/accomplished-579.mp3');
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
              playSound('/wp-content/themes/twentytwentyone-child/AUDIO/clearly-602.mp3');
     userinput = document.getElementById("userinput").value;
        userinputArray = userinput.toUpperCase().split('');
          }



          //console.log(intersection);

          // function compareinput() {

          //    	var lettersstock = initInventaire(60);
          // let userinput =  document.getElementById("userinput").value;

          // 					    	for (i=0; i < lettersstock.length; i++)
          // 					    	{
          // 							    // if userinput.split('') == lettersstock[i].value {
          // 							    	 console.log(lettersstock[i]);
          // 							    // }
          // 							}

          // 						}
}

document.getElementById("letcount").innerHTML = inventaire.length -  userinput.replace(/ /g,"").replace(/,/g,"").replace(/;/g,"").length + " inspirations left";
    displayInventaire(inventaire);
    console.log("count_occurs finished");
  }
console.log("keyup finish");
}

function handle_delete() {

console.log("keydown begin");
let userinput = document.getElementById("userinput").value;
var userinputArray = userinput.toUpperCase().split('');

  
  if (key === "Backspace" && userinput.length > 0 ) {

    playSound('/wp-content/themes/twentytwentyone-child/AUDIO/glitch-in-the-matrix-600.mp3');
    console.log("backspace used");
    console.log(userinputArray);
    console.log(inventaire);
      unuseLetter(userinputArray[userinputArray.length - 1], inventaire);

  document.getElementById("letcount").innerHTML = inventaire.length - userinputArray.length + 1 + " characters";
  displayInventaire(inventaire);
  }

console.log("keydown finish");
}


  return (
    <div className="App">
      
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

      </head>

      

      <div id="container" class="container">
        <h1 id="batch">Welcome to Haikoo</h1>
        <p>Get inspired !</p>
        <h1 id="letcount">Counter</h1>
        <div id="letterslist">
        </div>
        <button id="startbutton" onClick="init()">Start</button>
        
     
        <form action="" method="post" ><textarea name="haikoo" placeholder="Let your mind go for a stroll..." onKeyUp="count_occurs()" onKeyDown="handle_delete()" id="userinput">

        </textarea>
          
          

              <button type="submit" name="button" value="Submit" id="submitbutton" onClick="submit()">Submit for review</button>

            </form>


            <p id="goalreach"></p>
            <button id="submitbutton" onClick="share()">Share with a friend</button>
            <button id="submitbutton" onClick="challenge()">Challenge a friend</button>
         

          </div>

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

      <script>
  



      </script>
}

      export default App;
