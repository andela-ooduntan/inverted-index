//A test suit that "Read book data".
//  -it checks 
var indexObj= new invertedIndex();
var bookObject;
beforeEach(function (done){
  indexObj.createIndex('books.json',function (parsedBookObject) {
    // body...
    bookObject = parsedBookObject;
    done() 
  });
  //done();
  //console.log(indexObj.bookObject)
});


describe('Read book data', function () {
  // body...
  it('Reads the JSON file and asserts that it is not empty.',function () {
    // body...
    //console.log(indexObj.stopingWords);
    expect(indexObj.isJsonEmpty()).not.toBeTruthy();
  });
  it('verifies that the JSON file contains a JSON object', function() {
    expect(typeof bookObject).toBe('object');
  });

  it('verifies that the title of the first object property in the array is of type string', function() {
    expect(typeof bookObject[0].title).toBe('string');
  });

  it('verifies that the text of the first object property in the array is of type string', function() {
    expect(typeof bookObject[0].text).toBe('string');
  });
  it('verifies that the title of the second object property in the array is of type string', function() {
    expect(typeof bookObject[1].title).toBe('string');
  });
  it('verifies that the text of the second object property in the array is of type string', function() {
    expect(typeof bookObject[1].text).toBe('string');
  });

  describe('Populate Index',function() {
    // body...
    
    it('Verifies the index is created once the file is read', function () {
      //console.log(bookObject)
      expect(Object.keys(indexObj.getIndex(bookObject)).length).toBeGreaterThan(0);
    });


    it('Verifies the index maps the string keys to the correct objects in the JSON array', function () {
      //indexObj.getIndex()
      expect(indexObj.dictionary.wonderland).toEqual([[0,['TL',9]]]);
    });

    it('Verifies the index maps the string keys to the correct objects in the JSON array', function () {
      expect(indexObj.dictionary.alice).toEqual([[0,['TL',0]],[0,['TX',0]]]);
    });

    it('Verifies the index maps the string keys to the correct objects in the JSON array', function () {
      console.log(indexObj);
      expect(indexObj.dictionary.ring).toEqual([ [ 1, [ 'TL', 16 ] ], [ 1, [ 'TL', 44 ] ], [ 1, [ 'TX', 82 ] ] ]);
    });
  });
  
  describe('Search index',function () {
    // body...
    it('verifies that searching the index returns an array of the indices of the correct objects that contain the words in the search query',function () {
      // body...
      expect(indexObj.searchIndex('alice')).toEqual([ [ [ 0, [ 'TL', 0 ] ], [ 0, [ 'TX', 0 ] ] ] ] )

    })

    it('verifies that searching the index returns an array empty array when searched with words not in the index',function () {
      // body...
      expect( indexObj.searchIndex('segun')).toEqual([[]])

    })
     it('verifies that searching the index returns an array empty array when searched with words not in the index',function () {
      // body...
      expect(indexObj.searchIndex('segun','tobi','wonderland')).toEqual([ 
                  [  ], 
                  [  ], 
                  [ [ 0, [ 'TL', 9 ] ] ]
                 ])

    })
    it('verifies that searching the index returns an array empty array when searched with words not in the index',function () {
      // body...
      expect(indexObj.searchIndex(['Rings','Yemi'],'yemi')).toEqual([ [ [ 1, [ 'TL', 16 ] ], [ 1, [ 'TL', 44 ] ], [ 1, [ 'TX', 82 ] ] ], [  ], [  ] ] )

    })
  })

});