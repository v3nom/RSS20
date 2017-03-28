# RSS20

Simple RSS 2.0 feed generator

## Usage

```js
var RSS20 = require('rss20');
var fs = require('fs');

var Feed = RSS20.Feed;
var Item = RSS20.Item;

// If you want more tags on Channel
// RSS20.Configuration.validChannelProperties.push('generator');
// Item
// RSS20.Configuration.validItemProperties.push('category');
// Check supported tags: https://validator.w3.org/feed/docs/rss2.html

var feed = new Feed();
feed.title = 'FeedTitle';
feed.description = 'FeedDescription';
feed.link = 'http://feed.feed';
feed.pubDate = (new Date()).toGMTString();
feed.lastBuildDate = (new Date()).toGMTString();
feed.language = 'en';

var item1 = new Item();
item1.title = 'Item1Title';
item1.description = 'Item1Description';
item1.link = 'http://feed.feed/item1';
item1.pubDate = (new Date()).toGMTString();
item1.guid = 'http://feed.feed/item1';
item1.author = 'Tomas';
feed.addItem(item1);

fs.writeFileSync('test.xml', feed.getXML());
```