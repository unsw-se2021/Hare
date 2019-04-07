const fs = require("fs");
const https = require("https");
const ingrdnt_collection = JSON.parse(fs.readFileSync("db.json"));
let cache = JSON.parse(fs.readFileSync("preferred_cache.json"));

//get rid of special characters and lowercase the string
function formalisation(str) {
  var str = str.replace(/[^A-Za-z\- ]/g, "");
  return str.toLowerCase();
}

//set up cache
//Check the cache for an ingredient's preferred name
function get_pref_name_from_cache(ingrdnt_name) {
  if (!ingrdnt_name) console.log("error occurs at get_pref form cache");
  if (formalisation(ingrdnt_name) in cache) {
    return cache[formalisation(ingrdnt_name)];
  }
  return null;
}

// Add an ingredient's preferred name to the cache
function add_to_cache(ingrdnt_name, pref_name) {
  if (!ingrdnt_name) console.log("error occurs at add cache");
  cache[formalisation(ingrdnt_name)] = pref_name;
  fs.writeFileSync("preferred_cache.json", JSON.stringify(cache));
}

// A promise that just resolves after 3 seconds
function requestTimer() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 3500);
  });
}

// Function to make a HTTP request
//get the whole page
function hget(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = "";
        res.on("data", c => {
          data += c;
        });
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", console.log);
  });
}

