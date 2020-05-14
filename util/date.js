exports.getDate = function(){
    const today = new Date();

    var options = {
        year: "numeric",
        day: "numeric",
        month: "long"
        
    }

    return today.toLocaleDateString("en-us", options);
}