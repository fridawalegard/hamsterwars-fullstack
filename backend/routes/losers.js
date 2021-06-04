const getDatabase = require("../database.js");
const db = getDatabase();


const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {

	try {
		let hamsters = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get();
		
		const losersTop = [];
		hamsters.forEach(doc => {
			data = doc.data();
			losersTop.push(data);
		})

			console.log(losersTop);
		
		res.send(losersTop);
	}
	
	catch(error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});



module.exports = router;