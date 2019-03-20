const insert_functions = require('./insert'); 

const get_timestamp = () => { 
	let currentdate = new Date(); 
	let datetime = currentdate.getDate() + "."
		+ (currentdate.getMonth()+1)  + "." 
		+ currentdate.getFullYear() + "|"
		+ currentdate.getHours() + ":"  
		+ currentdate.getMinutes() + ":" 
		+ currentdate.getSeconds();
	return datetime;
}; 

const db_log = (log_type, message, color) => {
	let print_col;
	let timestamp = get_timestamp(); 
	switch (color){
		case "red":
			print_col = "\x1b[31m";
			break;
		case "blue":
			print_col = "\x1b[94m";
			break;
		case "yellow":
			print_col = "\x1b[33m";
			break;
		case "green":
			print_col = "\x1b[32m";
			break;
		case "bred": 
			print_col = "\x1b[41m"; 
			break; 
		case "bblue":
			print_col = "\x1b[44m";
			break;
		case "bgreen": 
			print_col = "\x1b[42m\x1b[30m"; 
			break;
		default:
			print_col = "\x1b[0m";
			break;
	};
	console.log("[%s]%s[%s]: %s\x1b[0m", timestamp, print_col, log_type, message);
};

const db_do = {
	log: db_log,
	color_test: () => { 
		this.log("TEST", "____", "red"); 
		this.log("TEST", "____", "bred"); 
		this.log("TEST", "____", "blue"); 
		this.log("TEST", "____", "bblue"); 
		this.log("TEST", "____", "green"); 
		this.log("TEST", "____", "bgreen"); 
	}, 
	insert_data: insert_functions.insert_data,
};


module.exports = db_do; 
