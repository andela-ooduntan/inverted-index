//A test suit that "Read book data".
//  -it checks 

var indexObj= new invertedIndex();
indexObj.createIndex('books.json');

describe('Read book data', function () {
  // body...
  it('Reads the JSON file and asserts that it is not empty.',function () {
    // body...
    expect(indexObj.isJsonEmpty).toBe(false);
  });
  

});