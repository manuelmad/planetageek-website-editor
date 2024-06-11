import Image from "next/image";
import './loggedInHeader.css';
import { getAuth, signOut } from "firebase/auth";

export default function Header({
    displayHeader,
    setDisplayHeader,
    displayTrends,
    setDisplayTrends,
    setDisplayLoggedOutView
}) {
    const logOut = ()=> {
        const auth = getAuth();
        signOut(auth).then(() => {
        // Sign-out successful.
        setDisplayHeader({display:"none"});
        setDisplayTrends({display:"none"});
        setDisplayLoggedOutView({display:"flex"});
        console.log('Se ha cerrado sesión exitosamente');
        }).catch((error) => {
        // An error happened.
        console.log(error);
        });
        // setDisplayHeader({display:"none"});
        // setDisplayTrends({display:"none"});
        // setDisplayLoggedOutView({display:"flex"});
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
                <button id="logout-btn" onClick={logOut}>Log out</button>
            </section>
        </header>
    );
}