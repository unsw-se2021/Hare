# Home page : None


# Login page:
```
route: GET /login
parameter: username, password
response code: 200 – success; 400 – data missing, 403 – invalid details
response:token(authentication)

app.get(‘/login’, function (req, res) {
	// get user info
	const username = request.body.username;
	const possword = request.body.password;
	//authenticate user’s identity with database(Ravija)
    ...
	//generate token(Julie)
    ...
	// return user’s identity
	return token;
	
});
```

# Logout page:

```
route: POST /logout
parameter:token
response code: 200 – success; 400 – data missing / invalid
response:none

app.post(‘/logout’, function (req, res) {
	//match token
	const user = request.body.token;
	//remove token from backend(julie)
    ...
});
```

# Upload page:

```
route: PUT /upload/submit_image
parameters: data (base64), token
response code: 200 – success; 400 – data missing / invalid
response: imageId

app.put(‘/upload/submit_image’, function (req, res) {
	// get image data in base64 format
	const image64 = request.body.data;
	//get the user identity
	const user = request.body.token;
	//create image ID(Ravija)
	(create an Id based on how many images held in database)
    ...
	// create image object
	const ImageInfo ={ 
	    imageId:imageId,
	    image64:image64,
	    user:user
    };
	// save it to backend(Julie, Ravija)
    (Julie saves the image to the server,e.g in file) 
    (Ravija saves image in database)
    ...
	return imageId;
});
```


# Product page:

```
route: GET /product/
parameters: ImageId
response code: 200 – success; 400 – parsing fails
response: product object

app.get(‘/product’, function (req, res) {
    // get image object from imageId(Ravija)
    const image = function(...);
    const image64 = image['image64'];
    //send the image to google OCR API with base64 code
    const product = {
        requests: [
          {
            image: {
              content: image64
            },
            features: [
              {
                type: "TEXT_DETECTION"
              }
            ]
          }
        ]
    };
	
	const wordList = [];
	const axios = require('axios');
	axios.post("https://vision.googleapis.com/v1/images:annotate?key=Google_OCR_KEY")
    .then(function(response) {
      if (!response.data){
          res.status(400);
          res.send('No API response');
      }
      wordList = extratWord(response.data["responses"][0]["textAnnotations"]);  
      if (!wordList){
        res.status(400);
        res.send('No words detected');   
      }
    })
    .catch(function(e) {
        res.status(400);
        res.send('API error ocurrs'); 
    });
	//validate substances(Julie/Michael)
	...
	//send substances to FDA(Julie)
	...
	//create product object(Julie)
	...
	//return the product object to front end
	return productObject;	
});

//helper function
function extratWord(textAnnotations) {
    let list = [];
    if (!textAnnotations) return NULL;
    for (let i = 0; i < textAnnotations.length; i++) {
      list.push(textAnnotations[i]["description"]);
    }
    return list;
}
```











```
