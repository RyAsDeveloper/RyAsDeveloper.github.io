// unittime, freeの単位は時間(hour)
// fareはunittimeあたりの料金

window.STOPS = [
    { 
        name: "アップルパーク PIA京急川崎店駐輪場",
        location: {x: 139.699943, y: 35.532342},
        
        unittime: 1, 
        fare: 100,
        free: 0,
        describe: "",
    },
    {
        name: "エコステーション21 京急川崎西口駐輪場A",
        location: {x: 139.700388, y:35.533043},
        unittime: 3,
        fare: 100,
        free: 1,
        describe: ""
    },
    {
        name: "エコステーション21 京急川崎西口駐輪場B(高いラック)",
        location: {x:139.700525, y:35.53358},
        unittime: 8,
        fare: 100,
        free: 1,
        describe: "高いラックに限り、8時間100円。低いラックは5時間100円"
    },
    {
        name: "エコステーション21 京急川崎西口駐輪場B(低いラック)",
        location: {x:139.700525, y:35.53358},
        unittime: 5,
        fare: 100,
        free: 1,
        describe: "高いラックに限り、8時間100円。低いラックは5時間100円"
    },
    {
        name: "アップルパーク ソリッドスクエア駐輪場A",
        location: {x: 139.699293, y: 35.535169},
        unittime: 12,
        fare: 100,
        free: 1.5,
        describe: ""
        
    },
    {
        name: "アップルパーク ソリッドスクエア駐輪場B",
        location: {x:139.699229, y:35.535651},
        unittime: 12,
        fare: 100,
        free: 1.5,
        describe: ""
    },
    {
        name: "アップルパーク ソリッドスクエア駐輪場C",
        location: {x:139.700794, y: 35.535077},
        unittime: 12,
        fare: 100,
        free: 1.5,
        describe: "",
        url: "https://goo.gl/maps/NbaFE7s2VbT5HTQb8"
    },
    {
        name: "カワサキデルタ南駐輪場",
        location: {x: 139.6940722, y:35.5297247},
        unittime: 12,
        fare: 100,
        free:2,
        describe: "",
        url: "https://goo.gl/maps/Pp2AGWyrv1QFk7656"
    },
    {
        name: "川崎駅西口自転車等第2駐車場 2F",
        location: {x:139.693561, y:35.5310983},
        unittime: 24,
        fare: 120,
        free: 0,
        describe: ""
    },
    {
        name: "川崎駅西口自転車等第2駐車場 1F",
        location: {x:139.693561, y:35.5310983},
        unittime: 24,
        fare: 150,
        free: 0,
        describe: ""
    },
    {
        name: "川崎西口パーキング自転車駐輪場 - 三井のリパーク",
        location: {x: 139.6935441, y:35.5319657},
        unittime: 10,
        fare: 100,
        free: 0,
        describe: "宝くじ売り場の近くの路地にあります",
        url: "https://goo.gl/maps/Ssdm62CBxc5zWYy8A"
    },
    {
        name: "ラゾーナ川崎北駐輪場",
        location: {x:139.695943, y:35.5340375},
        unittime: 4,
        fare: 100,
        free: 4,
        describe: "",
        url: "https://goo.gl/maps/dL7imyvAv71AKR5N9"
    },
    {
        name: "ラゾーナ川崎東駐輪場",
        location: {x:139.6974179, y:35.5331835},
        unittime: 4,
        fare: 100,
        free: 4,
        describe: ""
    },
    {
        name: "ラゾーナ川崎プラザ西駐輪場",
        location: {x: 139.6943923, y:35.5330874},
        unittime: 4,
        fare: 100,
        free: 4,
        describe: "",
        url: "https://goo.gl/maps/NF5cnQczhYh174QV8"
    },
    /*
    {
        name: "ミューザ川崎駐輪場",
        location: {x: 139.694809, y:35.5314532},
        unittime: 
    },*/
    {
        name: "川崎駅東口第2駐輪場",
        location: {x: 139.695085, y:35.5292904},
        unittime: 24,
        fare: 170,
        free: 0,
        describe: "",
        url: "https://goo.gl/maps/FyfGq3XEHkA1R3GaA"
    }

];

