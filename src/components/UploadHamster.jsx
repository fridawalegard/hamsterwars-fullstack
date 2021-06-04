import React, { useState } from "react";
//import './UploadHamster.css';

function UploadHamster() {
    const [name, setName] = useState('');
    const [nameTouched, setNameTouched] = useState(false);
    const [age, setAge] = useState('');
    // const [ageTouched, setAgeTouched] = useState(false);
    const [loves, setLoves] = useState('');
    // const [lovesTouched, setLovesTouched] = useState(false);
    const [favFood, setFavfood] = useState('');
    // const [favFoodTouched, setFavFoodTouched] = useState(false);
    const [image, setImage] = useState('');
    // const [imageTouched, setImageTouched] = useState(false);

    async function handleClick(event) {

        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': process.env.REACT_APP_FIREBASE_KEY},
            body: JSON.stringify({
                'name': name, 
                'age': age, 
                'loves': loves, 
                'favFood': favFood, 
                'imgName': image
            })
        }
    
        try{
            console.log(requestOptions.body, requestOptions.headers, process.env.REACT_APP_FIREBASE_KEY);
            const response = await fetch('/api/upload', requestOptions);
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        
        } catch (e) {
    
            console.log('Upload failed, ', e);
            return null;
    
        }
    }

    let [nameClass, nameError] = nameTouched
        ? isValidName(name)
        : ['', ''];

    // let [ageClass, ageError] = ageTouched
    //     ? isValidAge(age)
    //     : ['', ''];

    // let [lovesClass, lovesError] = lovesTouched
    //     ? isValidLoves(loves)
    //     : ['', ''];

    // let [favFoodClass, favFoodError] = favFoodTouched
    //     ? isValidFavFood(favFood)
    //     : ['', ''];

    // let [imageClass, imageError] = imageTouched
    //     ? isValidImage(image)
    //     : ['', ''];
    
    return (
        <section>
            <h2>Upload hamster</h2>
            <form onSubmit={event => {event.preventDefault();}}>
                <section className="form-group">
                    <label>Name</label>
                    <input value={name} type="text" 
                        onChange={event => setName(event.target.value)} 
                        placeholder="Enter name" 
                        className={nameClass}
                        onBlur={() => setNameTouched(true)}>    
                    </input>
                    <div className="error">{nameError}</div>
                </section>
                <section className="form-group">
                    <label>Age</label>
                    <input value={age} type="text" 
                        onChange={event => setAge(event.target.value)} 
                        placeholder="Enter age in years"
                        // className={ageClass}
                        // onBlur={() => setAgeTouched(true)}
                    ></input>
                </section>
                <section className="form-group">
                    <label>Loves</label>
                    <input value={loves} type="text" 
                        onChange={event => setLoves(event.target.value)}
                        placeholder="What does the hamster love to do?"
                        // className={lovesClass}
                        // onBlur={() => setLovesTouched(true)}
                    ></input>
                </section>
                <section className="form-group">
                    <label>Favourite food</label>
                    <input value={favFood} type="text" 
                        onChange={event => setFavfood(event.target.value)} 
                        placeholder="Enter hamsters favourite food"
                        // className={favFoodClass}
                        // onBlur={() => setFavFoodTouched(true)}
                    ></input>
                </section>
                <section className="form-group">
                    <label>Image</label>
                    <input value={image} type="text" 
                        onChange={event => setImage(event.target.value)} 
                        placeholder="Enter image name"
                        // className={imageClass}
                        // onBlur={() => setImageTouched(true)}
                    ></input>
                </section>
                <section className="form-group">
                    <button onClick={handleClick} 
                    disabled={nameError 
                        // || ageError || lovesError || favFoodError || imageError
                    }>Add to database</button>
                </section>
            </form>
        </section>
    )
}

function isValidName(name) {
    let validName = typeof(name) === 'string'
        && isNaN(Number(name));

    if( validName ) {
        return ['valid', ''];
    } else {
        return ['invalid', "Please enter a name containing only letters"]
    }
}

// function isValidAge(age) {
//     let validAge = typeof(age) === 'number'
//         && (age < 8) && (age > 0);

//     if( validAge ) {
//         return ['valid', ''];
//     } else {
//         return ['invalid', "Please enter age in years using a number between 0 and 8"]
//     }
// }

// function isValidLoves(loves) {
//     let validLoves = typeof(loves) === 'string'

//     if( validLoves ) {
//         return ['valid', ''];
//     } else {
//         return ['invalid', "Please write something that the hamster loves"]
//     }
// }

// function isValidFavFood(favFood) {
//     let validFavFood = typeof(favFood) === 'string'

//     if( validFavFood ) {
//         return ['valid', ''];
//     } else {
//         return ['invalid', "Please enter the hamsters favorite food"]
//     }
// }

// function isValidImage(image) {
//     let validImage = typeof(image) === 'string'

//     if( validImage ) {
//         return ['valid', ''];
//     } else {
//         return ['invalid', "Please enter the name of the image, for example fluffy.jpg"]
//     }
// }

export default UploadHamster;
