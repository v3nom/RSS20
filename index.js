var Configuration = {
    feedStart: '<?xml version="1.0"?><rss version="2.0">',
    feedEnd: '</rss>',
    channelStartTag: '<channel>',
    channelEndTag: '</channel>',
    itemStartTag: '<item>',
    itemEndTag: '</item>',
    validChannelProperties: ['title', 'description', 'link', 'pubDate', 'lastBuildDate', 'language'],
    validItemProperties: ['title', 'description','link','pubDate','guid','author'],
};

class Item {
    _toXML() {
        var content = Configuration.itemStartTag;
        for (var k in this) {
            if (Configuration.validItemProperties.indexOf(k) != -1) {
                content += '<' + k + '>' + this[k] + '</' + k + '>';
            }
        }
        return content + Configuration.itemEndTag;
    }
}

class Feed {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    _toXML() {
        var content = Configuration.channelStartTag;
        for (var k in this) {
            if (Configuration.validChannelProperties.indexOf(k) != -1) {
                content += '<' + k + '>' + this[k] + '</' + k + '>';
            }
        }
        this.items.forEach((i) => {
            content += i._toXML();
        });
        return content + Configuration.channelEndTag;
    }

    getXML() {
        return Configuration.feedStart + this._toXML() + Configuration.feedEnd;
    }
}

exports.Feed = Feed;
exports.Item = Item;
exports.Configuration = Configuration;