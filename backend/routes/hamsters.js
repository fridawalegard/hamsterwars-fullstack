const getDatabase = require('../database.js')
const db = getDatabase()


const express = require('express')
const router = express.Router()


 //  GET  /hamsters/    hämtar alla hamster-objekt

    router.get('/', async (req, res) => {

    let snapshot;

	try {
		snapshot = await db.collection('hamsters').get();
	}


	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

	
	if (snapshot.empty) {
		res.sendStatus(400);
		return;
	}


    const hamsters = []
	snapshot.forEach(doc => {
		const data = doc.data();
		data.id = doc.id;
		hamsters.push(data);
	});

	res.status(200).send(hamsters);

});

 // GET /hamsters/random    hämtar ett slumpat hamster-objekt   

    router.get('/random', async (req, res) => {

	let docRef;
        
	try {
		docRef = await db.collection("hamsters").get();
	}	

	catch(error) {
		console.log(error.message)
		res.status(500).send(error.message)
	}

  if (docRef.empty) {
    res.status(404).send('Can not find any hamster');
    return;
  }

  let hamsters = [];
  let getRandomHamster;

  docRef.forEach((doc) => {
    const data = doc.data();
	data.id = doc.id;
    hamsters.push(data);

	getRandomHamster = hamsters[Math.floor(Math.random()*hamsters.length)];
  });
    
    res.send(getRandomHamster)

    
})

// GET /hamsters/:id    hämtar en hamster med ett specifikt id

    router.get('/:id', async (req, res) => {
        const id = req.params.id
	    const docRef = await db.collection('hamsters').doc(id).get();
 
    
        if (!docRef.exists) {
            res.status(404).send('Oh no, there is no hamster that matches that id');
            return;
        };
    
        const data = docRef.data();
        res.status(200).send(data);
        
})





// POST /hamsters
router.post('/', async (req, res) => {
	const object = req.body;

	if(!isHamsterObject(object)) {
		res.status(400).send('Sorry, thats is not a hamster-object!')
		return;
	}

    let docRef;

	try {
		docRef = await db.collection('hamsters').add(object);

		const newObj = { id: docRef.id };

		res.send(newObj);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

});


// PUT /hamsters/:id

router.put('/:id', async (req, res) => {

	const object = req.body
	const id = req.params.id
    const docRef = db.collection('hamsters').doc(id);
	
	let hamsterRef;

    if(!object || !id ) {
		res.sendStatus(400);
		return;
	}

    try {
		hamsterRef = await docRef.get();

	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
        return
	}

	if(!hamsterRef.exists) {
		res.status(404).send('Ooops');
		return;
	}

    try {
		await docRef.set(object, { merge: true });

		if(Object.keys(object).length === 0) {
			res.sendStatus(400);
			return;
		}

		res.sendStatus(200);
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

});



	


function isHamsterObject(obj) {

     if( obj && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(o => obj.hasOwnProperty(o)) ) {
            return true;
        }
    
    if( obj.id )
            return true
    
        return false;
}



//DELETE    /hamsters:id  tar bort en hamster med ett specifikt id

router.delete('/:id', async (req, res) => {
	const id = req.params.id

	if(!id) {
		res.status(400).send('Oh no, there is no hamster that matches that id')
		return
    }

    let docRef;

	try {
		docRef = await db.collection('hamsters').doc(id).get();
	}

	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}

    if(!docRef.exists) {
        res.status(404).send('Ooops');
        return;
    }

	

	await db.collection('hamsters').doc(id).delete()
	res.status(200).send('Hamster deleted')
})



module.exports = router;