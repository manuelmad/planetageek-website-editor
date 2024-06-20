'use client';

import Header from "./LoggedInHeader/LoggedInHeader";
import Trends from "./Trends/Trends";
import LoggedOutView from "./LoggedOutView/LoggedOutView";
import Footer from "./SaveChangesFooter/SaveChangesFooter";

import { useState } from "react";
import { useEffect } from "react";

import { db } from "./firebase/firebase-config";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let ref1;
let ref2;
let ref3;

export default function Home() {
  // States to the info in the website
  const [trendTitle1, setTrendTitle1] = useState("");
  const [trendTitle2, setTrendTitle2] = useState("");
  const [trendTitle3, setTrendTitle3] = useState("");
  const [trendText1, setTrendText1] = useState("");
  const [trendText2, setTrendText2] = useState("");
  const [trendText3, setTrendText3] = useState("");
  const [imgUrl1, setImgUrl1] = useState("");
  const [imgUrl2, setImgUrl2] = useState("");
  const [imgUrl3, setImgUrl3] = useState("");
  const [imgName1, setImgName1] = useState("");
  const [imgName2, setImgName2] = useState("");
  const [imgName3, setImgName3] = useState("");

  // States to the different views
  const [displayLoggedOutView, setDisplayLoggedOutView] = useState({display:"flex"});
  const [displayHeader, setDisplayHeader] = useState({display:"none"});
  const [displayTrends, setDisplayTrends] = useState({display:"none"});
  const [displayFooter, setDisplayFooter] = useState({display:"none"});

  // Get the collection 'trends' from firebase
  const trendsCollection = collection(db, 'trends');

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Function to get the names of the images existing in Firebase Storage
  const getImgsNames = () => {
    // Getting the url of all folders that contain the images in firebasestorage
    const listRef1 = ref(storage, 'trends/trend1');
    const listRef2 = ref(storage, 'trends/trend2');
    const listRef3 = ref(storage, 'trends/trend3');

    listAll(listRef1)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        setImgName1(itemRef.name);
        ref1 = ref(storage,`trends/trend1/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error',error);
    });

    listAll(listRef2)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        setImgName2(itemRef.name);
        ref2 = ref(storage,`trends/trend2/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error',error);
    });

    listAll(listRef3)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        setImgName3(itemRef.name);
        ref3 = ref(storage,`trends/trend3/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error',error);
    });

  }

  useEffect(()=> {

    // Listen to the current collection and get changes everytime a document is updated, created or deleted to update the trend info
    onSnapshot(trendsCollection, (snapshot)=>{
        //Getting all documents in firebasedatabase collection
        const data = snapshot.docs;

        // Getting the info of all titles in firebasedatabase and updating the corresponding state
        setTrendTitle1(data[0].data().title);
        setTrendTitle2(data[1].data().title);
        setTrendTitle3(data[2].data().title);

        // Getting the info of all texts in firebasedatabase and updating the corresponding state
        setTrendText1(data[0].data().text);
        setTrendText2(data[1].data().text);
        setTrendText3(data[2].data().text);

        // Getting images' names
        getImgsNames();
        
        // Getting the url of all images in firebasestorage and updating the corresponding state, as well as sending that url to fibase database
        getDownloadURL(ref1)
        .then(async url => {
          setImgUrl1(url);
          // console.log('parent',ref1.parent);
          
          await updateDoc(doc(db, 'trends', 'trend1'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
        
        getDownloadURL(ref2)
        .then(async url => {
          setImgUrl2(url);
          await updateDoc(doc(db, 'trends', 'trend2'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
        
        getDownloadURL(ref3)
        .then(async url => {
          setImgUrl3(url);
          await updateDoc(doc(db, 'trends', 'trend3'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
    });

    // Check state of auth and display the correponding view
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setDisplayLoggedOutView({display:"none"});
        setDisplayHeader({display:"grid"});
        setDisplayTrends({display:"block"});
        setDisplayTrends({display:"block"});
        setDisplayFooter({display:"block"});
      } else {
        setDisplayHeader({display:"none"});
        setDisplayTrends({display:"none"});
        setDisplayFooter({display:"none"});
        setDisplayLoggedOutView({display:"flex"});
      }
    })

    // Getting images' names
    getImgsNames();

  },[]);

  return (
    <main>
      <LoggedOutView
        displayLoggedOutView={displayLoggedOutView}
        setDisplayLoggedOutView={setDisplayLoggedOutView}

        setDisplayHeader={setDisplayHeader}
        setDisplayTrends={setDisplayTrends}
        setDisplayFooter={setDisplayFooter}
      />
      <Header
        displayHeader={displayHeader}
        setDisplayHeader={setDisplayHeader}

        setDisplayTrends={setDisplayTrends}
        setDisplayLoggedOutView={setDisplayLoggedOutView}
        setDisplayFooter={setDisplayFooter}
      />
      <Trends 
        displayTrends={displayTrends}
        setDisplayTrends={setDisplayTrends}

        trendTitle1={trendTitle1}
        setTrendTitle1={setTrendTitle1}
        trendTitle2={trendTitle2}
        setTrendTitle2={setTrendTitle2}
        trendTitle3={trendTitle3}
        setTrendTitle3={setTrendTitle3}
        trendText1={trendText1}
        setTrendText1={setTrendText1}
        trendText2={trendText2}
        setTrendText2={setTrendText2}
        trendText3={trendText3}
        setTrendText3={setTrendText3}
        imgUrl1={imgUrl1}
        setImgUrl1={setImgUrl1}
        imgUrl2={imgUrl2}
        setImgUrl2={setImgUrl2}
        imgUrl3={imgUrl3}
        setImgUrl3={setImgUrl3}
      />
      <Footer
        displayFooter={displayFooter}
        setDisplayFooter={setDisplayFooter}
      />
    </main>
  );
}