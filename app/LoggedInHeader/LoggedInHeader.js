import Image from "next/image";
import './loggedInHeader.css';
import { getAuth, signOut } from "firebase/auth";

export default function Header({
    displayHeader,
    setDisplayHeader,
    setDisplayTrends,
    setDisplayLoggedOutView,
    setDisplayFooter
}) {
    const logOut = ()=> {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            setDisplayHeader({display:"none"});
            setDisplayTrends({display:"none"});
            setDisplayFooter({display:"none"});
            setDisplayLoggedOutView({display:"flex"});
            document.getElementById('user_password').value = '';
            console.log('Se ha cerrado sesión exitosamente');
        }).catch((error) => {
            // An error happened.
            console.log('error on signOut: ', error);
        });
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
                <button id="logout-btn" onClick={logOut}>Log Out</button>
            </section>
        </header>
    );
}