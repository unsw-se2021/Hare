
// Set Username
const setUsernameLS = (username) => {
	localStorage.setItem('username', username);
} 

// Set Password 
const setPasswordLS = (password) => { 
	localStorage.setItem('password', password);
} 

// Retrieve username
const getUsernameLS = () => { 
	let username = localStorage.getItem('username'); 
	return username; 
} 

// Retrieve password 
const getPasswordLS = () => { 
	let password = localStorage.getItem('password');
	return password; 
} 

// Log user in or out using set usr/pass
const authenticateUser = () => {
	let pass = getPasswordLS(); 
	let usr = getUsernameLS(); 

	if((usr == null || usr === false) || (pass == null || pass === false)) {
		console.log("[AuthService.js: authenticateUser()]: usr or pass is null"); 
		console.log("[ARGS]: ", usr, pass);
		localStorage.setItem("auth", false); 
	} else if(usr == "John" && pass == "123") { 
		localStorage.setItem("auth", true); 
	} else { 
		console.log("[AuthService.js: authenticateUser()]: invalid details entered");
		console.log("[ARGS]: ", usr, pass); 
		localStorage.setItem("auth", false); 
	} 
} 

// Find out if the user is logged in or out 
const isAuthenticated = () => { 
	let authval = String(localStorage.getItem('auth'));
	if(Boolean(authval)) { 
		console.log("[AuthService.js isAuthenticated()]: authval is truthy"); 
		console.log("[ARGS]: ", authval); 
		return authval; 	
	} else { 
		console.log("[AuthService.js isAuthenticated()]: Invalid authval"); 
		console.log("[ARGS]: ", authval, "from", localStorage.getItem('auth')); 
		return authval; 
	} 
} 

const LogOut = () => { 
	setPasswordLS(null); 
	setUsernameLS(null); 
	authenticateUser(); 
} 

export default { 
	setUsernameLS, 
	setPasswordLS, 
	getUsernameLS, 
	getPasswordLS, 
	authenticateUser, 
	isAuthenticated,
	LogOut
} 
