// gets data idk 


const check_username = (user_auth, username) => { 
	return  new Promise((resolve, reject) => { 
		let user_count = 0;
		user_auth.find({ 'user.name': username }, (err, result) => {
			user_count = result.length; 
			if(user_count > 0) {
				reject(String(user_count));
			} else { 
				resolve(true); 
			}
		});

	}); 
};

module.exports = {
	check_username: check_username
}
