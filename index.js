var loaderUtils = require("loader-utils");
var mime = require("mime");
var fileLoader = require("file-loader");
var isDev = process.env.NODE_ENV !== 'production';
module.exports = function(content) {
        this.cacheable && this.cacheable();
        var query = loaderUtils.parseQuery(this.query);
        var limit = (this.options && this.options.url && this.options.url.dataUrlLimit) || 0;
    if(query.limit) {
                limit = parseInt(query.limit, 10);

    }
        var mimetype = query.mimetype || query.minetype || mime.lookup(this.resourcePath);
    if(limit <= 0 || content.length < limit) {
                return "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64"));

    } else {
                var res = fileLoader.call(this, content);
        if(/\"([a-f0-9]{32})(\.png)/.exec(res)[1].length===32&&!isDev){
                        return res.replace(/\"([a-f0-9]{32})(\.png)/, '\"public/dist/$1$2');

        }
                return res;

    }

}

module.exports.raw = true;