// 重要！
// 全てのマーカーを格納(グローバル変数)
window.markerlayer = [];

function start(){ // Start時にJsonにあるピンを全て打つ処理
    
    console.log("fes");
    for (let i = 0; i < STOPS.length; i++){
        marker(i);
    }

}

function marker(n){
    var popup = L.popup();

    var stop = window.STOPS[n];



    var decimal = stop.free - Math.floor(stop.free); // 小数点以下を取得

    var marker;

    /*
    最初に1.0時間か1.5時間かの判断(小数点以下があったら○分にしなきゃいけないから)をし、
    その後に個stopに"url"というキーが存在するかで分岐する。
    */

    if (decimal == 0){
        if (!("url" in stop)){
            marker = L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
                popup
                .setLatLng(e.latlng)
                .setContent(`${stop.name} <br>
                                料金:${stop.fare}円/${stop.unittime}時間 <br> 
                                無料:${stop.free}時間 <br> 
                                ${stop.describe} <br>
                                <a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?q=&layer=c&cbll=${stop.location.y}, ${stop.location.x}&cbp=11,0,0,0,0">Googleストリートビューで見る</a>`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
                                // target="_blank"の他に rel="noopener noreferrer"を指定することで、安全性を保証。参考：https://web-camp.io/magazine/archives/82442    
                .openOn(window.map);
            });
        } else {
            marker = L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
                popup
                .setLatLng(e.latlng)
                .setContent(`${stop.name} <br>
                                料金:${stop.fare}円/${stop.unittime}時間 <br> 
                                無料:${stop.free}時間 <br> 
                                ${stop.describe} <br>
                                <a target="_blank" rel="noopener noreferrer" href="${stop.url}">Googleストリートビューで見る</a>`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
                                // target="_blank"の他に rel="noopener noreferrer"を指定することで、安全性を保証。参考：https://web-camp.io/magazine/archives/82442    
                .openOn(window.map);
            });
        }
    } else { // 無料時間が1.5時間とかの場合、1時間30分にする。
        if (!("url" in stop)){
            marker = L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
                popup
                .setLatLng(e.latlng)
                .setContent(`${stop.name} <br>
                                料金:${stop.fare}円/${stop.unittime}時間 <br> 
                                無料:${Math.floor(stop.free)}時間${decimal * 60}分 <br> 
                                ${stop.describe} <br>
                                <a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?q=&layer=c&cbll=${stop.location.y}, ${stop.location.x}&cbp=11,0,0,0,0">Googleストリートビューで見る</a>`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
                .openOn(window.map);
            });
        } else {
            marker = L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
                popup
                .setLatLng(e.latlng)
                .setContent(`${stop.name} <br>
                                料金:${stop.fare}円/${stop.unittime}時間 <br> 
                                無料:${Math.floor(stop.free)}時間${decimal * 60}分 <br> 
                                ${stop.describe} <br>
                                <a target="_blank" rel="noopener noreferrer" href="${stop.url}">Googleストリートビューで見る</a>`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
                .openOn(window.map);
            }); 
        }
        
    }

    window.markerlayer.push({marker: marker, x: stop.location.x, y: stop.location.y});


}





/*
費用 > 距離 = 0, 時間 > 距離 = 1
*/



