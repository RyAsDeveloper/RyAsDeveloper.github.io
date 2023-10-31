function keyup(val){
    if (val.length > 2){
        console.log("fes");
        val = val.slice(0,2);
    }


    return val;
}


/*サイドパネルの開閉のために、各タグにクラスを付け替えする処理*/
function sidebar() {
    console.log("fuga");

    button = event.target;

    if (button.className.includes("closed") || button.className.includes("default")){ //ボタンが閉じているならば(もしくは呼び出しが一回目(=default)であれば)
        button.className = "sidebar-toggle_opened";
        button.innerHTML = "＜"
        
        viewmap = document.getElementsByClassName("view_map_closed")[0];
        viewmap.className = "view_map_opened leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom";

        side = document.getElementsByClassName("sidebar_default")[0];
        if (document.getElementsByClassName("sidebar_default").length == 0){
            side = document.getElementsByClassName("sidebar_closed")[0]; // もしsidebar_closedで見つからなければ(=呼び出しが一回目であれば)
        }

        side.className = "sidebar_opened"
    } else if (button.className.includes("opened")){ //ボタンが閉じているならば(もしくは呼び出しが一回目(=default)であれば)
        button.className = "sidebar-toggle_closed";
        button.innerHTML = "＞"
        
        viewmap = document.getElementsByClassName("view_map_opened")[0];
        viewmap.className = "view_map_closed leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom";

        side = document.getElementsByClassName("sidebar_opened")[0];

        side.className = "sidebar_closed"
    }


} 