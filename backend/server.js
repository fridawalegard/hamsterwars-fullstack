const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const winners = require('./routes/winners.js');
const losers = require('./routes/losers.js');
const matchwinners = require('./routes/matchwinners.js');


const PORT = process.env.PORT || 1337;
const frontend = path.join(__dirname, '../build');
const img = path.join(__dirname, './frontend/img');



//MIDDLEWARE

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.params);
    next()
})

app.use(cors())
app.use(express.json())

app.use(express.static(frontend))
app.use(express.static(img))

//ROUTES

app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/matchwinners', matchwinners);
app.use('/winners', winners);
app.use('/losers', losers);


app.get('/', (req, res) => {
    console.log('GET /frontend')
    res.send('Server says hi')
})

 
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})


// STARTS SERVER
app.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
})

