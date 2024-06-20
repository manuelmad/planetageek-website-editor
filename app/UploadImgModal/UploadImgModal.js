import './uploadImgModal.css';

export default function UploadImgModal({
    displayModal,
    setDisplayModal
}) {
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
                    <button id='uploadimg_btn'>Subir Foto</button>
                </p>
                <p className='cancel-uploadimg__container'>
                    <button id='cancel_uploadimg_btn'>Cancelar</button>
                </p>
            </div>
        </div>
    );
}