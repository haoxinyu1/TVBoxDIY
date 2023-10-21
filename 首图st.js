var rule = {
    title:'干饭影视',
    host:'https://gfysys.cc/',
    url:'/vodtype/fyclass-fypage.html',
    headers:{
        'User-Agent':'MOBILE_UA',
        "Cookie": "searchneed=ok"
    },
    searchUrl: '/vodsearch/**-------------.html',
    searchable:2,
    class_parse:'.stui-header__menu li:gt(0):lt(5);a&&Text;a&&href;/(\\d+).html',
    play_parse:true,
    lazy:`js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        var from = html.from;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
        } else {
            var MacPlayerConfig = {};
            eval(fetch(HOST + '/static/js/playerconfig.js').replace('var Mac', 'Mac'));
            var jx = MacPlayerConfig.player_list[from].parse;
            var pconfig = jsp.pdfh(request(jx + url), 'body&&script,0&&Html').match(/config = {[\\s\\S]*?}/)[0];
            var config = {};
            eval(pconfig);
            let apiurl = '';
            if (config.url.startsWith('http')) {
                apiurl = getHome(jx) + '/API.php';
            } else {
                apiurl = getHome(jx) + '/aqpqp/API.php';
            }
            let purl = JSON.parse(request(apiurl, {
                headers: {
                    'Origin': HOST
                },
                body: 'url=' + config.url,
                method: 'POST'
            })).url;
            input = {
                jx: 0,
                url: purl,
                parse: 0,
                header: JSON.stringify({
                    'Origin': HOST
                })
            }
        }
    `,
    limit:5,
    推荐:'ul.stui-vodlist.clearfix;li;a&&title;.lazyload&&data-original;;a&&href',
    double:true, // 推荐内容是否双层定位
    一级:'body .stui-vodlist__box;.lazyload&&title;.lazyload&&data-original;;a&&href',
    二级:{"title":"h1.title&&Text;.stui-content__detail p:eq(1)&&Text","img":".lazyload&&data-original","desc":".stui-content__detail p:eq(-3)&&Text;.stui-content__detail p:eq(-2)&&Text","content":".desc--a&&Text","tabs":".nav-tabs&&li","lists":".stui-content__playlist:eq(#id)&&li"},
    搜索: '.stui-vodlist__media&&li;.lazyload&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
}

