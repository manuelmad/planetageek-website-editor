import Image from "next/image";
import './trends.css';

export default function Trends({
    displayTrends,
    imgUrl1,
    imgUrl2,
    imgUrl3,
    setDisplayModal,
    setCurrentImg
}) {

    const openModal1 = () => {
        const dropbox = document.getElementById("dropBox");
        dropbox.innerHTML = "";
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(1);
        // console.log(currentImg);
    }

    const openModal2 = () => {
        const dropbox = document.getElementById("dropBox");
        dropbox.innerHTML = "";
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(2);
        // console.log(currentImg);
    }

    const openModal3 = () => {
        const dropbox = document.getElementById("dropBox");
        dropbox.innerHTML = "";
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(3);
        // console.log(currentImg);
    }


    // Function to insert a <br> when user press enter key in any editable area
    const addBr = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const br = document.createElement("br");
            
            let range, html;
            if (window.getSelection && window.getSelection().getRangeAt) {
                range = window.getSelection().getRangeAt(0);
                range.insertNode(br);
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                html = (br.nodeType == 3) ? br.data : br.outerHTML;
                range.pasteHTML(html);
            }
        }
    }

    return(
        <section className="trends" id="trends" style={displayTrends}>
            <div className="title-container">
                <h2>TENDENCIAS</h2> 
                <p></p>
            </div>
            <div className="trending-articles__container">
                <article>
                    <div>
                        <div onClick={openModal1}>
                            <Image
                                src={imgUrl1 || '/public/next.svg'}
                                alt="trend1 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3 contentEditable="plaintext-only" suppressContentEditableWarning className="trend1-h3" onKeyDown={addBr} id="h3_1"></h3>
                            <p contentEditable="plaintext-only" suppressContentEditableWarning className="trend1-text" onKeyDown={addBr} id="p1"></p>
                        </div>
                    </div>
                </article>
                <article>
                    <div>
                        <div onClick={openModal2}>
                            <Image
                                src={imgUrl2 || '/public/next.svg'}
                                alt="trend2 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3 contentEditable="plaintext-only" suppressContentEditableWarning className="trend2-h3" onKeyDown={addBr} id="h3_2"></h3>
                            <p contentEditable="plaintext-only" suppressContentEditableWarning className="trend2-text" onKeyDown={addBr} id="p2"></p>
                        </div>
                    </div>
                </article>
                <article>
                    <div>
                        <div onClick={openModal3}>
                            <Image
                                src={imgUrl3 || '/public/next.svg'}
                                alt="trend3 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3 contentEditable="plaintext-only" suppressContentEditableWarning className="trend3-h3" onKeyDown={addBr} id="h3_3"></h3>
                            <p contentEditable="plaintext-only" suppressContentEditableWarning className="trend3-text" onKeyDown={addBr} id="p3"></p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}