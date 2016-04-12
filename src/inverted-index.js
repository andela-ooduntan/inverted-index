var invertedIndex = function () {
    this.dictionary = {};
    this.stopingWords = ['an','of','and','in','the'];
    this.bookObject;
}
invertedIndex.prototype = {
    createIndex : function (filepath,done) {
    //this.readJSONfile(filepath);
    var that = this;
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      //for old browser
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200 ) {
          that.bookObject = JSON.parse(xmlhttp.responseText);
          done()
        } else {
          console.error('An error has occured making the request');
          return false;
        }
      }
    };

    xmlhttp.open('GET', filepath, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();        
    },
  isJsonEmpty: function (){
    //console.log (this.bookObject);
    return Object.keys(this.bookObject).length === 0;
  },
  getIndex : function () {
    // body...
    this.bookObject.forEach(function (value, index) {
      // body...
      var purifiedWords = this.purifyString(value);
      purifiedWords[0].forEach(function () {
        // body...
        if (dictionary.hasOwnProperty) {}
      });

    });

  },
  purifyString : function (value) {
    let textString = value.text.toLowerCase().replace(/(\.|\,|\:|\;|\-)/g, '').split(/\s/);
    let titleString = value.title.toLowerCase().replace(/(\.|\,|\:|\;|\-)/g, '').split(/\s/);
    return [titleString,textString];
  } 
}