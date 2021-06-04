import React, { useState } from "react";
import './AddHamster.css';

function AddHamster() {
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
            return setNameError("Namn får vara max 15 tecken");
        }
        setNameError("");
        setName(name);
    }
    function validateAge(event) {
        const age = event.target.value;
        if (age < 0) return setAgeError("Åldern får inte vara under 0 år");
        if (age > 5) return setAgeError("Åldern får inte vara över 9 år");
        setAgeError("");
        setAge(age);
    }
    function validateFavFood(event) {
        const favFood = event.target.value;
        let validated = validateText(favFood);
        if (!validated) return setFavFoodError("Favoritmat får vara max 15 tecken");
        setFavFoodError("");
        setFavFood(favFood);
    }
    function validateLoves(event) {
        const loves = event.target.value;
        let validated = validateText(loves);
        if (!validated) return setLovesError("Älskar får vara max 15 tecken");
        setLovesError("");
        setLoves(loves);
    }
    function validateImgName(event) {
        const imgName = event.target.value;
        let validated = validateText(imgName);
        if (!validated) return setImgNameError("Bildadress får vara max 20 tecken");
        if (imgName.includes("http:")) return setImgNameError("Bildadress måste vara lokal adress");
        setImgNameError("");		
        setImgName(imgName);
    }
    
    
    
    function validateText(text) {
        if (text.length > 15) return false;
        return true;
    }
    function nameToShort(event) {
        const name = event.target.value;
        if (name.length < 2) return setNameError("Namn måste vara minst 2 bokstäver");
    }
    function ageIsEmpty(event) {
        const age = event.target.value;
        if (age.length === 0) return setAgeError("Ålder måste vara ifyllt");
    }
    function favFoodToShort(event) {
        const favFood = event.target.value;
        if (favFood.length < 3) return setFavFoodError("Favoritmat måste vara minst 3 bokstäver");
    }
    function lovesToShort(event) {
        const loves = event.target.value;
        if (loves.length < 3) return setLovesError("Älskar måste vara minst 3 bokstäver");
    }
    function imgNameIsImage(event) {
        const imgName = event.target.value 
        if (imgName.length === 0) return setImgNameError("Bildadress måste finnas");
        if (!imgName.endsWith('.jpg')) return setImgNameError("Endast .jpg bilder är tillåtna");
        if (imgName === '.jpg') return setImgNameError("Kontrollera bildadressen");
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
    }
    

    
    return (
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

						<div className="button-div">
								<button onClick={addHamsterToDb}>Add hamster</button>
                        </div>
                </section>
           
        </section>

    )
}



export default AddHamster;
