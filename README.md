# Parse PHP to JSON
Convert PHP files into JSON file representations. Namespaces are structured as directories. To be used for building other applications that need to quickly and easily parse PHP source code.

### See Projects that use `parse-php-to-json`

* [Parse PHP to Markdown](https://www.npmjs.com/package/parse-php-to-md) - used for building GitHub project wikis (written in Node)
* [Render Docs](https://packagist.org/packages/pfaciana/render-docs) - web server that dynamically displays documentation for PHP srouce code (written in PHP)

## Example Use

```js
const parser = require('parse-php-to-json');

console.time();
parser({
    include: ['/some/path/to/src', '.php'],
    exclude: ['vendor',],
    dest: __dirname + '/json',
    encoding: 'utf-8',
    meta: {
        name: "Some Project",
        description: "Some long description..."
    },
}, function (toc, search) {
    // Callback when completed
    console.log(toc); // contents of the Table of Contents file
    console.log(search); // contents of the Search file
    console.log('Done!');
    console.timeEnd();
});

```