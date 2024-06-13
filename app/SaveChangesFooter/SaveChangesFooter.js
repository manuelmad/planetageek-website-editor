import './saveChangesFooter.css';

import { db } from '../firebase/firebase-config';
import { doc, updateDoc } from "firebase/firestore";

export default function Footer({
    displayFooter,
    setDisplayFooter
}) {
    const sendAllinfo = () => {
        const trend1_h3 = document.querySelector('.trend1-h3').innerHTML;
        const trend1_text = document.querySelector('.trend1-text').innerHTML;
        // console.log(trend1_h3);
        updateDoc(doc(db, 'trends', 'trend1'), {
            title: trend1_h3,
            text: trend1_text
        });

        const trend2_h3 = document.querySelector('.trend2-h3').innerHTML;
        const trend2_text = document.querySelector('.trend2-text').innerHTML;
        // console.log(trend1_h3);
        updateDoc(doc(db, 'trends', 'trend2'), {
            title: trend2_h3,
            text: trend2_text
        });

        const trend3_h3 = document.querySelector('.trend3-h3').innerHTML;
        const trend3_text = document.querySelector('.trend3-text').innerHTML;
        // console.log(trend1_h3);
        updateDoc(doc(db, 'trends', 'trend3'), {
            title: trend3_h3,
            text: trend3_text
        });
    }
    return(
        <footer style={displayFooter}>
            <section>
                <button id='save_changes_btn' onClick={sendAllinfo}>Aplicar Cambios</button>
            </section>
        </footer>
    );
}