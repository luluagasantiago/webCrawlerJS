module.exports = {
    normalizeURL 
}

function normalizeURL(rawURL){
    let url = new URL(rawURL)
    url =  `${url.host + url.pathname}`;
    
    // match string that end with /
    let regex = /\/$/;
    if (regex.test(url)){
        url = url.slice(0,-1);
    }
    return url;
}
