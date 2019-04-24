
import axios from "axios";

const backendurl = "http://54.252.168.81:8080"; 

// Get all information needed to render profile page 
const getProfileData = (key) => { 
    return (
        axios
        .get(`${backendurl}/userdata/key/${key}`)
    );
}

const updateUserdata = (new_userdata) => {
    let key = localStorage.getItem('auth');
    return ( 
       axios.post(`${backendurl}/userdata/update/${key}`, new_userdata)
       .then( () => {
            localStorage.setItem('userdata', JSON.stringify(new_userdata))
            return;
       })
    )
}

// Request back-end update credentials with key 
const updateCredentials = (key, newCreds) => { 
// TODO
}

// Request back-end update preferences with key 
const updatePreferences = (key, newPrefs) => { 
// TODO 
}

// Request back-end update product list with key 
const saveProduct = (name, userdata, product_id) => { 
    let new_userdata = userdata; 
    new_userdata.products.push(product_id);
    let key = localStorage.getItem('auth');
    localStorage.setItem('userdata', JSON.stringify(new_userdata));
    console.log(new_userdata);
    return ( 
       axios.post(`${backendurl}/userdata/update/${key}`, new_userdata)
    )
}

export default { 
    getProfileData, 
    updateCredentials, 
    updatePreferences, 
    saveProduct,
    updateUserdata,
}