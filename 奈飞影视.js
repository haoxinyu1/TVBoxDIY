var rule = {
title:'奈飞影视',
host:'https://www.naifei.im',
// homeUrl:'/',
url:'/vod/show/fyclass--------fypage---.html',
searchUrl:'/vod/search/-------------.html?wd=**',

searchable:2,//是否启用全局搜索,
quickSearch:0,//是否启用快速搜索,
filterable:0,//是否启用分类筛选,
headers:{//网站的请求头,完整支持所有的,常带ua和cookies
    'User-Agent':'PC_UA',
    "Cookie": "searchneed=ok"
},
 class_name:'电影&电视剧&综艺&动漫&国产剧&港台剧&日韩剧&欧美剧&泰国剧&其他',
            class_url:'1&2&3&4&13&14&15&16&17&30',
	play_parse:true,
lazy:`js:
    var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
    var url = html.url;
    if (html.encrypt == "1") {
        url = unescape(url)
    } else if (html.encrypt == "2") {
        url = unescape(base64Decode(url))
    }
    if (/m3u8|mp4/.test(url)) {
        input = url
    } else {
        input
    }
`,
	limit:6,
	推荐:'.module-list;.module-items&&.module-item;img&&alt;img&&data-src;.module-item-text&&Text;a&&href',
	double:true, // 推荐内容是否双层定位
	tab_exclude:'排序',
一级:'.module-poster-item.module-item;img&&alt;img&&data-original;.module-item-note&&Text;a&&href',
二级:{"title":"h1&&Text;.module-info-tag-link:eq(2)&&Text","img":".ls-is-cached.lazy.lazyload&&data-original","desc":".module-info-content&&.module-info-item:eq(-2)&&Text;.module-info-content&&.module-info-item:eq(4)&&Text;.module-info-content&&.module-info-item:eq(3)&&Text;.module-info-content&&.module-info-item:eq(2)&&.module-info-item-content&&Text;.module-info-content&&.module-info-item:eq(1)&&.module-info-item-content&&Text","content":".module-info-introduction-content&&Text","tabs":".module-tab-items-box:eq(0)&&.module-tab-item","lists":".module-list.sort-list:eq(#id)&&.module-play-list-content a"},
搜索:'.module-card-item.module-item;.module-card-item-title&&Text;img&&data-original;.module-item-note&&Text;a.play-btn-o&&href',
}