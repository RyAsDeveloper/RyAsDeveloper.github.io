// unittime, freeの単位は時間(hour)
// fareはunittimeあたりの料金

window.STOPS = [
    { 
        name: "ラゾーナ川崎プラザ駅前地下駐輪場",
        location: {x: 139.699943, y: 35.532342},
        unittime: 1, 
        fare: 100,
        free: 2
    },
    {
        name: "エコステーション21 京急川崎西口駐輪場A",
        location: {x: 139.700388, y:35.533043},
        unittime: 3,
        fare: 100,
        free: 1
    },
    {
        name: "エコステーション21 京急川崎西口駐輪場B",
        location: {x:139.700525, y:35.53358},
        unittime: 8,
        fare: 100,
        free: 1
    },
    {
        name: "アップルパーク ソリッドスクエア駐輪場A",
        location: {x: 139.699293, y: 35.535169},
        unittime: 12,
        fare: 100,
        free: 1.5
        
    }
];

function start(){ // Start時にJsonにあるピンを全て打つ処理
    console.log("fes");
    for (let i = 0; i < STOPS.length; i++){
        marker(i);
    }

}

function marker(n){
    var popup = L.popup();

    var stop = window.STOPS[n];

    console.log(typeof(stop.location.y));
    console.log(typeof(window.map));


    var decimal = stop.free - Math.floor(stop.free); // 小数点以下を取得

    if (decimal == 0){
        L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
            popup
               .setLatLng(e.latlng)
               .setContent(`${stop.name} <br>料金:${stop.fare}円/${stop.unittime}時間 <br> 無料:${stop.free}時間`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
            .openOn(window.map);
      });
    } else { // 無料時間が1.5時間とかの場合、1時間30分にする。
        L.marker([stop.location.y, stop.location.x]).addTo(window.map).on('click', function (e) {
            popup
               .setLatLng(e.latlng)
               .setContent(`${stop.name} <br>料金:${stop.fare}円/${stop.unittime}時間 <br> 無料:${Math.floor(stop.free)}時間${decimal * 60}分`) // Back quoteじゃないと変数が展開されない。また、ここでの改行は「\n」ではなく、「<br>」
            .openOn(window.map);
      });
    }


}





/*
費用 > 距離 = 0, 時間 > 距離 = 1
*/



function table () { // st=stoptime stoptimeに入っている値を代入する。prio=priority 並び替えの優先順位を決める。
    window.sorted = [];

    var position = [35.5222025, 139.7013585]; //緯度、経度

    var st = document.getElementsByClassName('timeform')[0]; // timeformが一つしか見つからない前提
    var prio = document.getElementsByClassName('priority')[0]; //priorityも一つしか見つからない前提

    //console.log(`${st.value}`); // = 1, 2 ... 99;
    //console.log(`${prio.value}`); // = fare

    
    if (prio.value == "fare"){
        for (let i = 0; i < window.STOPS.length; i++){
            console.log(i);

            var stop = STOPS[i];

            var truedistance = Math.sqrt(Math.pow(position[1] - window.STOPS[i].location.x, 2) + Math.pow(position[0] - window.STOPS[i].location.y, 2), 2);

            var truefare = (Math.floor((st.value - stop.free) / stop.unittime)+1) * stop.fare;
            //              ここで、どのくらいfareを掛けたらいいのか(free分引いてある)

            if (truefare < 0){
                truefare = 0;
            }
            
            if (sorted.length == 0){
                sorted.unshift(STOPS[i]);

                continue;
            }

            let complete = false;
            for (let j = 0; j < sorted.length; j++){ //sortedを比較し、優先順位が高い方(例だとfare)の比較の時点で高かったら決定
                var sortedtrue = (Math.floor((st.value - sorted[j].free) / sorted[j].unittime)+1) * sorted[j].fare;
                if (sortedtrue < 0){
                    sortedtrue = 0;
                }

                var sorteddistance = Math.sqrt(Math.pow(position[1] - sorted[j].location.x, 2) + Math.pow(position[0] - sorted[j].location.y, 2), 2);

                console.log(`${truedistance}`);
                console.log(`${truefare}`);

                if (truefare < sortedtrue){
                    sorted.splice(j, 0, stop);
                    complete = true;
                    break;
                }
                else if (truedistance < sorteddistance){
                    sorted.splice(j, 0, stop);
                    complete = true;
                    break;
                }
            }

            if (!complete){
                sorted.push(stop);
            }

            console.log("<br>");

        }
        console.log(sorted);
        
    }

    var tab = document.getElementsByClassName('stoptable')[0];
    while (tab.rows.length > 1) tab.deleteRow(-1); // 行を一括削除(headerだけは削除しない)

    for (let i = 0; i < sorted.length; i++){
        var st = document.getElementsByClassName('timeform')[0]; // timeformが一つしか見つからない前提
        var truefare = (Math.ceil((st.value - sorted[i].free) / sorted[i].unittime)) * sorted[i].fare;
        // ceilで切り上げ


        console.log(truefare);

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


    }





    

}

