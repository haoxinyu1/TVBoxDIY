var rule = {
title:'看片狂人',
host:'https://whereiskpkuang.com',
hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,".content-top a:eq(1)&&href");print(src);HOST=src',
url:'/vodshow/fyclass--------fypage-----.html',
searchUrl:'/vodsearch/**----------fypage---.html',
searchable:2,//是否启用全局搜索,
quickSearch:0,//是否启用快速搜索,
filterable:0,//是否启用分类筛选,
headers:{//网站的请求头,完整支持所有的,常带ua和cookies
'User-Agent':'MOBILE_UA',
// "Cookie": "searchneed=ok"
},
class_name:'电影&电视剧&综艺&动漫&国产剧&港剧&日剧&欧美剧&台剧&泰剧&越南剧&韩剧&海外剧',
class_url:'1&2&3&4&13&14&15&16&20&21&22&23&30',
play_parse:true,

limit:6,
推荐:'.uk-switcher.uk-margin;.fed-week-boxs li;.fed-list-pics&&title;.fed-list-pics&&data-original;.fed-list-remarks&&Text;a&&href',
double:true, // 推荐内容是否双层定位
tab_exclude:'IK影视|腾讯|爱奇艺|优酷',
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
    } else if (/videojs/.test(from)) {
        input={jx:0,url:url,parse:0,
            header: JSON.stringify({
                'referer': HOST
            })}
    } else {
        var MacPlayerConfig={};
        eval(fetch(HOST + "/static/js/playerconfig.js").replace('var Mac','Mac'));
        var jx = MacPlayerConfig.player_list[from].parse;
        if (jx == '') {
            jx = MacPlayerConfig.parse
        };
        if (jx.startsWith("/")) {
            jx = jx = "https:" + jx;
        }
        input={jx:0,url:jx+url,parse:1,
            header: JSON.stringify({
                'referer': HOST
            })}
    }
`,
一级:'.fed-list-info&&.fed-list-item;a&&title;.fed-list-pics&&data-original;.fed-list-remarks&&Text;a&&href',
二级:{"title":"h1&&Text;.uk-list&&li:eq(3)&&Text","img":".cover-shadow-xs&&data-original","desc":".module-info-content&&.module-info-item:eq(-2)&&Text;.module-info-content&&.module-info-item:eq(-4)&&Text;.module-info-content&&.module-info-item:eq(-3)&&Text;.uk-list&&li:eq(0)&&Text;.uk-list&&li:eq(1)&&Text","content":".fed-col-xs12.fed-show-md-block&&Text","tabs":"ul.yunlist&&li a","lists":".fed-play-item.fed-drop-item:eq(#id) ul.fed-part-rows:eq(1) li"},
搜索:'.fed-back-whits.uk-margin&&.uk-text-center;a&&title;.fed-list-pics&&data-original;.uk-overlay&&Text;a&&href',
}