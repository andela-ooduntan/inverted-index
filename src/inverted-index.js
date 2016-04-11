var invertedIndex = function () {
    this.dictionary = {};
    this.stopingWords = ['an','of','and',''];
    this.bookObject;
}
invertedIndex.prototype = {
    createIndex : function (filepath) {
    return this.readJSONfile(filepath,function (jsonContent) {
      // body...
      this.bookObject=jsonContent;
      console.log(jsonContent);
    });        
    },
    readJSONfile: function(filepath, callback) {
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
          that.jsonContent = JSON.parse(xmlhttp.responseText);
          callback(that.jsonContent);
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
    console.log (this.bookObject);
    return Object.keys(this.bookObject).length === 0;
  }
}