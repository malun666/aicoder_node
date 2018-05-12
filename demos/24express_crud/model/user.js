module.exports = class User {
  get id() {
    return this._id;
  }
  set id(val) {
    return this._id = parseInt(val);
  }
}
