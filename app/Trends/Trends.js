'use client';
import Image from "next/image";
import './trends.css';

export default function Trends({
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
}) {

    return(
        <section className="trends" id="trends">
            <div className="title-container">
                <h2>TENDENCIAS</h2> 
                <p></p>
            </div>
            <div className="trending-articles__container">
                <article>
                    <div>
                        <div>
                            <Image
                                src={imgUrl1}
                                alt="trend1 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3>{trendTitle1}</h3>
                            <p>{trendText1}</p>
                        </div>
                    </div>
                </article>
                <article>
                    <div>
                        <div>
                            <Image
                                src={imgUrl2}
                                alt="trend2 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3>{trendTitle2}</h3>
                            <p>{trendText2}</p>
                        </div>
                    </div>
                </article>
                <article>
                    <div>
                        <div>
                            <Image
                                src={imgUrl3}
                                alt="trend3 img"
                                width={300}
                                height={200}    
                            />
                        </div>
                        <div>
                            <h3>{trendTitle3}</h3>
                            <p>{trendText3}</p>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}