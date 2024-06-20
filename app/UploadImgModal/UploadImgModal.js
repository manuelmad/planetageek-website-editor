'use client';
import './uploadImgModal.css';

import { ref1, ref2, ref3 } from '../page';

import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';

export default function UploadImgModal({
    imgName1,
    imgName2,
    imgName3,
    setImgName1,
    setImgName2,
    setImgName3,
    setImgUrl1,
    setImgUrl2,
    setImgUrl3,
    displayModal,
    setDisplayModal,
    currentImg,
    setCurrentImg
}) {

    const storage = getStorage();

    const uploadImg = () => {
        const img_input = document.getElementById("img_input");
        const input = img_input.files;

        // Verifying if an img was already selected
        if(!input.length) {
            alert('Por favor, seleccione una imagen.');
            return
        }
        
        //Get the uploaded file
        let file = input[0];

        // // Create a ref based on the img we clicked on
        let storageRef = '';
        let desertRef = '';
        let trend = '';
        if(currentImg == 1) {
            // Create a reference to the file to delete
            desertRef = ref1;
            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend1/${file.name}`);

            trend = 'trend1';
        } else if(currentImg == 2) {
            // Create a reference to the file to delete
            desertRef = ref2;
            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend2/${file.name}`);

            trend = 'trend2';
        } else if(currentImg == 3) {
            // Create a reference to the file to delete
            desertRef = ref3;
            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend3/${file.name}`);

            trend = 'trend3';
        }

        // Delete the previous img
        deleteObject(desertRef).then(() => {
        // File deleted successfully
        }).catch((error) => {
        // Uh-oh, an error occurred!
        });

        // 'file' comes from the Blob or File API
        // Upload the img to storage
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        getDownloadURL(storageRef)
        .then(url => {
            if(currentImg == 1) {
                setImgUrl1(url);
            } else if(currentImg == 2) {
                setImgUrl2(url);
            } else if(currentImg == 3) {
                setImgUrl3(url);
            }        
          updateDoc(doc(db, 'trends', trend), {
            img: url
          });
        })
        .catch((error) => {console.log('error:', error)});

        // Hide modal
        setDisplayModal({display:"none"});
        console.log(currentImg);
    }

    const closeModal = () => {
        document.querySelector("#img_input").value = "";
        setCurrentImg(0);
        setDisplayModal({display:"none"});
    }

    return(
        <div style={displayModal} className='modal-container'>
            <div className='modal'>
                <p id="dropBox">
                    Arrastre la imagen aquí o seleccione el archivo usando el botón de abajo
                </p>
                <p className='input-file__container'>
                    <input id="img_input" type="file" accept="image/*" />
                </p>
                <p className='uploadimg-btn__container'>
                    <button onClick={uploadImg} id='uploadimg_btn'>Subir Foto</button>
                </p>
                <p className='cancel-uploadimg__container'>
                    <button onClick={closeModal} id='cancel_uploadimg_btn'>Cancelar</button>
                </p>
            </div>
        </div>
    );
}