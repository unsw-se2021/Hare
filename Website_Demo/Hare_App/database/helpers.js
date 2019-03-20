
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

const db_do = {
	log: (log_type, message, color) => {
		let print_col;
		let timestamp = get_timestamp(); 
		switch (color){
			case "red":
				print_col = "\x1b[41m";
				break;
			case "blue":
				print_col = "\x1b[34m";
				break;
			case "yellow":
				print_col = "\x1b[33m";
				break;
			case "green":
				print_col = "\x1b[32m";
				break;
			default:
				print_col = "\x1b[0m";
				break;
		};
		console.log("[%s]%s[%s]: %s\x1b[0m", timestamp, print_col, log_type, message);
	},
	insert_data: require('./insert').insert_data,
};

module.exports = db_do;
