import {useState} from 'react'



function Matches({matches, hamsters}) {


// const [WinningHamster, setWinningHamster]
// const [losingHamster, setLosingHamster]

return (
    <div>
        <section>
            <h2>Matches</h2>
        {matches
            ? matches.map(match => (
                <div key={match.id}>
                    <p>Match: </p>
                    <p> Winner: {hamsters.name}</p>
                    <p> Loser: {match.loserId}</p>
                </div>
            ))
            : 'Hämtar hamstrar från API...'
        }
        </section>
        </div>
)
}



export default Matches;

