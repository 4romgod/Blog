const getDate = function(){
    const today = new Date();

    const options = {
        year: "numeric",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-us", options);
}

module.exports = getDate();