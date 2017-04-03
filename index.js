var Configuration = {
    wrapInCDATA: true,
    feedStart: '<?xml version="1.0"?><rss version="2.0">',
    feedEnd: '</rss>',
    channelStartTag: '<channel>',
    channelEndTag: '</channel>',
    itemStartTag: '<item>',
    itemEndTag: '</item>',
    validChannelProperties: ['title', 'description', 'link', 'pubDate', 'lastBuildDate', 'language'],
    validItemProperties: ['title', 'description', 'link', 'pubDate', 'guid', 'author'],
};

function wrapInCDATA(content) {
    return '<![CDATA[' + content + ']]>';
}

function wrapInTag(tagName, content) {
    content = Configuration.wrapInCDATA ? wrapInCDATA(content) : content;
    return '<' + tagName + '>' + content + '</' + tagName + '>'
}

class Item {
    _toXML() {
        var content = Configuration.itemStartTag;
        for (var k in this) {
            if (Configuration.validItemProperties.indexOf(k) != -1) {
                content += wrapInTag(k, this[k]);
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
                content += wrapInTag(k, this[k]);
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