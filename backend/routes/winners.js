const getDatabase = require("../database.js");
const db = getDatabase();


const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {

	try {
		let hamsters = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
		
		const winnersTop = [];
		hamsters.forEach(doc => {
			data = doc.data();
			winnersTop.push(data);
		})

			console.log(winnersTop);
		
		res.send(winnersTop);
	}
	
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});



module.exports = router;