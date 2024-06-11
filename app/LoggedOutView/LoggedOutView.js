import Image from "next/image";
import './loggedOutView.css';

export default function LoggedOutView({
    displayLoggedOutView,
    setDisplayLoggedOutView,
    setDisplayHeader,
    setDisplayTrends
}) {
    const showEditor = ()=> {
        setDisplayLoggedOutView({display:"none"});
        setDisplayHeader({display:"grid"});
        setDisplayTrends({display:"block"});
    }
    return (
        <section className="logged-out-container" style={displayLoggedOutView}>
            <article>
                <div className="company-logo-container">
                    <Image
                        src='/planetageek-logo.png'
                        alt="planeta geek logo"
                        width={895}
                        height={395}    
                    />
                    <h1>Planeta Geek Website Editor</h1>
                </div>
                <div className="user-login-container">
                    <p><label htmlFor="user_email">E-mail:</label></p>
                    <p>
                        <input type="email" id="user_email" placeholder="micorreo@gmail.com"></input>
                    </p>
                    <p><label htmlFor="user_password">Password:</label></p>
                    <p>
                    <input type="password" id="user_password"></input>
                    </p>
                    <p className="login-btn-container">
                        <button id="login_btn" onClick={showEditor}>Log In</button>
                    </p>
                </div>
            </article>
        </section>
    );
}