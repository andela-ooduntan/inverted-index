'use strict';

/**
 * The invertedInedx class.
*/
class InvertedIndex {
  constructor() {
    this.dictionary = {};
    this.searchResult = [];
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  // Creates the JSON object from the JSON file {filepath} and 
  // sends the JSON object to the callback function. 
  createIndex(filepath, callback) {
    // FIXME: shouldn't save references to this
    var _this = this;
    // Call the function that read the JSON file asyn. 
    this.readJSONfile(filepath, function(jsonData) {
      // Call the function that helps create the index of the file 
      _this.getIndex(jsonData);
      callback();
    });
          
  }

  // Reads the JSON file async.
  readJSONfile(filepath, callback) {
    var xmlhttp = null;

    // Checking if the browser have a built-in XMLHttpRequest object.
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      // For browser that don't support XMLHttpRequest 
      xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          this.bookObject = JSON.parse(xmlhttp.responseText);
          callback(this.bookObject);
        } 
    }.bind(this);

    xmlhttp.open('GET', filepath, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send();
  }

  /**
   * Creates an index of the sentence of the JSON object passed to it. 
   * @param  {JSON Object} The document JSON object 
   * @return {JSON Object} Then index of the document.
  */
  getIndex(bookObject) {
    bookObject.forEach((value, index) => {
      // Analyses the document by tokenization and normalization. 
      var purifiedTitle = this.purifyString(value.title);
      var purifiedText = this.purifyString(value.text);

      purifiedTitle = this.splitSentence(purifiedTitle);
      purifiedText = this.splitSentence(purifiedText);
      this.populateDictionary(purifiedTitle, 'TL', index);
      this.populateDictionary(purifiedText, 'TX', index );
    });

    return this.dictionary;
  }

    /**
   * Add words to the dictionary object.
   * @param  {Array} An array of words to be indexed.
   * @param  {String} The location of the words in the doc. 
   * TX for text and TL for title.
   * @param  {Int} The position of the words in the JSON object.
   */
  populateDictionary(wordsArray, location, index) {
    this.stringPosition = 0;

    wordsArray.forEach((eachString, arrayIndex) => {
      // Finds the location of the word in the doc. 
      var wordIndex = this.findWordIndex(arrayIndex, wordsArray, index, location);
      var wordProperty = this.dictionary[eachString];
      var checkProperty = this.dictionary.hasOwnProperty(eachString);

      // Checks if the word exist in the index. 
      if (checkProperty && this.checkIfWordExist(wordProperty, wordIndex)) {
        this.dictionary[eachString].push(wordIndex);
      } else {
        this.dictionary[eachString] = [wordIndex];       
      }
    });
  }

    /**
   * @param  {Int} The position of the word in the array after tokenization
   * @param  {Array} The tokenized sentence.
   * @param  {Int} The position of the sentence in the JSON object.
   * @param  {String} The property location of the word in the JSON object. 
   * TX for text or TL for title.
   * @return {Array} An array of the exact location of the word in the  
   * JSON object. e.g [0,TX,12] '0' means the word is in the first JSON object and
   * 'TX' means the word is in the 'text' property and '12' is the word position in the doc.
   */
  findWordIndex(positionInArray, wordsArray, positionInDoc, locationInDoc) {
    var wordLocation = null;

    if (positionInArray) {
      this.stringPosition += wordsArray[positionInArray - 1].length + 1;
      wordLocation = [positionInDoc,locationInDoc,this.stringPosition];
    } else {
      wordLocation = [positionInDoc,locationInDoc,0];
    }

    return wordLocation;
  }

    /**
   * Checks if a word exist in the index.
   * @param  {Array} The location of previous words in the index
   * @param  {Array} The location of the queried word.
   * @return {Boolean} True if word exist and otherwise false.
   */
  checkIfWordExist(array, searchTerm) {
    for (var counter = 0; counter < array.length;  counter++) {
      if (array[counter].join() === searchTerm.join()) {
        return false;
      }
    }

    return true;
  }

    /**
   * Removes all alphanumeric character from a string and change to lower case (Normalization).
   * @param  {String} The string to cleaned.
   * @return {String} The cleaned string.
   */
  purifyString(allWordString) {
    var exp = /[,";:?!@#$%(^)&*()_+|.><{}±=-]/g;
    return allWordString.toLowerCase().replace(exp, '');
  }

  /**
   * Splits a sentence into an array (Tokenization)
   * @param  {String}
   * @return {Array}
   */
  splitSentence(sentence) {
    return sentence.split(/\s/);
  }

  /**
   * Searches the index and pushes the result into searchResult property.
   * @param  {Mixed} The argument can either be an array or a String.
   */
  getSearchResult(searchTerm) {
    // Checks if the search term is an array. 
    if (searchTerm instanceof Array) {
      // Loops through an array of search term. 
      searchTerm.forEach(this.getSearchResult);

    } else {
      // Search term is a String 
      searchTerm = this.purifyString(searchTerm);

      // Checks if search term is a sentence. 
      if (this.splitSentence(searchTerm).length > 1) {
        // Searches each words in the sentence.
        this.getSearchResult(this.splitSentence(searchTerm));
      } else {
        // Search term is a word. 
        if (this.dictionary[searchTerm]) {
          this.searchResult.push(this.dictionary[searchTerm]);
        } else {
          // Pushes an empty array for words not in the index.
          this.searchResult.push([]);
        }
      }
    }
  }

  /**
   * Searches for the index for a match with the search term.
   * @return {Array} [Returns the location of the match found in an array]
   */
  searchIndex() {
    this.searchResult = [];
    var argumentArray = Object.keys(arguments);

    argumentArray.forEach((argumentsKey) => {
      // Checks if the search term is an array. 
      if (arguments[argumentsKey] instanceof Array) {
        arguments[argumentsKey].forEach(this.getSearchResult);
      } else {
        // Checks if the search term is a sentence. 
        if (this.splitSentence(arguments[argumentsKey]).length > 1) {
          this.getSearchResult(this.splitSentence(arguments[argumentsKey]));
        } else {
         this.getSearchResult(arguments[argumentsKey]);
        }
      }
    });

    return this.searchResult;
  }
}
