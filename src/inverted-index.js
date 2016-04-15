var invertedIndex = function () {
    this.dictionary = {};
    this.stopingWords = ['an','of','and','in','the','a'];
}
invertedIndex.prototype = {
    createIndex : function (filepath,callback) {
      var parentProp=this;
    this.readJSONfile(filepath,function (jsonData) {
      // body...
      parentProp.getIndex(jsonData);
      
      callback(jsonData);
    });
            
    },
    readJSONfile:function (filepath,callback) {
      // body...
    var that = this;
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      //for old browser
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200 ) {
          that.bookObject = JSON.parse(xmlhttp.responseText);
          //done()
          callback(that.bookObject);
        } else {
          console.error('An error has occured making the request');
          return false;
        }
      }
    };
    //console.log(that.bookObject)
    xmlhttp.open('GET', filepath, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
    },
  isJsonEmpty: function (){
    //console.log (this.bookObject);
    return Object.keys(this.bookObject).length === 0;
  },
  getIndex : function (bookObject) {
    // body...
    var parentObj = this;
    //console.log(bookObject)
    bookObject.forEach(function (value, index) {
      // body...
      var purifiedTitle = parentObj.purifyString(value.title);
      parentObj.populateDictionary(purifiedTitle,'TL', index);
      var purifiedText = parentObj.purifyString(value.text);
      parentObj.populateDictionary(purifiedText,'TX',index);

    });
    return parentObj.dictionary
  },
  populateDictionary: function (wordsArray,location,index) {
    // body...
    var parentObj = this;
    var space = 0;
    //console.log(wordsArray);
          wordsArray.forEach(function (titleString,arrayIndex) {
        // body...
        if (arrayIndex !== 0 ) {
          prevWordPos = arrayIndex-1;
          space+=wordsArray[prevWordPos].length+1;
        }else{
          prevWordPos = false;
        }

        if (prevWordPos !== false) {
          var result = [index,[location,space]];
        }else{
          var result = [index,[location,0]];
        }
        //console.log(result[1][0]);
       if (parentObj.dictionary.hasOwnProperty(titleString)  && parentObj.checkIfWordExist(parentObj.dictionary[titleString],result)) {
          parentObj.dictionary[titleString].push(result);
        
        } else {
          parentObj.dictionary[titleString] = [result];
       //  //let result = [index]; && [index] === parentObj.dictionary[titleString]
       //  console.log(parentObj.dictionary[titleString]);
       //  parentObj.dictionary[titleString].push(index);
        }
      });
  },
  checkIfWordExist : function (array,searchTerm) {
    // body...
    var wordExisted=false;
    for (var counter = 0; counter < array.length;  counter++) {
      // body...
      //console.log(searchTerm[1][0]);
      //console.log(value[1][0]);
      if ( array[counter].join() === searchTerm.join() ) {
        wordExisted = true;
        break;
      }
    }
    if ( wordExisted ) {
      return false;
    } else {
      return true;
    }
  },
  purifyString : function (allWordString) {
    let textString = allWordString.toLowerCase().replace(/(\.|\,|\:|\;|\-)/g, '').split(/\s/);
    return textString;
  },
  searchIndex : function () {
    // body...
    var args = Object.keys(arguments).length;
    var searchResult = []
    for (var i = 0; i < arguments.length; i++) {
      
      if (this.dictionary[arguments[i]]) {
        searchResult.push(this.dictionary[arguments[i]]);
      }
    }
    //console.log()
    return searchResult;
  } 
}