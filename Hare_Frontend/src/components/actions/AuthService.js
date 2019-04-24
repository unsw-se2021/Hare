
import axios from "axios";

const backendurl = 'http://54.252.168.81:8080';

const startAuthService = () => { 
	let key = localStorage.getItem('auth'); 
	if(key === undefined || key === null) { 
		console.log("Auth service started: Not logged in.");
	} else { 
		console.log("Auth service started: Logged in");
	}
}

// Log user in or out using set usr/pass
const authenticateUser = (usr, pass) => {
	let p_user = String(usr);
	let p_pass = String(pass);
	let request = { 
		username: p_user,
		password: p_pass,
	};

	return ( 
		axios.post(`${backendurl}/auth`, { data: request })
	)
} 

// Collect registration data, stick into request and send it off
const registerUser = (user, email, password) => {  
	let request = { 
		username: String(user),
		email: String(email), 
		password: String(password)
	}

	return ( 
		axios.post(`${backendurl}/register`, { data: request})
	);
}

const setAuthKey = (key) => { 
	if(key != null && key !== undefined) { 
		axios.get(`${backendurl}/userdata/key/${key}`)
		.then(res => { 
			localStorage.setItem('userdata', JSON.stringify(res.data));
			localStorage.setItem('auth', key); 
		}).catch(err => { 
			console.log("INVALID KEY FOR USERDATA");
		});
	} else { 
		console.log("INVALID KEY STORE ATTEMPT");
	}
}

// Find out if the user is logged in or out 
const hasAuthKey = () => { 
	let key = localStorage.getItem('auth');
	let authval = false; 
	if (key !== undefined && key !== null) { 
		authval = true; 
	}

	if(authval == true) { 
		console.log("[AuthService.js isAuthenticated()]: authval is truthy"); 
		console.log("[ARGS]: ", authval, key); 
		return authval; 	
	} else { 
		console.log("[AuthService.js isAuthenticated()]: Invalid authval"); 
		console.log("[ARGS]: ", authval, "from", localStorage.getItem('auth')); 
		return authval; 
	} 
} 

const LogOut = () => { 
	localStorage.clear(); 
} 

export default { 
	startAuthService,
	authenticateUser, 
	registerUser,
	setAuthKey, 
	hasAuthKey, 
	LogOut
} 
