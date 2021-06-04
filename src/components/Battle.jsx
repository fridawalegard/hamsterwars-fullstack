import React, { useState, useEffect } from "react";
// import {BattleWinner} from "./BattleWinner"
import './Battle.css';
import headerHamster from '../headerHamster.svg'
import crown from '../crown.svg'
import Footer from "./Footer";




function Battle() {


    const [hamster1, setHamster1] = useState({});
    const [hamster2, setHamster2] = useState({});
    const [showResult, setShowResult] = useState(false)
    

    const [winner, setWinner] = useState({});
    // const [loser, setLoser] = useState({})

    useEffect(() => {

           async function getRandomHamster(setHamster) {
        const response = await fetch('/hamsters/random', {method: 'GET'});
        const data = await response.json();
        setHamster(data);
    }

		getRandomHamster(setHamster1);
		getRandomHamster(setHamster2);
	}, [])


 
        
    const BattleWinner = async (winner, loser) => {
        
        try{
          
           await fetch('/hamsters/'+winner.id, {
              method: 'PUT',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': process.env.PRIVATE_KEY},
              body: JSON.stringify({
                  'wins': winner.wins +1,
                  'games': winner.games +1
              })
          });
  
          await fetch('/hamsters/'+loser.id, {
              method: 'PUT',
              headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': process.env.PRIVATE_KEY},
              body: JSON.stringify({
                  'defeats': loser.defeats +1,
                  'games': loser.games +1
              })
          });
  
         
  
          return (winner, loser);
      
      } catch (e) {
  
          console.log('Upload failed, ', e);
          return null;
  
      }

    
      
  }

        const refreshPage = ()=>{
            window.location.reload();
        }


    return (
        <>
        <img src={headerHamster} className="hamster-logo" alt="hamster" />
         
        <div className="hamster-block"> 
        
            {hamster1.id && hamster2.id             

            ? <><section className="left-hamster" onClick={() => {BattleWinner(hamster1, hamster2); setShowResult(!showResult); setWinner(hamster1)}} >
                   {winner.id ===hamster1.id ? <img src={crown} className="left-crown" alt="crown" /> : null}
                    
                     <img className="hamster-img" alt="Hamster" src={`/${hamster1.imgName}`}></img>
                     <div className="hamster-name">
                        <p className="name">{hamster1.name}</p>
                     </div>    
                    
                 </section>

            <section className="left-is">
                {hamster1.age } years old <br />
                Loves {hamster1.loves}  <br />
                and favourite food is {hamster1.favFood}

                {showResult ? <p className="left-battle-info">
                        wins: {hamster1.wins} <br />
                        defeats: {hamster1.defeats} <br />
                        games: {hamster1.games}
                    </p>  : null}

            </section>   


            <p className="vs">VS</p>

            <section className="right-hamster" onClick={() => {BattleWinner(hamster2, hamster1); setShowResult(!showResult); setWinner(hamster2)}}>
            {winner.id ===hamster2.id ? <img src={crown} className="right-crown" alt="crown" /> : null}
                <img className="hamster-img" alt="Hamster" src={`/${hamster2.imgName}`}></img>
                <div className="hamster-name">
                    <p className="name">{hamster2.name}</p>
                </div>
            </section>
            
            <section className="right-is">
                {hamster2.age } years old <br />
                Loves {hamster2.loves}  <br />
                and favourite food is {hamster2.favFood}

                {showResult ? <p className="battle-info">
                        wins R: {hamster2.wins} <br />
                        defeats: {hamster2.defeats} <br />
                        games: {hamster2.games}
                    </p>
                    : null}
                     

            </section>  

            </>

            : <><section className="loading">
                    Hamsters getting ready...
                </section></>}

           
        </div>

        {showResult ? 

                <section className="winning-hamster"> 
                            <p className="winners-name">{winner.name}</p>
                            <button onClick={refreshPage}>Next</button>
                </section>
    
         : null}

        <Footer/>
        </>

        
    )


}

export default Battle;