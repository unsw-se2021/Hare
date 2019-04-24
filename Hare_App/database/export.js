const get = require(__dirname + "/get");
const edit = require(__dirname + "/edit");

module.exports = {
  get_userdata: get.get_userdata,
  update_userdata: edit.update_userdata
}
