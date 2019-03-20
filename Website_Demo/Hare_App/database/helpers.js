


const write_to_log = (msg) => { 
	const fs = require('fs');
	const date = new Date(); 
	let filename = `${date.getYear()}.${date.getMonth()}.${date.getDay()}.database_codes.log`
	fs.appendFileSync(`./logs/${filename}`, msg + '\n', function(err) {
		if(err) {
			return console.log(err);
		}
	}); 
}; 

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
	let msg = `[${timestamp}][${log_type}]: ${message}`
	write_to_log(msg); 	
	msg = "[" + timestamp + "]" + print_col + "[" + log_type + "]:		" + message + "\x1b[0m"; 
	console.log(msg);
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
	insert_data: require('./insert').insert_data,
};


module.exports = db_do; 
