import './Footer.css';
import poop from '../poop.svg'
import rulle from '../rulle.svg'

function FooterComponent() {

    return (

    <section className="footer">
        <img src={poop} className="poop" alt="poop" />
        <img src={rulle} className="rulle" alt="rulle" />
                    {/* <p>Which hamster will reign supreme in the cuteness competition? You decide by choosing your favourite in each battle. Explore the statistics and see if you agree with the leader and loser boards. If you feel your hamster should take part in the action, then you can upload its credentials to our database</p> */}
        
    </section>

    )
}



export default FooterComponent;