const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs').promises;

module.exports = {
    normalizeURL,
   // getURLsFromHTML
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


// for now takes an html file and logs the links
 async function links_from_html(){ 
    let links;
    try{
        const dom = await JSDOM.fromFile('index.html');
        const links = dom.window.document.links; // "Hello world"
        for(l of links){
            console.log(l.toString());
        }
     } catch (error){
        console.error("Error reading file:", error);
     }
}

links_from_html();
