
import axios from 'axios'; 
const backendurl = 'http://54.252.168.81:8080';

const getProductPage = id => { 
    console.log("GETTING PRODUCT PAGE FOR", id);
    let pid = String(id);
    let url = `${backendurl}/product/${pid}`;
    return( 
        axios.get(url)
    )
}

const getProductID = b64_data => {
    return ( 
        axios.post(`${backendurl}/upload`, { image: String(b64_data) })
    )
}

const cacheProduct = (id) => { 
    return new Promise( (resolve, rej) => {
        if(id === undefined || id === null) { 
            console.log(id);
            rej("Bad id"); 
        } else { 
            let pagePromise = getProductPage(id); 
            pagePromise.then(res => {
                console.log("PRODUCT GOT, RESULTS:", res.data);
                localStorage.setItem(id, JSON.stringify(res.data));
                resolve();
            })
            .catch(e => { 
                console.log("ERROR: PRODUCT DID NOT GET");
                console.log(e);
                rej();
            })
        }
    })
}

export default { 
    getProductID, 
    cacheProduct,
    getProductPage, 
    backendurl
}