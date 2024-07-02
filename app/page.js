'use client';

import Header from "./LoggedInHeader/LoggedInHeader";
import Trends from "./Trends/Trends";
import LoggedOutView from "./LoggedOutView/LoggedOutView";
import Footer from "./SaveChangesFooter/SaveChangesFooter";
import UploadImgModal from "./UploadImgModal/UploadImgModal";

import { useState } from "react";
import { useEffect } from "react";

import { db } from "./firebase/firebase-config";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  const [imgRef1, setImgRef1] = useState({});
  const [imgRef2, setImgRef2] = useState({});
  const [imgRef3, setImgRef3] = useState({});

  const [currentImg, setCurrentImg] = useState(0);

  // States to the different views
  const [displayLoggedOutView, setDisplayLoggedOutView] = useState({display:"flex"});
  const [displayHeader, setDisplayHeader] = useState({display:"none"});
  const [displayTrends, setDisplayTrends] = useState({display:"none"});
  const [displayFooter, setDisplayFooter] = useState({display:"none"});
  const [displayModal, setDisplayModal] = useState({display:"none"});

  // Get the collection 'trends' from firebase
  const trendsCollection = collection(db, 'trends');

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage();

  // Variables to imgs names and refs
  let a;
  let b;

  let c;
  let d;

  let e;
  let f;

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
        a=itemRef.name;
        setImgName1(a);
        b=ref(storage,`trends/trend1/${itemRef.name}`)
        setImgRef1(b);
        //ref1 = ref(storage,`trends/trend1/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error at listAll',error);
    });

    listAll(listRef2)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        c=itemRef.name;
        setImgName2(c);
        d=ref(storage,`trends/trend2/${itemRef.name}`)
        setImgRef2(d);
        //ref2 = ref(storage,`trends/trend2/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error at listAll',error);
    });

    listAll(listRef3)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        e=itemRef.name;
        setImgName3(e);
        f=ref(storage,`trends/trend3/${itemRef.name}`);
        setImgRef3(f);
        //ref3 = ref(storage,`trends/trend3/${itemRef.name}`);
      });
    }).catch((error) => {
      console.log('error at listAll',error);
    });

  }

  const getImgsUrls = () => {
    // Getting the url of all images in firebasestorage and updating the corresponding state, as well as sending that url to fibase database
    getDownloadURL(b)
    .then(async url => {
      setImgUrl1(url);
      await updateDoc(doc(db, 'trends', 'trend1'), {
        img: url
      });
    })
    .catch((error) => {console.log('error at getDownloadURL:', error)});
    
    getDownloadURL(d)
    .then(async url => {
      setImgUrl2(url);
      await updateDoc(doc(db, 'trends', 'trend2'), {
        img: url
      });
    })
    .catch((error) => {console.log('error at getDownloadURL:', error)});
    
    getDownloadURL(f)
    .then(async url => {
      setImgUrl3(url);
      await updateDoc(doc(db, 'trends', 'trend3'), {
        img: url
      });
    })
    .catch((error) => {console.log('error at getDownloadURL:', error)});
  }

  useEffect(()=> {
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

      // Getting images' urls
      getImgsUrls();

      // Insert the plain text on firebase as html in the wensite to recognize the line breaks
      const a = data[0].data().text.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('p1').innerHTML = a;
      const b = data[1].data().text.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('p2').innerHTML = b;
      const c = data[2].data().text.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('p3').innerHTML = c;

      const d = data[0].data().title.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('h3_1').innerHTML = d;
      const e = data[1].data().title.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('h3_2').innerHTML = e;
      const f = data[2].data().title.replaceAll('&lt;br&gt;', '<br>');
      document.getElementById('h3_3').innerHTML = f;

    });

    // Getting images' names
    getImgsNames();
    
    // Getting images' urls
    //getImgsUrls();

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
        imgUrl1={imgUrl1}
        imgUrl2={imgUrl2}
        imgUrl3={imgUrl3}
        setDisplayModal={setDisplayModal}
        setCurrentImg={setCurrentImg}
      />
      <Footer
        displayFooter={displayFooter}
        setDisplayFooter={setDisplayFooter}
      />
      <UploadImgModal
        setImgUrl1={setImgUrl1}
        setImgUrl2={setImgUrl2}
        setImgUrl3={setImgUrl3}
        imgRef1={imgRef1}
        imgRef2={imgRef2}
        imgRef3={imgRef3}
        setImgRef1={setImgRef1}
        setImgRef2={setImgRef2}
        setImgRef3={setImgRef3}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        currentImg={currentImg}
        setCurrentImg={setCurrentImg}
      />
    </main>
  );
}