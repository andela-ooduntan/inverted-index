'use strict';
// Creates an instace of invertedIndex
var indexObj = new InvertedIndex();
// Runs the createIndex before every spec.
beforeEach(function(done) {
  indexObj.createIndex('books.json', done);
});

describe('Read book data', function() {

  it('Reads the JSON file and asserts that it is not empty.', function() {
    // This spec checks if the JSON object is empty.
    expect(Object.keys(indexObj.bookObject).length).toBeGreaterThan(0);
  });

  it('verifies that the JSON file contains a JSON object', function() {
    // This spec checks if the JSON object is an object.
    expect(typeof indexObj.bookObject).toBe('object');
  });

  it('verifies that the title of the first object property in' +
    ' the array is of type string',
    function() {
      // This spec checks if the JSON object is an object.
      expect(typeof indexObj.bookObject[0].title).toBe('string');
    });
});

describe('Populate Index', function() {

  it('Verifies the index is created once the file is read', function() {
    // Checks if the index have been created
    expect(Object.keys(indexObj.getIndex(indexObj.bookObject)).length)
      .toBeGreaterThan(0);
  });

  it('Verifies the index maps the string keys to the correct ' +
    'objects in the JSON array',
    function() {
      expect(indexObj.dictionary.wonderland).toEqual([
        [0, 'TL', 9]
      ]);
    });

  it('Verifies the index maps the string keys to the correct objects ' +
    'in the JSON array',
    function() {
      // Checks if the index key maps to the correct object and
      // position in the JSON array
      expect(indexObj.dictionary.alice).toEqual([
        [0, 'TL', 0],
        [0, 'TX', 0],
      ]);
    });

  it('Verifies the index maps the string keys to the correct ' +
    'objects in the JSON array',
    function() {
      // Checks if the index key maps to the correct object and
      // position in the JSON array
      expect(indexObj.dictionary.ring).toEqual([
        [1, 'TL', 44],
        [1, 'TX', 82],
      ]);
    });
});

describe('Search index', function() {

  it('verifies that searching the index returns an array of the indices' +
    ' of the correct objects that contain the words in the search query',
    function() {
      expect
        (indexObj.searchIndex('alice')).toEqual([
          [
            [0, 'TL', 0],
            [0, 'TX', 0],
          ]
        ]);
    });

  it('verifies that searching the index returns an array empty array ' +
    'when searched with words not in the index',
    function() {
      // Verifies if searching the index returns an array of the indices
      // of the correct objects that contain the words in the search query.
      expect(indexObj.searchIndex('checkpoint')).toEqual([
        []
      ]);

    });

  it('Ensure searchIndex can handle a varied number of ' +
    'search terms as arguments.',
    function() {
      // Checks if search can handle varying number of arguments
      expect(indexObj.searchIndex('segun', 'tobi', 'wonderland')).toEqual([
        [],
        [],
        [
          [0, 'TL', 9]
        ],
      ]);

    });

  it('Ensure searchIndex can handle a more complex search ' +
    'terms as arguments.',
    function() {
      // Checks if search can handle more complex arguments.
      var testData = ['Rings', 'Yemi', ['in', 'fall']];
      expect(indexObj.searchIndex(testData, 'yemi', 'stephen'))
        .toEqual([
          [
            [1, 'TL', 16]
          ],
          [],
          [
            [0, 'TL', 6]
          ],
          [],
          [],
          [],
        ]);

    });

  it('Ensure searchIndex can handle a sentence as arguments.', function() {
    // Checks if search can handle a sentences
    expect(indexObj.searchIndex('ALice in wonderland.', 'this is Home elf.'))
      .toEqual([
        [
          [0, 'TL', 0],
          [0, 'TX', 0]
        ],
        [
          [0, 'TL', 6]
        ],
        [
          [0, 'TL', 9]
        ],
        [],
        [],
        [],
        [
          [1, 'TX', 27]
        ],
      ]);
  });
});
