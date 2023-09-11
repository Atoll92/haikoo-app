import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { animated } from 'react-spring';

const HaikooRead = ({ haikooID }) => {
  const [haikooData, setHaikooData] = useState(null);

  useEffect(() => {
    // Reference to the haikoo document in the Realtime Database
    const db = getDatabase();
    const haikooRef = ref(db, `Haikoos/${haikooID}`);

    // Fetch the haikoo data
    get(haikooRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const haikoo = snapshot.val();
          setHaikooData(haikoo);
        } else {
          console.log(`Haikoo with ID ${haikooID} not found in the Realtime Database.`);
        }
      })
      .catch((error) => {
        console.error('Error fetching haikoo data:', error);
      });
  }, [haikooID]);

  // Conditional rendering based on whether haikooData is available
  if (haikooData) {
    return (
    //   <div>
    //     <h3>Haikoo ID: {haikooID}</h3>
    //     <p>{haikooData.content}</p>
    //     {/* Render other haikoo details here */}
    //   </div>
      <ul
      // style={{
      //   opacity: selected[i] ? 1 : 0.9,
      //   zIndex: selected[i] ? 98 : 1,
      // }}
      // onClick={() => SelectHaikoo(i,haikoo.id)}
  
      className={"haikoo_cards"}
    >
      <h1 className="title_haikoo">{haikooData.title}</h1>
      
     
      <p className="haikoo_text">"{haikooData.content}"</p>
     
      <br></br>
      <span>
        
        
      <i> by {haikooData.author}</i><img className="miniature_pic" id={haikooData.user_id} /></span>
      <p id="technical_score">{haikooData.score}</p>
      <p id="popular_score">{haikooData.social_score}</p>
      
      {/* id={fetched_haikoo[i].user_id} */}
    </ul>
    );
  } else {
    return (
      <div>
        <p>Loading haikoo data...</p>
        {/* You can render a loading indicator or an error message here */}
      </div>
    );
  }
};

export default HaikooRead;
// // Haikoo.js
// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, get } from 'firebase/database';

// const HaikooRead = ({ haikooId }) => {
//   const [haikooData, setHaikooData] = useState(null);

//   useEffect(() => {
//     // Initialize Firebase database
//     const db = getDatabase();

//     // Reference to the specific Haikoo in the database
//     const haikooRef = ref(db, `haikoos/${haikooId}`);

//     // Fetch the Haikoo data
//     get(haikooRef)
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           // Convert the snapshot to data
//           const data = snapshot.val();
//           setHaikooData(data);
//         } else {
//           console.log('Haikoo not found in the database.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching Haikoo data:', error);
//       });
//   }, [haikooId]);

//   if (!haikooData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h3>Haikoo ID: {haikooId}</h3>
//       <p>Title: {haikooData.title}</p>
//       <p>Content: {haikooData.content}</p>
//       {/* Display other Haikoo properties as needed */}
//     </div>
//   );
// };

// export default HaikooRead;
