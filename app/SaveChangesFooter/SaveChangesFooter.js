import './saveChangesFooter.css';

export default function Footer({
    displayFooter,
    setDisplayFooter
}) {
    return(
        <footer style={displayFooter}>
            <section>
                <button id='save_changes_btn'>Aplicar Cambios</button>
            </section>
        </footer>
    );
}