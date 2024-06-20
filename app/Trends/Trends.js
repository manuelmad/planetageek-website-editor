// 'use client';
import Image from "next/image";
import './trends.css';

let currentImg;

export default function Trends({
    displayTrends,
    setDisplayTrends,
    trendTitle1,
    setTrendTitle1,
    trendTitle2,
    setTrendTitle2,
    trendTitle3,
    setTrendTitle3,
    trendText1,
    setTrendText1,
    trendText2,
    setTrendText2,
    trendText3,
    setTrendText3,
    imgUrl1,
    setImgUrl1,
    imgUrl2,
    setImgUrl2,
    imgUrl3,
    setImgUrl3,
    setDisplayModal,
    currentImg,
    setCurrentImg
}) {

    const openModal1 = () => {
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(1);
        console.log(currentImg);
    }

    const openModal2 = () => {
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(2);
        console.log(currentImg);
    }

    const openModal3 = () => {
        setDisplayModal({display:"block"});
        document.querySelector("#img_input").value = "";
        setCurrentImg(3);
        console.log(currentImg);
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
                            <h3 contentEditable suppressContentEditableWarning className="trend1-h3">{trendTitle1}</h3>
                            <p contentEditable suppressContentEditableWarning className="trend1-text">{trendText1}</p>
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
                            <h3 contentEditable suppressContentEditableWarning className="trend2-h3">{trendTitle2}</h3>
                            <p contentEditable suppressContentEditableWarning className="trend2-text">{trendText2}</p>
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
                            <h3 contentEditable suppressContentEditableWarning className="trend3-h3">{trendTitle3}</h3>
                            <p contentEditable suppressContentEditableWarning className="trend3-text">{trendText3}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}