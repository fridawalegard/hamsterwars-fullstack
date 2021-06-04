// import {useState, useEffect} from "react"
import './TopFive.css'

function TopFive({winners, losers}) {


return (
        <div>
            <h2>Top Five Winners</h2>
            <section className="top-five">
                
            {winners
                ? winners.map(winner => (
                    <div className="hamster-container" key={winner.id}>
                        <img className="hamster-img" alt="hamster" src={`/${winner.imgName}`}></img>
                        <p className="hamster-name">{winner.name}</p>
                       <div className="hamsters-results">
                        <p> Wins: {winner.wins}</p>
                        <p> Defeats: {winner.defeats}</p>
                        <p> Games: {winner.games}</p>
                       </div>
                        
                    </div>
                ))
                : 'Hämtar hamstrar från API...'
            }
            </section>

            <h2>Losers</h2>
            <section className="top-five">
               
            {losers
                ? losers.map(loser => (
                    <div className="hamster-container" key={loser.id}>
                        <img className="hamster-img" alt="hamster" src={`/${loser.imgName}`}></img>
                        <p className="hamster-name">{loser.name}</p>
                        <div className="hamsters-results">
                        <p>Defeates: {loser.defeats}</p>
                        <p>Wins: {loser.wins}</p>
                        <p>Games: {loser.games}</p>
                        </div>
                        
                    </div>
                ))
                : 'Hämtar hamstrar från API...'
            }
            </section>
        </div>
)

 }



export default TopFive;