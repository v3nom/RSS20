var RSS20 = require('./index');
var fs = require('fs');

var Feed = RSS20.Feed;
var Item = RSS20.Item;

var feed = new Feed();
feed.title = 'FeedTitle';
feed.description = 'FeedDescription';

var item1 = new Item();
item1.title = 'Item1Title';
item1.description = 'Item1Description';
feed.addItem(item1);

fs.writeFileSync('test.xml', feed.getXML());
