

// export const BattleWinner = async (winner, loser) => {
        
//       try{
        
//          await fetch('/hamsters/'+winner.id, {
//             method: 'PUT',
//             headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': process.env.PRIVATE_KEY},
//             body: JSON.stringify({
//                 'wins': winner.wins +1,
//                 'games': winner.games +1
//             })
//         });

//         await fetch('/hamsters/'+loser.id, {
//             method: 'PUT',
//             headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': process.env.PRIVATE_KEY},
//             body: JSON.stringify({
//                 'defeats': loser.defeats +1,
//                 'games': loser.games +1
//             })
//         });

       

//         return (winner, loser);
    
//     } catch (e) {

//         console.log('Upload failed, ', e);
//         return null;

//     }

// }

