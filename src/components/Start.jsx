import Footer from './Footer';

function Start(){

    return(

        <section>

            <div className="start">
                <h2>Welcome!</h2>
                <p>
                In Hamsterwars you vote for the cutest hamster by clicking on it. Easy!
                </p>
                <p>
                Or look around in the gallery. Maybe upload your own hamster, becuse that's the cutest one. Am I right?
                </p>
            </div>
            <p className="may-the-cutest">
                May the cutest hamster win!
            </p>

            <Footer/>

        </section>

       

    )
}


export default Start;