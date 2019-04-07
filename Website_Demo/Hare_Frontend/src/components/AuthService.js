
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

	if(usr == "John" && pass == "123") { 
		localStorage.setItem('auth', true); 
	} else { 
		localStorage.setItem('auth', false); 
	} 
} 

// Find out if the user is logged in or out 
const isAuthenticated = () => { 
	return (localStorage.getItem('auth')); 
} 

export default { 
	setUsernameLS, 
	setPasswordLS, 
	getUsernameLS, 
	getPasswordLS, 
	authenticateUser, 
	isAuthenticated, 
} 
