//A test suit that "Read book data".
//  -it checks 
var indexObj= new invertedIndex();
beforeEach(function (done){
  indexObj.createIndex('books.json',done);
  //done();
});


describe('Read book data', function () {
  // body...
  it('Reads the JSON file and asserts that it is not empty.',function () {
    // body...
    expect(indexObj.isJsonEmpty()).toBe(false);
  });
  it('verifies that the title of the first object property in the array is of type string', function() {
    expect(typeof indexObj.bookObject[0].title).toBe('string');
  });
  it('verifies that the text of the first object property in the array is of type string', function() {
    expect(typeof indexObj.bookObject[0].text).toBe('string');
  });
  it('verifies that the title of the second object property in the array is of type string', function() {
    expect(typeof indexObj.bookObject[1].title).toBe('string');
  });
  it('verifies that the text of the second object property in the array is of type string', function() {
    expect(typeof indexObj.bookObject[1].text).toBe('string');
  });

  describe('Populate Index',function() {
    // body...
    it('Verifies the index is created once the file is read', function () {
      expect(indexObj.getIndex()).toEqual([])
    });
  });
  

});