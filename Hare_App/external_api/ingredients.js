const fs = require("fs");
const https = require("https");
const ingrdnt_collection = JSON.parse(fs.readFileSync("res/drugbank.json"));
let cache = JSON.parse(fs.readFileSync("res/preferred_cache.json"));

let all_categories = {};
Object.keys(ingrdnt_collection).forEach(ingredient => {
  ingrdnt_collection[ingredient].categories.forEach(category => {
    if (!all_categories[category]) {
      all_categories[category] = 1;
    } else {
      all_categories[category]++;
    }
  });
});

let all_categories_sorted = Object.keys(all_categories);
all_categories_sorted.sort((a, b) => {
  return all_categories[b] - all_categories[a];
});

function get_highlighted_ingredients_names(highlighted_ingredients) {
  let list = [];
  for (let i = 0; i < highlighted_ingredients.length; i++) {
    list.push(highlighted_ingredients[i].ingredient);
  }
  return list;
}

function get_highlighted_categories_names(highlighted_categories) {
  let list = [];
  for (let i = 0; i < highlighted_categories.length; i++) {
    list.push(highlighted_categories[i].category);
  }
  return list;
}

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
  fs.writeFileSync("res/preferred_cache.json", JSON.stringify(cache));
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
function get_Ingrdnt_from_drugbank(pref_name, product_ingrdnts) {
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

function get_description(pref_name, product_ingrdnts) {
  const ingrdnt = get_Ingrdnt_from_drugbank(pref_name, product_ingrdnts);
  if (ingrdnt)
    return get_Ingrdnt_from_drugbank(pref_name, product_ingrdnts).desc;
  return null;
}

//get all categories from ingredients
function get_all_categories(product_ingrdnts, product_pref_ingrdnts) {
  for (let j = 0; j < product_pref_ingrdnts.length; j++) {
    const ingrdnt = get_Ingrdnt_from_drugbank(
      product_pref_ingrdnts[j],
      product_ingrdnts
    );
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
    if (
      keys[i].toLowerCase().includes(pref_name) ||
      pref_name.toLowerCase().includes(keys[i])
    ) {
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
function populate_categories(
  product_ingrdnts,
  product_pref_ingrdnts,
  highlighted_categories_names,
  n
) {
  let categories_list = pick_top_n_categories(n);
  //push hilighting categories to defalt list
  for (let i = 0; i < highlighted_categories_names.length; i++) {
    if (!categories_list.includes(highlighted_categories_names[i]))
      categories_list.push(highlighted_categories_names[i]);
  }
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
  //for not found
  for (let i = 0; i < product_ingrdnts.length; i++) {
    if (!marked[i]) {
      const pref_name = product_pref_ingrdnts[i];
      const ingrdnt = get_Ingrdnt_from_drugbank(pref_name, product_ingrdnts);
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

  //delete categories which is empty
  for (let key in categories) {
    if (categories[key].length == 0) {
      delete categories[key];
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

function get_ingrdnts_dic(product_ingrdnts, product_pref_ingrdnts) {
  let ingrdnt_des = {};
  for (let i = 0; i < product_pref_ingrdnts.length; i++) {
    const index = product_pref_ingrdnts.indexOf(
      product_pref_ingrdnts[i],
      product_ingrdnts
    );
    const ingrdnt_name = product_ingrdnts[index];
    ingrdnt_des[ingrdnt_name] = get_description(
      product_pref_ingrdnts[i],
      product_ingrdnts
    );
  }
  return ingrdnt_des;
}

let categories_list = {};
let product_pref_ingrdnts = [];

function check_highlighting_ingredients(
  pref_product_ingredients,
  pref_highlight_ingredients,
  highlighted_ingredients
) {
  let list_index = [];
  let list = [];
  for (let i = 0; i < pref_product_ingredients.length; i++) {
    for (let j = 0; j < pref_highlight_ingredients.length; j++) {
      let nameJ = pref_highlight_ingredients[j].toLowerCase();
      let nameI = pref_product_ingredients[i].toLowerCase();
      if (nameJ.includes(nameI) || nameI.includes(nameJ)) list_index.push(j);
    }
  }
  console.log(list_index);
  for (let i = 0; i < list_index.length; i++) {
    list.push(highlighted_ingredients[list_index[i]].ingredient);
  }

  return list;
}

function get_results(
  product_ingrdnts,
  highlighted_ingredients,
  highlighted_categories,
  n
) {
  let highlighted_ingredients_names = get_highlighted_ingredients_names(
    highlighted_ingredients
  );
  let highlighted_categories_names = get_highlighted_categories_names(
    highlighted_categories
  );
  return get_pref_name_list(product_ingrdnts).then(pref_ingrdnts_list => {
    product_pref_ingrdnts = pref_ingrdnts_list;
    return get_pref_name_list(highlighted_ingredients_names)
      .then(pref_highlighted_list => {
        const alarm_ingredients = check_highlighting_ingredients(
          product_pref_ingrdnts,
          pref_highlighted_list,
          highlighted_ingredients
        );

        get_all_categories(product_ingrdnts, product_pref_ingrdnts);
        const categories_dic = populate_categories(
          product_ingrdnts,
          product_pref_ingrdnts,
          highlighted_categories_names,
          n
        );
        const ingrdnts_dic = get_ingrdnts_dic(
          product_ingrdnts,
          product_pref_ingrdnts
        );
        return {
          alarm_ingredients: alarm_ingredients,
          categories: categories_dic,
          ingredients: ingrdnts_dic
        };
      })
      .catch(e => {
        console.log(e);
      });
  });
}

/*
get_results() takes 3 parameters:
product_ingrdnts - a list of strings containing ingredient names, as provided by OCR
highlighted_ingredients
highlighted_categories
n - the number of categories to sort ingredients into
get_results() returns a dictionary in the form:
{
 ingredients : {...} - a dict mapping ingredient names to descriptions, provided by Drugbank
  categories : {...} - the ingredient names mapped by categories, also provided by Drugbank
}
*/

module.exports = {
  get_results: get_results,
  get_ingredients: () => {
    return Object.keys(ingrdnt_collection);
  },
  get_categories: () => {
    return all_categories_sorted;
  }
};
