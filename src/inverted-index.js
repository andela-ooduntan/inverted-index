var invertedIndex = function () {
    this.dictionary = {};
    this.stopingWords = ['an','of','and','in','the','a'];
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
    let parentObj = this;
    this.bookObject.forEach(function (value, index) {
      // body...
      var purifiedWords = parentObj.purifyString(value);
      purifiedWords.forEach(function (titleString,arrayIndex) {
        // body...
       if (parentObj.dictionary.hasOwnProperty(titleString)) {
        //let result = [index];
        parentObj.dictionary[titleString].push(index);
        } else {
          parentObj.dictionary[titleString] = [index];
       //  //let result = [index]; && [index] === parentObj.dictionary[titleString]
       //  console.log(parentObj.dictionary[titleString]);
       //  parentObj.dictionary[titleString].push(index);
        }
      });

    });
    return parentObj.dictionary
  },
  purifyString : function (value) {
    var allWordString = value.text +' '+ value.title;
    let textString = allWordString.toLowerCase().replace(/(\.|\,|\:|\;|\-)/g, '').split(/\s/);
    return textString;
  } 
}