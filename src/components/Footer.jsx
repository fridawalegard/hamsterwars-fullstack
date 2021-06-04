import './Footer.css';
import poop from '../poop.svg'
import rulle from '../rulle.svg'

function FooterComponent() {

    return (

    <section className="footer">
        <img src={poop} className="poop" alt="poop" />
        <img src={rulle} className="rulle" alt="rulle" />
        
    </section>

    )
}



export default FooterComponent;