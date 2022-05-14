import React from 'react';


const Haikoo = () => {


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
            inventaire = initInventaire(60);
        }

        // inventaire[12].used = true;

        displayInventaire(inventaire);
        playSound('/Audio/time-is-now-585.mp3');
        console.log(inventaire);
        document.getElementById("letterslist").classList.add("shaky");




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


    }


    function submit() {
        document.getElementById("goalreach").innerHTML = Math.floor(document.getElementById("userinput").value.toString().replace(/ /g, "").replace(/,/g, "").replace(/\-/g, "").replace(/\;/g, "").replace(/\./g, "").replace(/\?/g, "").replace(/\!/g, "").length * 100 / 60) + "%";

    }

    


    function share() {
        var batch = inventaire.map(obj => obj.value).join('');
        var haikoo = document.getElementById("userinput").value;
        var signature = window.prompt("signez votre haikoo");
        var shared_data = { signature: signature, haikoo: haikoo, batch: batch };

        var b64Data = btoa(JSON.stringify(shared_data));
        document.getElementById("popup_invite_link").innerHTML = "doublegeste.com/haikoo?invite=" + b64Data;
        document.getElementById("popup_invite").style.display = "block";

        



    }

    var img = document.querySelector("#shaka feTurbulence");
    var frames = 0;
    var rad = Math.PI / 180;


    function AnimateBaseFrequency() {
        //baseFrequency="0.01 .1"
        var bfx = 0.02;
        var bfy = 0.01;
         frames += .25
        bfx += 0.002 * Math.cos(frames * rad);
        bfy += 0.01 * Math.sin(frames * rad);

        var bf = bfx.toString() + ' ' + bfy.toString();
        img.setAttributeNS(null, 'baseFrequency', bf);

        window.requestAnimationFrame(AnimateBaseFrequency);
    }

    window.requestAnimationFrame(AnimateBaseFrequency);

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

    return (
        <div>
            <div id="container" className="container">
                <div className="checkboxcont">
                    <input type="checkbox" id="dark" name="dark" onClick={darkmode} unchecked />
                    <label for="dark">Enable dark mode</label>
                </div>
                <h1 id="batch">Welcome to Haikoo</h1>
                <p>Get inspired !</p>
                <h1 id="letcount">Counter</h1>
                <div id="popup_invite">
                    <p id="popup_invite_link"></p>
                </div>
                <div id="letterslist">
                </div>
                <button id="startbutton" onClick={init}>Start</button>

                <form action="" method="post" ><textarea name="haikoo" placeholder="Let your mind go for a stroll..." onKeyUp={count_occurs} onKeyDown={handle_delete} id="userinput">

                </textarea>

                    <button type="submit" name="button" value="Submit" id="submitbutton" onClick="{submit}">Submit for review</button>

                </form>


                <p id="goalreach"></p>
                <button id="submitbutton" onClick={share}>Share with a friend</button>
                <button id="submitbutton" >Challenge a friend</button>


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
};

export default Haikoo;