//緯度,経度,ズーム

window.map = L.map('view_map').setView([35.5274631662438, 139.7148687433752], 14);
// OpenStreetMap から地図画像を読み込む
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    minZoom: 14,
    maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
}).addTo(map);

/*
var map = L.map('view_map').setView([35.5274631662438, 139.7148687433752], 14);
L.tileLayer('http://{s}.tile.stamen.com/{variant}/{z}/{x}/{y}.png', {
    minZoom: 14,
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
    variant: 'toner-lite'
}).addTo(map);*/




// 1. WorldMapの表示範囲の制限設定をする方法-2 => 左上：右下 の [ 緯度, 経度 ]
const DISPLAYRANGE = [[35.56421489824888, 139.57112286770058], [35.47182534833629, 139.8108508842153]];
// => 左上：右下 = アイスランド:ニュージーランド

// 2. setMaxBounds()に表示範囲の制限設定をSetする
map.setMaxBounds(DISPLAYRANGE);
