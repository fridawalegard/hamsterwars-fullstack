import './Header.css';
import cloud from '../cloud.png'

function HeaderComponent() {

    return (

    <section className="header">
        <img src={cloud} className="cloud" alt="cloud" />
            <div className="heading">
                <p className="heading-text"> HAMSTERWARS</p>
                {/* <p>Which hamster will reign supreme in the cuteness competition? You decide by choosing your favourite in each battle. Explore the statistics and see if you agree with the leader and loser boards. If you feel your hamster should take part in the action, then you can upload its credentials to our database</p> */}
            </div>
        
    </section>

    )
}



export default HeaderComponent;