function table() { // st=stoptime stoptimeに入っている値を代入する。prio=priority 並び替えの優先順位を決める。
    window.sorted = [];

    var position = [35.5222025, 139.7013585]; //緯度、経度

    var st = document.getElementsByClassName('timeform')[0]; // timeformが一つしか見つからない前提
    var prio = document.getElementsByClassName('priority')[0]; //priorityも一つしか見つからない前提

    //console.log(`${st.value}`); // = 1, 2 ... 99;
    //console.log(`${prio.value}`); // = fare

    
    if (true){ // priorityを消しているため、暫定処置
        for (let i = 0; i < window.STOPS.length; i++){

            var stop = STOPS[i];

            var truedistance = Math.sqrt(Math.pow(position[1] - window.STOPS[i].location.x, 2) + Math.pow(position[0] - window.STOPS[i].location.y, 2), 2);

            var truefare = (Math.ceil((st.value - stop.free) / stop.unittime)) * stop.fare;
            //              ここで、どのくらいfareを掛けたらいいのか(free分引いてある)

            if (truefare < 0){
                truefare = 0;
            }
            
            if (sorted.length == 0){
                sorted.unshift(STOPS[i]);

                continue;
            }

            if (stop.name == "川崎駅西口自転車等第2駐車場"){
                console.log(`料金：${truefare}`);
            }


            let complete = false;
            for (let j = 0; j < sorted.length; j++){ //sortedを比較し、優先順位が高い方(例だとfare)の比較の時点で高かったら決定




                sortedtrue = (Math.ceil((st.value - sorted[j].free) / sorted[j].unittime)) * sorted[j].fare;



                if (sortedtrue < 0){
                    sortedtrue = 0;
                }



                var sorteddistance = Math.sqrt(Math.pow(position[1] - sorted[j].location.x, 2) + Math.pow(position[0] - sorted[j].location.y, 2), 2);


                if (truefare < sortedtrue){
                    sorted.splice(j, 0, stop);
                    complete = true;
                    break;
                }
                
                if ((truefare == sortedtrue) && (truedistance < sorteddistance)){ // ==がないと、distanceだけで比較しちゃう
                    sorted.splice(j, 0, stop);
                    complete = true;
                    break;
                }
            }

            if (!complete){
                sorted.push(stop);
            }



        }
        
    }

    var tab = document.getElementsByClassName('stoptable')[0];
    while (tab.rows.length > 1) tab.deleteRow(-1); // 行を一括削除(headerだけは削除しない)

    for (let i = 0; i < sorted.length; i++){
        var st = document.getElementsByClassName('timeform')[0]; // timeformが一つしか見つからない前提
        var truefare = (Math.ceil((st.value - sorted[i].free) / sorted[i].unittime)) * sorted[i].fare;
        // ceilで切り上げ



        if (truefare < 0){
            truefare = 0;
        }

        
        var row = tab.insertRow(-1);

        var namecell = row.insertCell(0);
        var farecell = row.insertCell(1);
        var freecell = row.insertCell(2);

        namecell.id = i;
        namecell.innerHTML = `${sorted[i].name}`;
        namecell.onclick = cellclicked;

        farecell.id = i;
        farecell.innerHTML = `${truefare} 円`;
        farecell.onclick = cellclicked;

        freecell.id = i;
        freecell.innerHTML = `${sorted[i].free} 時間`;
        freecell.onclick = cellclicked;
    }

    function cellclicked(e){
        var item = sorted[e.target.id];

        console.log(item.location);

        window.map.setView([item.location.y, item.location.x]);

        // クリックされたセルに応じてアイコンを変える。
        for (let i = 0; i < window.markerlayer.length; i++){
            var mkr = markerlayer[i];

            if (mkr.x == item.location.x && mkr.y == item.location.y){
                console.log("Icon changed");
                mkr.marker.setIcon(L.spriteIcon('red'));
                mkr.marker.setZIndexOffset(99);
            } else {
                mkr.marker.setIcon(L.spriteIcon('blue'));

                mkr.marker.setZIndexOffset(1);
            }


        }

        console.log("fes")
        button.className = "sidebar-toggle_closed";
        button.innerHTML = "＞"
        
        viewmap = document.getElementsByClassName("view_map_opened")[0];
        viewmap.className = "view_map_closed leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom";

        side = document.getElementsByClassName("sidebar_opened")[0];

        side.className = "sidebar_closed"



    }





    

}

