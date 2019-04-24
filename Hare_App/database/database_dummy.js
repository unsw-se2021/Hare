const ingredients = {
    Preservatives: [
      {
        name: "Salt",
        desc: "I like salt"
      }
    ],
    Sweeteners: [
      {
        name: "Sucrose",
        desc: "I like sucrose"
      }
    ]
  };
  
  // product cache for demo
  let product_cache = {};
  let product_cache_id = 2;
  
  function check_login(username, password) {
    return new Promise((resolve, reject) => {
      if (username === "Julie" && password === "password") {
        resolve(true);
      } else {
        reject("Invalid username / password");
      }
    });
  }
  
  function add_user(username, useremail, password) {
    return new Promise(resolve => resolve());
  }
  
  function get_uid_by_username(username) {
    return new Promise((resolve, reject) => {
      if (username === "Julie") {
        resolve("Julie");
      } else {
        reject("Unknown user");
      }
    });
  }
  
  function get_username_by_uid(uid) {
    return new Promise((resolve, reject) => {
      if (uid === "Julie") {
        resolve("Julie");
      } else {
        reject("Unkown user");
      }
    });
  }
  
  function get_useremail_by_uid(uid) {
    return new Promise((resolve, reject) => {
      if (uid === "Julie") {
        resolve("Julie@google.com");
      } else {
        reject("Unknown user");
      }
    });
  }
  
  function get_saved_products_by_uid(uid) {
    return new Promise((resolve, reject) => {
      if (uid === "Julie") {
        resolve([0].concat(Object.keys(product_cache)));
      } else {
        reject("Unknown user");
      }
    });
  }
  
  function get_product_by_pid(uid, pid) {
    return new Promise((resolve, reject) => {
      if (uid === "Julie") {
        if (pid === 0) {
          resolve({
            product_id: 0,
            owner: "Julie",
            img_url: "example.jpg",
            contents: ingredients
          });
        } else if (pid in product_cache) {
          resolve(product_cache[pid]);
        } else {
          reject("Unknown product");
        }
      } else if (pid in product_cache) {
        resolve(product_cache[pid]);
      } else {
        reject("Unknown user");
      }
    });
  }
  
  function get_preferences_by_uid(uid) {
    return new Promise((resolve, reject) => {
      if (uid === "Julie") {
        resolve({
          special: [
            {
              ingredient: "Sucrose",
              color: 1
            },
            {
              ingredient: "Salt",
              color: 2
            }
          ],
          categories: [
            {
              category: "Allergens",
              color: 1
            }
          ]
        });
      } else {
        reject("Unknown user");
      }
    });
  }
  
  function add_new_product(owner, product, image) {
    return new Promise(resolve => {
      product_cache[product_cache_id] = {
        product_id: product_cache_id,
        owner: owner,
        img_url: image,
        contents: product
      };
  
      product_cache_id++;
  
      resolve(product_cache_id - 1);
    });
  }
  
  function delete_product(pid) {
    return new Promise(resolve => resolve());
  }
  
  function update_preferences(uid, prefs) {
    return new Promise(resolve => resolve());
  }
  
  function db_connect() {
    return new Promise(resolve => resolve());
  }
  
  module.exports = {
    check_login: check_login,
    add_user: add_user,
    get_uid_by_username: get_uid_by_username,
    get_username_by_uid: get_username_by_uid,
    get_useremail_by_uid: get_useremail_by_uid,
    get_saved_products_by_uid: get_saved_products_by_uid,
    get_product_by_pid: get_product_by_pid,
    get_preferences_by_uid: get_preferences_by_uid,
    add_new_product: add_new_product,
    delete_product: delete_product,
    update_preferences: update_preferences,
    db_connect: db_connect
  };
