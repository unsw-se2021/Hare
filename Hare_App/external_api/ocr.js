const request = require("request");
const fs = require("fs");

const simplify = require("./simplify_function");

function hget(url, options) {
	return new Promise((resolve, reject) => {
		const req = request(
			{
				url: url,
				method: options.method,
				body: options.body ? options.body : ""
			},
			(err, res, body) => {
				if (err) reject(err);

				resolve(JSON.parse(body));
			}
		);
	});
}

function get_raw_text(content64) {

	return new Promise((resolve, reject) => {
		const Product = {
			requests: [
				{
					image: {
						content: content64
					},
					features: [
						{
							type: "TEXT_DETECTION"
						}
					]
				}
			]
		};

		hget(
			"https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBgTVaXONCJjVWYOg3bPcm3r5gonNjTbzc",
			{
				method: "POST",
				body: JSON.stringify(Product)
			}
		)
			.then(data => {
				if (!data || !data["responses"]) {
					reject("400");
				} else {
					const textAnnotations = data["responses"][0]["textAnnotations"];
					if (!textAnnotations) reject("404");
					else resolve(textAnnotations[0]["description"]);
				}
			})
			.catch(reject);
	});
}

const translation_cache = JSON.parse(
	fs.readFileSync("res/translation_cache.json")
);

function get_raw_text_translated(raw_text) {
	return new Promise((resolve, reject) => {
		const encodedText = encodeURIComponent(raw_text);
		if (translation_cache[encodedText]) {
			resolve(translation_cache[encodedText]);
		}

		hget(
			"https://translation.googleapis.com/language/translate/v2/detect/?q=" +
			encodedText +
			"&key=AIzaSyBgTVaXONCJjVWYOg3bPcm3r5gonNjTbzc",
			{
				method: "GET",
				body: null
			}
		)
			.then(data => {
				if (!data || !data["data"] || !data["data"]["detections"]) {
					reject("400");
				} else {
					const language = data["data"]["detections"][0][0]["language"];
					if (!language) reject("404");
					else return language.split("-")[0];
				}
			})
			.then(detected_language => {
				console.log("detected language " + detected_language);
				if (detected_language !== "en") {
					console.log("translating...");
					hget(
						"https://translation.googleapis.com/language/translate/v2/?q=" +
						encodedText +
						"&source=" +
						detected_language +
						"&target=en&key=AIzaSyBgTVaXONCJjVWYOg3bPcm3r5gonNjTbzc",
						{
							method: "GET",
							body: null
						}
					).then(data => {
						if (!data || !data["data"] || !data["data"]["translations"]) {
							reject("400");
						} else {
							const text_in_english =
								data["data"]["translations"][0]["translatedText"];
							if (!text_in_english) reject("404");
							else {
								translation_cache[encodedText] = text_in_english;
								fs.writeFileSync(
									"res/translation_cache.json",
									JSON.stringify(translation_cache)
								);
								resolve(text_in_english);
							}
						}
					});
				} else {
					console.log(raw_text);
					resolve(raw_text);
				}
			})
			.catch(reject);
	});
}

function data_filter(raw_text) {
	return simplify.simplify([raw_text]);
}

function get_ingredients(content64) {
	return new Promise((resolve, reject) => {
		get_raw_text(content64.replace("data:image/jpeg;base64,", ""))
			.then(raw_text => {
				get_raw_text_translated(raw_text)
					.then(text_in_english => {
						const ingredients = data_filter(text_in_english);
						resolve(ingredients);
					})
					.catch(reject);
			})
			.catch(reject);
	});
}

module.exports = {
	get_ingredients: get_ingredients
};
