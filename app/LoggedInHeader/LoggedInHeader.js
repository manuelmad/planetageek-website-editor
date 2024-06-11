import Image from "next/image";
import './loggedInHeader.css';

export default function Header({
    displayHeader,
    setDisplayHeader,
    displayTrends,
    setDisplayTrends,
    setDisplayLoggedOutView
}) {
    const hideHeaderAndShowLoginView = ()=> {
        setDisplayHeader({display:"none"});
        setDisplayTrends({display:"none"});
        setDisplayLoggedOutView({display:"flex"});
    }
    return(
        <header className="header" style={displayHeader}>
            <section className="logo-container">
            <Image
                src='/logo.png'
                alt="my logo"
                width={312}
                height={107}    
            />
            </section>
            <section>
                <p className="header-title-container">Website Editor</p>
            </section>
            <section className="logout-btn-container">
                <button id="logout-btn" onClick={hideHeaderAndShowLoginView}>Log out</button>
            </section>
        </header>
    );
}