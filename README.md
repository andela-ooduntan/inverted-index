## inverted-index

Inverted Index is form of elastic search that is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Code Example

var invertedObject = new InvertedIndex();

To create an index of a JSON file
invertedObject.createIndex('documentName.json');

To search the index
invertedObject.searchIndex('Your search term');
invertedObject.searchIndex(['Your','search','term']);
invertedObject.searchIndex(['Your','search'['more','search','term'],'term'],'even','more');

## Tests

Run the SpecRunner.html on your sever.


## Contributors

You can fork and contribute/improve this project by submitting a pull request.


## License

The source code is open-sourced software licensed under the [MIT license](LICENSE.md)
