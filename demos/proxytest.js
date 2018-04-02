let t = {
  age: 19,
  name: 'laoma'
};

let px = new Proxy(t, {
  get: function(target, propKey) {
    // console.log(propKey);
    if (propKey == 'age') {
      return target.name;
    } else {
      return target.age;
    }
  }
});

console.log(px.age, px.ssss, px.sdsf);
