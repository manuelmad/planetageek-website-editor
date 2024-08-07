import './uploadImgModal.css';

import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function UploadImgModal({
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

    const prewievImg = () => {
        const dropbox = document.getElementById("dropBox");
        const img_input = document.getElementById("img_input");
        const input = img_input.files;
        // console.log(input);
        
        //Get the uploaded file
        let file = input[0];

        //Create the local url
        const objectURL = URL.createObjectURL(file);
        // console.log(objectURL);

        // Add img label, with the local url in src, as a child of dropbox
        dropbox.innerHTML = "";
        const img = document.createElement('img');
        dropbox.appendChild(img);
        img.src = objectURL;
    }

    const dragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    function dragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();
      
        const dt = e.dataTransfer;
        const files = dt.files;
    
        if(!files.length) return
        
        //Get the dropped file
        let file = files[0];
        // console.log(file);
    
        //Create the local url
        const objectURL = URL.createObjectURL(file);
        // console.log(objectURL);

        //Access the input file
        const img_input = document.getElementById("img_input");
        
        // Create a new File object with all the information of the img dropped in dropbox
        const myFile = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            size: file.size,
            webkitRelativePath: file.webkitRelativePath
        });

        // console.log(myFile);
    
        // Create a DataTransfer with the new File object to set an identical FileList in the input file, ready to be uploaded to storage
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(myFile);
        img_input.files = dataTransfer.files;
        
        // Preview the img dropped
        const dropbox = document.getElementById("dropBox");
        dropbox.innerHTML = "";
        const img = document.createElement('img');
        dropbox.appendChild(img);
        img.src = objectURL;
    }

    return(
        <div style={displayModal} className='modal-container'>
            <div className='modal'>
                <p id="dropBox" onDragEnter={dragEnter} onDragOver={dragOver} onDrop={drop}>
                    Arrastre la imagen aquí o seleccione el archivo usando el botón de abajo
                </p>
                <p className='input-file__container'>
                    <input onChange={prewievImg} id="img_input" type="file" accept="image/*" />
                </p>
                <p className='uploadimg-btn__container'>
                    <button onClick={uploadImg} id='uploadimg_btn'>Aplicar Cambio de Imagen</button>
                </p>
                <p className='cancel-uploadimg__container'>
                    <button onClick={closeModal} id='cancel_uploadimg_btn'>Cancelar</button>
                </p>
            </div>
        </div>
    );
}