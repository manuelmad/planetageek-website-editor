import './uploadImgModal.css';

import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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
    imgRef1,
    imgRef2,
    imgRef3,
    setImgRef1,
    setImgRef2,
    setImgRef3,
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

        // Create a ref based on the img we clicked on
        let storageRef = '';
        let desertRef = '';
        let trend = '';
        if(currentImg == 1) {
            // Create a reference to the file to delete
            desertRef = imgRef1;

            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend1/${file.name}`);
            setImgRef1(storageRef);

            // Asign the trend
            trend = 'trend1';
        } else if(currentImg == 2) {
            // Create a reference to the file to delete
            desertRef = imgRef2;

            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend2/${file.name}`);
            setImgRef2(storageRef);

            // Asign the trend
            trend = 'trend2';
        } else if(currentImg == 3) {
            // Create a reference to the file to delete
            //desertRef = ref3;
            desertRef = imgRef3;
            // Create a reference to the file to upload
            storageRef = ref(storage, `trends/trend3/${file.name}`);
            setImgRef3(storageRef);

            // Asign the trend
            trend = 'trend3';
        }

        // 'file' comes from the Blob or File API
        // Upload the img to storage
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.log('error at uploadTask', error);
        }, 
        () => {
            // Handle successful uploads on complete
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
                .catch((error) => {console.log('error at getDownloadURL:', error)});
            }
        );

        // Delete the previous img
        deleteObject(desertRef).then(() => {
        // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('error at deleteObject:', error)
        });

        // Hide modal
        closeModal();
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