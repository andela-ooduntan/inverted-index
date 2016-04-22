## inverted-index

Inverted Index is form of elastic search that is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

## Code Example

```javascript
var invertedObject = new InvertedIndex();
```

To create an index of a JSON file
```java
invertedObject.createIndex('documentName.json');
```

To search the index of the file.

```javascript
invertedObject.searchIndex('Your search term');
invertedObject.searchIndex(['Your', 'search', 'term']);
invertedObject.searchIndex(['Your', 'search', ['more', 'search', 'term'], 'term'], 'even', 'more');
```
## Installation
1.  Download and install [**Node JS**](https://nodejs.org/en/) if not already installed.  
1.  Run `npm install -g http-server` on the terminal.
1.  Clone [**this repository**](https://github.com/andela-ooduntan/inverted-index.git) or go to the project github page [**here**](https://github.com/andela-ooduntan/inverted-index/) and download the zip file of the project. Unzip it.



## Tests
Run `http-server -c-1` on your terminal while within the **project root directory**.    
Navigate to `http://127.0.0.1:8080/jasmine/SpecRunner.html` on your browser to run **jasmine tests**. 


## Contributors

You can fork and contribute/improve this project by submitting a pull request.


## License

The source code is open-sourced software licensed under the [MIT license](LICENSE.md)
