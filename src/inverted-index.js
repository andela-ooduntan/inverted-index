(function () {
   'use strict';
}());

/**
 * The constructor of invertedInedx.
 */
var invertedIndex = function () {
    this.dictionary = {};
    this.searchResult = [];
};
/* The properties of the invertedIndex object. */
invertedIndex.prototype = {
  // Creates the JSON object from the JSON file {filepath} and send the JSON object to the callback function
    createIndex : function ( filepath,callback ) {
      var parentProp = this;
      // Call the function that read the JSON file asyn.
    this.readJSONfile( filepath,function ( jsonData ) {
      //Call the function that helps create the index of the file
      parentProp.getIndex( jsonData );
      callback( jsonData );
    });
            
    },
    // Reads the JSON file async.
    readJSONfile : function ( filepath , callback ) {
    var parentProp = this;
    var xmlhttp;
    // Checking if the browser have a built-in XMLHttpRequest object.
    if ( window.XMLHttpRequest ) {
      xmlhttp = new XMLHttpRequest();
    } else {
      // For browser that don't support XMLHttpRequest
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200 ) {
          parentProp.bookObject = JSON.parse(xmlhttp.responseText);
          callback(parentProp.bookObject);
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
  /**
   * Creates an index of the sentence in the JSON object passed to it. 
   * @param  {JSON Object} The document JSON object 
   * @return {JSON Object} Then index of the document.
   */
  getIndex : function (bookObject) {

    var parentObj = this;

    bookObject.forEach( function (value, index) {
      /* Analysises the document by tokenization and normalization. */
      var purifiedTitle = parentObj.purifyString(value.title);
      purifiedTitle = parentObj.splitSentence(purifiedTitle);
      parentObj.populateDictionary(purifiedTitle,'TL', index);
      var purifiedText = parentObj.purifyString(value.text);
      purifiedText = parentObj.splitSentence(purifiedText);
      parentObj.populateDictionary(purifiedText,'TX',index);

    });

    return parentObj.dictionary;
  },
  /**
   * Add words to the dictionary object.
   * @param  {Array} An array of words to be indexed.
   * @param  {String} The location of the words in the doc. TX for text and TL for title.
   * @param  {Int} The position of the words in the JSON object.
   */
  populateDictionary: function ( wordsArray,location,index ) {

    var parentObj = this;
    parentObj.stringPosition = 0;
    

      wordsArray.forEach( function (titleString,arrayIndex) {
        /* Stemmed each word by removing trailing 's'. */ 
        titleString = parentObj.stemWord(titleString);
        /* Finds the location of the word in the doc. */
        var wordIndex = parentObj.findWordIndex(arrayIndex,wordsArray,index,location);
        /* Checks if the word exist in the index. */
        if ( parentObj.dictionary.hasOwnProperty(titleString) && parentObj.checkIfWordExist(parentObj.dictionary[titleString],wordIndex) ) {

          parentObj.dictionary[titleString].push(wordIndex);
    
        } else {

          parentObj.dictionary[titleString] = [wordIndex];       
        }
      });
  },
  /**
   * @param  {Int} The position of the word in the array after tokenization
   * @param  {Array} The tokenized sentence.
   * @param  {Int} The position of the sentence in the JSON object.
   * @param  {String} The property location of the word in the JSON object. TX for text or TL for title.
   * @return {Array} An array of the exact location of the word in the JSON object. 
   * e.g [0, [TX,12]] '0' means the word is in the first JSON object and 
   * 'TX' means the word is in the 'text' property and '12' means the word position in the doc. is 12.
   */
  findWordIndex : function (positionInArray,wordsArray,positionInDoc,locationInDoc) {
    var wordLocation = null;
    if ( positionInArray !== 0 ) {
          this.stringPosition += wordsArray[positionInArray-1].length+1;
        }
        if ( positionInArray-1 >= 0 ) {
           wordLocation = [positionInDoc,[locationInDoc,this.stringPosition]];
        }else{
           wordLocation = [positionInDoc,[locationInDoc,0]];
        }
        return wordLocation;
  },
  /**
   * Checks if a word exist in the index.
   * @param  {Array} The location of previous words in the index
   * @param  {Array} The location of the queried word.
   * @return {Boolean} True if word exist and otherwise false.
   */
  checkIfWordExist : function (array,searchTerm) {
    var wordExisted=false;

    for (var counter = 0; counter < array.length;  counter++) {
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
  /**
   * Removes all alphanumeric character from a string and change to lower case (Normalization).
   * @param  {String} The string to cleaned.
   * @return {String} The cleaned string.
   */
  purifyString : function ( allWordString ) {
    allWordString = allWordString.toLowerCase();
    allWordString = allWordString.replace(/[,";:?!@#$%(^)&*()_+|.><{}±=-]/g, '');
    return allWordString;
  },
  /**
   * Splits a sentence into an array (Tokenization)
   * @param  {String}
   * @return {Array}
   */
  splitSentence : function ( sentence ) {
    return sentence.split(/\s/);
  },
  /**
   * Searches the index and pushes the result into searchResult property.
   * @param  {Mixed} The argument can either be an array or a String.
   */
  getSearchResult : function ( searchTerm ) {
    /* Checks if the search term is an array. */
    if ( searchTerm instanceof Array ) {
      /* Loops through an array of search term. */
      searchTerm.forEach(function (value) {
        /* Search each element of an array of search term (Recursion). */
        parentObj.getSearchResult(value);
      }); 

    }else {
      /* Search term is a String */
      searchTerm = parentObj.purifyString(searchTerm);
      searchTerm = parentObj.stemWord(searchTerm);
      /* Checks if search term is a sentence. */
      if (parentObj.splitSentence(searchTerm).length > 1) {
        /* Searches each words in the sentence. */
        parentObj.getSearchResult(parentObj.splitSentence(searchTerm));
      } else {
        /* Search term is a word. */
        if ( parentObj.dictionary[searchTerm] ) {
          parentObj.searchResult.push(parentObj.dictionary[searchTerm]);
        } else {
          /* Pushes an empty array for words not in the index. */
          parentObj.searchResult.push([]);
        }
      }
    }
  },
  /**
   * Stems words to their root form. Works only with 'S' for now.
   * @param  {String} Word with trailing 'S'.
   * @return {String} Root form of word.
   */
  stemWord : function (word) {
    return word.replace(/[s\z]/,'');
  },
  /**
   * Searches for the index for a match with the search term.
   * @return {Array} [Returns the location of the match found in an array]
   */
  searchIndex : function () {

    parentObj = this;
    this.searchResult = [];
    
    for (var i = 0; i < arguments.length; i++) {
      /* Checks if the search term is an array. */
      if ( arguments[i] instanceof Array ) {
        arguments[i].forEach(this.getSearchResult);
      } else {
        /* Checks if the search term is a sentence. */
        if ( this.splitSentence(arguments[i]).length > 1 ) {
          this.getSearchResult(this.splitSentence(arguments[i]));
      } else {
         this.getSearchResult(this.purifyString(this.stemWord(arguments[i])));
       }
      }
    }

    return this.searchResult;
  } 
};