'use client';

// import Image from "next/image";
// import styles from "./page.module.css";
import Header from "./LoggedInHeader/LoggedInHeader";
import Trends from "./Trends/Trends";
import LoggedOutView from "./LoggedOutView/LoggedOutView";
import Footer from "./SaveChangesFooter/SaveChangesFooter";

import { useState } from "react";
import { useEffect } from "react";

import { db } from "./firebase/firebase-config";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

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

  // States to the different views
  const [displayLoggedOutView, setDisplayLoggedOutView] = useState({display:"flex"});
  const [displayHeader, setDisplayHeader] = useState({display:"none"});
  const [displayTrends, setDisplayTrends] = useState({display:"none"});
  const [displayFooter, setDisplayFooter] = useState({display:"none"});

  useEffect(()=> {
    // Get the collection 'trends' from firebase
    const trendsCollection = collection(db, 'trends');

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();

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

        // Getting the url of all images in firebasestorage and updating the corresponding state, as well as sending that url to fibase database
        getDownloadURL(ref(storage, 'trends/trend1.png'))
        .then(async url => {
          setImgUrl1(url);
          await updateDoc(doc(db, 'trends', 'trend1'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
        
        getDownloadURL(ref(storage, 'trends/trend2.png'))
        .then(async url => {
          setImgUrl2(url);
          await updateDoc(doc(db, 'trends', 'trend2'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
        
        getDownloadURL(ref(storage, 'trends/trend3.png'))
        .then(async url => {
          setImgUrl3(url);
          await updateDoc(doc(db, 'trends', 'trend3'), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});
    });

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