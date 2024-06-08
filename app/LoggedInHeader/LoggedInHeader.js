import Image from "next/image";
import './loggedInHeader.css';

export default function Header() {
    return(
        <header className="header">
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
                <button id="logout-btn">Log out</button>
            </section>
        </header>
    );
}