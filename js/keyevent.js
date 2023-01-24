function keyup(val){
    if (val.length > 2){
        console.log("fes");
        val = val.slice(0,2);
    }


    return val;
}