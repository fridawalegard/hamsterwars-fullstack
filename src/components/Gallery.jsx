
import './Gallery.css'
import {useState} from 'react'


function GetHamsters({hamsters}) {



	function showHamsterfunction(hamster){
		setShowPopup(!showPopup)
		setShowHamster(hamster)
	}

	function askDelete(){
		setAskDelete(!ifDelete)
	}

	
	async function deleteHamster(showHamster) {
	await fetch(`/hamsters/${showHamster.id}`, {method: 'DELETE'});
	setAskDelete(!ifDelete)
	window.location.reload();
	//update hamsters
	}


    
	const [showPopup, setShowPopup] = useState(false)
	const [showForm, setShowForm] = useState(false)
	const [showHamster, setShowHamster] = useState({})
	const [ifDelete, setAskDelete] = useState(false)

	console.log(showHamster);

	const [name, setName] = useState('');
    const [nameError, setNameError] = useState('')
    const [age, setAge] = useState('');
    const [ageError, setAgeError] = useState('');
    const [loves, setLoves] = useState('');
    const [lovesError, setLovesError] = useState('');
    const [favFood, setFavFood] = useState('');
    const [favFoodError, setFavFoodError] = useState('');
    const [imgName, setImgName] = useState('');
    const [imgNameError, setImgNameError] = useState('');

	
    
    

    function validateName(event) {
        const name = event.target.value;
        let validated = validateText(name);
        if (!validated) {
            return setNameError("max 15 characters");
        }
        setNameError("");
        setName(name);
		
    }
    function validateAge(event) {
        const age = event.target.value;
        if (age < 0) return setAgeError("age must be between 0 and 5 years");
        if (age > 5) return setAgeError("age must be between 0 and 5 years");
        setAgeError("");
        setAge(age);
		
    }
    function validateFavFood(event) {
        const favFood = event.target.value;
        let validated = validateText(favFood);
        if (!validated) return setFavFoodError("max 15 characters");
        setFavFoodError("");
        setFavFood(favFood);
		
    }
    function validateLoves(event) {
        const loves = event.target.value;
        let validated = validateText(loves);
        if (!validated) return setLovesError("max 15 characters");
        setLovesError("");
        setLoves(loves);
		
    }
    function validateImgName(event) {
        const imgName = event.target.value;
        let validated = validateText(imgName);
        if (!validated) return setImgNameError("max 15 characters");
        if (imgName.includes("http:")) return setImgNameError();
        setImgNameError("");		
        setImgName(imgName);
		
    }
    
    
    
    function validateText(text) {
        if (text.length > 15) return false;
        return true;
    }
    function nameToShort(event) {
        const name = event.target.value;
        if (name.length < 2) return setNameError("name need to be at least three letters");
    }
    function ageIsEmpty(event) {
        const age = event.target.value;
        if (age.length === 0) return setAgeError("age must be filled in");
    }
    function favFoodToShort(event) {
        const favFood = event.target.value;
        if (favFood.length < 3) return setFavFoodError("favorite food must be at least three letters");
    }
    function lovesToShort(event) {
        const loves = event.target.value;
        if (loves.length < 3) return setLovesError("loves must be at least three letters");
    }
    function imgNameIsImage(event) {
        const imgName = event.target.value 
        if (imgName.length === 0) return setImgNameError("image must be filled in");
        if (!imgName.endsWith('.jpg')) return setImgNameError("image must be in .jpg format");
    }
    
    
    async function addHamsterToDb() {
        const newHamster = {
            name: name,
            age: age,
            favFood: favFood,
            loves: loves,
            imgName: imgName,
            wins: 0,
            defeats: 0,
            games: 0
        }
        console.log(newHamster);
        
        const postResponse = await fetch(`/hamsters`, {method: 'POST', 
        headers: {'Content-type': 'application/json'}, body: JSON.stringify(newHamster)});
        const putData = await postResponse.text();
        console.log(putData);
        // setUpdateHamsters(!updateHamsters);
        // setShowAddNew(!showAddNew);
		setShowForm(!showForm)
		window.location.reload();
		 }
    



	if (!showPopup) {
		return (
	<div >

		<button className="add-hamster" onClick={() => {setShowForm(!showForm)}}>Add your hamster</button>
		{showForm ? 

				 <section>
            
                <section className="formular">

                    <h2 className="form-heading">Add your hamster!</h2>
                    
                        <label> Name:</label>
						    <input type="text" value={name} onChange={validateName} onBlur={nameToShort}/>
								<div className="error-message">{nameError}</div>

						<label htmlFor="age">Age:</label>
								<input type="number" value={age} onChange={validateAge} onBlur={ageIsEmpty}/>
									<div className="error-message">{ageError}</div>

						<label htmlFor="favFood">Favourite food:</label>
								<input type="text" value={favFood} onChange={validateFavFood} onBlur={favFoodToShort}/>
									<div className="error-message">{favFoodError}</div>

						<label htmlFor="loves">Loves:</label>
								<input type="text" value={loves} onChange={validateLoves} onBlur={lovesToShort}/>
									<div className="error-message">{lovesError}</div>

						<label htmlFor="imgName">Image:</label>
								<input type="text" value={imgName} onChange={validateImgName} onBlur={imgNameIsImage}/>
									<div className="error-message">{imgNameError}</div>

						
								<button className="add-to-database"onClick={addHamsterToDb}>Add hamster</button>
                        
                </section>
           
        </section>

				

		: null}

		<section className="hamster-gallery">
		{hamsters
			? hamsters.map(hamster => (
				<div className="container" key={hamster.id} onClick={() => showHamsterfunction(hamster)}>
					<img className="hamster-img" alt="hamster" src={`/${hamster.imgName}`}></img>
					<p className="hamster-name">{hamster.name}</p> 

				</div>
				
			)
			)
			: 'Hämtar hamstrar från API...'
		}
		</section>

	</div>
	)
}

else {
	return (
	<section className="show-section" hamster={showHamster}>

		<div className="show-hamster-container">
			<img className="show-img" src={`/${showHamster.imgName}`} alt="hamster" /> <br />
				
			<h2> {showHamster.name} </h2>
				
				<p className="show-hamster">
					Favourite food is {showHamster.favFood} <br />
					Loves {showHamster.loves} <br />
					Wins: {showHamster.wins} <br />
					Defeats: {showHamster.defeats} <br />
					Games: {showHamster.games}
				</p>

					<button className="delete-btn" onClick={() => askDelete(!ifDelete)}> Delete hamster?</button>
					<button className="close-btn" onClick={() => {setShowPopup(!showPopup)}}>  Close </button>

		</div>		

		{ifDelete ? <section className="delete-message">
			<div>
				<p>
					Are you sure you want to delete this hamster?
				</p>
				<button className="yes-btn" onClick={() => deleteHamster(showHamster)}>Yes</button>
				<button className="no-btn" onClick={() => askDelete(!ifDelete)}>No</button>
			</div>
			
		</section>
		: null}
	
	</section>	


	
	)
}



		// function askDelete() {

		// 		<div className="info-footer">
		// 			<p>Vill du radera hamstern?</p>
		// 			<button className="basic-btn" onClick={deleteHamster}>RADERA</button>
		// 			<button className="secondary-btn" onClick={dontDelete}>AVBRYT</button>
		// 		</div>
		// }

		// async function deleteHamster() {
		// 	await fetch(`/hamsters/${showHamster.id}`, {method: 'DELETE'});
		// 	// setUpdateHamsters(!updateHamsters);
		// 	// buttonFunction();
		// }
		// function dontDelete() {
		// 		<div className="info-footer">
		// 			<button></button>
		// 			{/* <button className="basic-btn" onClick={buttonFunction}>{buttonText}</button> */}
		// 			{/* {showDelete ? 
		// 				<button className="delete-btn" onClick={askDelete}>Radera hamster?</button>
		// 			: null }	 */}
		// 		</div>
		// }
}


export default GetHamsters;