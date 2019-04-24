// HELPER FUNCTIONS //
// Function to split a string into substrings
function better_split(input_string, separators) {
    var output_strings = [input_string];
    for (var i = 0; i < separators.length; i++) {
        var temp_strings = [];
        for (var j = 0; j < output_strings.length; j++) {
            var tokens = output_strings[j].split(separators[i]);
            for (var k = 0; k < tokens.length; k++) {
                if (tokens[k] != '') {
                    temp_strings.push(tokens[k]);
                }
            }
        }
        output_strings = temp_strings;
    }
    return output_strings
}

// Function to lower a strings case
function lower_case(input_string) { return input_string.toLowerCase(); }

// Function to shorten other functions,
// Takes an array of strings and performs any function on each string
function foreach(input_array, func) {
    for (var i = 0; i < input_array.length; i++) {
        input_array[i] = func(input_array[i]);
    }
    return input_array;
}

// Function to trim the contents of a string before a character (inclusive)
function remove_before_colon(input_string) {
    return input_string.substring(input_string.indexOf(':') + 1);
}

// Function to trim the contents of a string before a word (inclusive)
function remove_before_word(input_string) {
    var words = ['from', 'containing', 'contains', 'contain'];
    for (var i = 0; i < words.length; i++) {
        if (input_string.toLowerCase().includes(words[i].toLowerCase())) {
            return input_string.substring(input_string.toLowerCase().indexOf(words[i].toLowerCase()) + words[i].length);
        }
    }
    return input_string;
}

// Trim function
function trim(string) { return string.trim(); }

// Function to remove strings in an array which dont start with a letter
function remove_non_alpha(input_array) {
	for (var i = 0; i < input_array.length; i++) {
		if (!input_array[i].charAt(0).match(/[a-z]/i)) {
			input_array.splice(i, 1);
			i--;
		}
	}
	return input_array;
}

// Function to remove special characters and onwards from ingredients
function remove_after_special(input_array) {
	for (var i = 0; i < input_array.length; i++) {
		var match = /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.exec(input_array[i]);
		if (match) {
			input_array[i] = input_array[i].substring(0, match.index);
		}
	}
	return input_array;
}

// Function to remove strings longer than 'max_length'
function remove_long(input_array, max_length) {
	for (var i = 0; i < input_array.length; i++) {
		if (input_array[i].length > max_length) {
			input_array.splice(i, 1);
			i--;
		}
	}
	return input_array;
}

// Function looks for 'nutrition' and removes onwards until 'ingredients'
function remove_nutrition(input_array) {
    var nutrition = ['nutrition'];
    var ingredients = ['ingredient', 'substance'];
    var stage = 1;
    for (var i = 0; i < input_array.length; i++) {
        if (stage == 1) {
            for (var j = 0; j < nutrition.length; j++) {
                if (input_array[i].toLowerCase().includes(nutrition[j].toLowerCase())) {
                    stage = 2;
                    input_array.splice(i, 1);
                    i--;
                    break;
                }
            }
        } else if (stage == 2) {
            for (var j = 0; j < ingredients.length; j++) {
                if (input_array[i].toLowerCase().includes(ingredients[j].toLowerCase())) {
                    stage = 3;
                    break;
                } else {
                    input_array.splice(i, 1);
                    i--;
                    break;
                }
            }
        } else {
            break;
        }
    }
    return input_array;
}

// Function to remove common words
function remove_common(input_array) {
    var common = [  'ingredient',
                    'substance',
                    'Australia',
                    'Made in',
                    'best before',
                    'used by',
                    'allergy'
                ];
	for (var i = 0; i < input_array.length; i++) {
        for (var j = 0; j < common.length; j++) {
    		if (input_array[i].toLowerCase().includes(common[j].toLowerCase())) {
    			input_array.splice(i, 1);
    			i--;
                break;
    		}
        }
	}
	return input_array;
}

//Borrowed code from https://dev.to/saigowthamr/how-to-remove-duplicate-elements-from-array-javascript-2135
// Function removes duplicates from array
function remove_dup(input_array){
  var output_array = [];
  input_array.map((e,i) => !output_array.includes(e) && output_array.push(e));
  return output_array;
}

// Function to convert Google API outputs into displayable ingredients //
// input_array must contain exactly 1 string
// long_string_cutoff is an integer
function simplify(input_array, long_string_cutoff = 30) {
    //First Split the string into ',' separated substrings
    var substrings = better_split(input_array[0], [ ',', ' and ', ' AND ',
                                                    '.', ';', '(', ')', '\n']);
    //Then remove nutrition information tables
    substrings = remove_nutrition(substrings);
    //Then remove the contents before a ':' in each substring (for ingredient:x)
    substrings = foreach(substrings, remove_before_colon);
    //Then remove the contents the word 'contain' in each substring (for ingredient:x)
    substrings = foreach(substrings, remove_before_word);
    //Then remove leading and trailing spaces from each string
    substrings = foreach(substrings, trim);
	//Then remove every ingredient that doesn't start with a letter.
	substrings = remove_non_alpha(substrings);
	//Then remove strings of lengths larger than the long_string_cutoff
	substrings = remove_long(substrings, long_string_cutoff);
	//Then remove special characters onwards within ingredients
	substrings = remove_after_special(substrings);
    //Then remove commonly found strings which are not Ingredients
    substrings = remove_common(substrings);
    //Convert to lower case
    substrings = foreach(substrings, lower_case);
    //Now remove dulpicates
    substrings = remove_dup(substrings);
    return substrings;
}

module.exports = { 
	simplify: simplify
} 