//get preferred name from FDA
//scape the data from comment
function get_pref_name_from_FDA(ingrdnt_name) {
  return hget("https://fdasis.nlm.nih.gov/srs/auto/" + ingrdnt_name)
    .then(page => {
      const lines = page.split("\n");
      // Find the line starting with <!-- DATA:
      let i = 0;
      while (
        i < lines.length &&
        lines[i].search(/PREFERRED_SUBSTANCE_NAME/) === -1
      ) {
        i++;
      }

      if (i < lines.length) {
        const pref_name = lines[i].split("=")[1];
        console.log("Preferred name '" + formalisation(pref_name) + "'");
        return formalisation(pref_name);
      } else {
        // Cannot find the preferred name, use original name
        console.log("original name '" + formalisation(ingrdnt_name) + "'");
        return formalisation(ingrdnt_name);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

//get ingredient object form drugbank
function get_Ingrdnt_from_drugbank(pref_name) {
  //get ingredient object by preferred name
  if (pref_name in ingrdnt_collection) {
    console.log("found with pref name " + pref_name);
    return ingrdnt_collection[pref_name];
  } else {
    //get ingredient object by closest name with preffered name
    const closest_name = closest_ingrdnt_name(pref_name);
    if (closest_name) {
      console.log(pref_name + " found with closest name " + closest_name);
      const index = product_pref_ingrdnts.indexOf(pref_name);
      product_pref_ingrdnts[index] = closest_name;
      return ingrdnt_collection[closest_name];
    } else {
      //get ingredient object by original name
      const index = product_pref_ingrdnts.indexOf(pref_name);
      const original_name = formalisation(product_ingrdnts[index]);
      if (original_name in ingrdnt_collection) {
        return ingrdnt_collection[original_name];
      } else {
        //get in ingredient object by closest name with original name
        const closest_name = closest_ingrdnt_name(original_name);
        if (closest_name) {
          const index = product_pref_ingrdnts.indexOf(pref_name);
          product_pref_ingrdnts[index] = closest_name;
          return ingrdnt_collection[closest_name];
        }
      }
    }
    //the ingredient is not in our database
    return null;
  }
}

function get_description(pref_name) {
  const ingrdnt = get_Ingrdnt_from_drugbank(pref_name);
  if (ingrdnt) return get_Ingrdnt_from_drugbank(pref_name).desc;
  return null;
}

//get all categories from ingredients
function get_all_categories(product_pref_ingrdnts) {
  for (let j = 0; j < product_pref_ingrdnts.length; j++) {
    const ingrdnt = get_Ingrdnt_from_drugbank(product_pref_ingrdnts[j]);
    if (!ingrdnt) continue;
    const categories_array = ingrdnt.categories;
    for (let i = 0; i < categories_array.length; i++) {
      if ("a" <= categories_array[i][0] && categories_array[i][0] <= "z")
        continue;
      update_categories_list(categories_array[i]);
    }
  }
}

//all categories with their number of appearance respectively
function update_categories_list(category_name) {
  if (category_name in categories_list) {
    categories_list[category_name]++;
  } else {
    categories_list[category_name] = 1;
  }
}

function pick_top_n_categories(n) {
  //sort categroies by number of appearence
  //console.log(categories_list);
  let keys = Object.keys(categories_list);
  keys.sort((a, b) => {
    return categories_list[b] - categories_list[a];
  });

  //if n is greater than available categories
  //display all available categories
  const fn = n > keys.length ? keys.length : n;
  return keys.slice(0, fn);
}

//find the closest name in drugbank database
function closest_ingrdnt_name(pref_name) {
  const keys = Object.keys(ingrdnt_collection);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase().includes(pref_name)) {
      //console.log(
      //"alternative name has been found for " + pref_name + " with " + keys[i]
      //);
      return keys[i];
    }
  }
  //cannot find any similar ingredient
  return null;
}

//check whether a ingredient contains a category
//return null if the ingredient is not in the drugbank database
function has_category(
  ingrdnt_name,
  category_name,
  product_ingrdnts,
  product_pref_ingrdnts
) {
  const ingrdnt_name_index = product_ingrdnts.indexOf(ingrdnt_name);
  const ingrdnt_pref_name = product_pref_ingrdnts[ingrdnt_name_index];
  if (ingrdnt_pref_name in ingrdnt_collection)
    return ingrdnt_collection[ingrdnt_pref_name].categories.includes(
      category_name
    );
  return null;
}

//fill ingredients in the categories
function populate_categories(product_ingrdnts, product_pref_ingrdnts, n) {
  const categories_list = pick_top_n_categories(n);
  let categories = {};

  //set up the keys
  for (let i = 0; i < categories_list.length; i++)
    categories[categories_list[i]] = [];

  //mark the ingredients with selected categories
  //fill the ingredients in selected categories
  let marked = new Array(product_ingrdnts.length);
  for (let i = 0; i < categories_list.length; i++) {
    for (let j = 0; j < product_ingrdnts.length; j++) {
      if (
        has_category(
          product_ingrdnts[j],
          categories_list[i],
          product_ingrdnts,
          product_pref_ingrdnts
        )
      ) {
        categories[categories_list[i]].push(product_ingrdnts[j]);
        marked[j] = true;
      }
    }
  }
  for (let i = 0; i < product_ingrdnts.length; i++) {
    if (!marked[i]) {
      const pref_name = product_pref_ingrdnts[i];
      const ingrdnt = get_Ingrdnt_from_drugbank(pref_name);
      //not reachable in database
      if (!ingrdnt) {
        if (!("Not Found" in categories)) categories["Not Found"] = [];
        categories["Not Found"].push(product_ingrdnts[i]);
      } else {
        if (!("others" in categories)) categories["others"] = [];
        categories["others"].push(product_ingrdnts[i]);
      }
    }
  }
  return categories;
}

// Check a single preferred name against the cache / database
async function get_pref_name(ingrdnt_name) {
  return new Promise((resolve, reject) => {
    // Check the cache
    let pref_name = get_pref_name_from_cache(ingrdnt_name);

    // If the preferred name exists in the cache, use that
    if (pref_name) {
      resolve(pref_name);
    } else {
      // Otherwise, make a request
      let promises = [get_pref_name_from_FDA(ingrdnt_name), requestTimer()];

      // Once both the preferred name has been found, and 3 seconds have been passed, resolve this promise
      Promise.all(promises).then(resolved => {
        if (resolved[0]) {
          pref_name = resolved[0];
        } else {
          pref_name = ingrdnt_name;
        }
        // Add to the cache first
        add_to_cache(ingrdnt_name, pref_name);
        resolve(pref_name);
      });
    }
  });
}

const product_ingrdnts = [
  /*
  "Dicalcium Phosphate Dihydrate",
  "Purified Water",
  "Sorbitol",
  "Glycerin",
  "Sodium Lauryl Sulphate",
  "Hydroxyethylcellulose",
  "Magnesium Aluminium Silicate",
  "Propolis",
  "Mentha Piperita Oil",
  "Menthol",
  "Sodium Saccharin",
  "Potassium Sorbate",
  "Sodium Monofluorophosphate",
  "Potassium Nitrate"
  //*/
  //
  //

  "white sugar",
  "sodium",
  "butter",
  "Vitamin D",
  "azelaic acid",
  "gluconolactone",
  "maltodextrin",
  "vanillic acid",
  "gelatin",
  "caramel",
  "Malt Extract",
  "soy lecithin",
  "sodium citrate",
  "caprylic acid"
  //
];

// Check a list of preferred names against the database
async function get_pref_name_list(product_ingrdnts) {
  let pref_ingrdnts_list = [];

  for (let i = 0; i < product_ingrdnts.length; i++) {
    // Fully wait for one preferred name to be found
    let pref_name = await get_pref_name(product_ingrdnts[i]);
    pref_ingrdnts_list.push(pref_name);
  }
  // Resolve when all names found
  return pref_ingrdnts_list;
}

function get_ingrdnts_dic(product_pref_ingrdnts) {
  let ingrdnt_des = {};
  for (let i = 0; i < product_pref_ingrdnts.length; i++) {
    const index = product_pref_ingrdnts.indexOf(product_pref_ingrdnts[i]);
    const ingrdnt_name = product_ingrdnts[index];
    ingrdnt_des[ingrdnt_name] = get_description(product_pref_ingrdnts[i]);
  }
  return ingrdnt_des;
}

let categories_list = {};
let product_pref_ingrdnts = [];

function get_results(product_ingrdnts, n) {
  return get_pref_name_list(product_ingrdnts).then(pref_ingrdnts_list => {
    product_pref_ingrdnts = pref_ingrdnts_list;
    get_all_categories(product_pref_ingrdnts);
    const categories_dic = populate_categories(
      product_ingrdnts,
      product_pref_ingrdnts,
      n
    );
    const ingrdnts_dic = get_ingrdnts_dic(product_pref_ingrdnts);
    return {
      categories: categories_dic,
      ingredients: ingrdnts_dic
    };
  });
}

/*
get_results() takes 2 parameters:
product_ingrdnts - a list of strings containing ingredient names, as provided by OCR
n - the number of categories to sort ingredients into
get_results() returns a dictionary in the form:
{
 ingredients : {...} - a dict mapping ingredient names to descriptions, provided by Drugbank
  categories : {...} - the ingredient names mapped by categories, also provided by Drugbank
}
*/

get_results(product_ingrdnts, 10).then(dic => {
  console.log(dic);
  /*var jsonContent = JSON.stringify(dic);
  console.log(jsonContent);

  fs.writeFile("toothpaste.json", jsonContent, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });*/

  //console.log(product_pref_ingrdnts);*/
  /*
  var jsonContent = JSON.stringify(product_ingrdnts);
  fs.writeFile("candy_ingredient_array.json", jsonContent, "utf8", function(
    err
  ) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });*/
});
