const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs').promises;

module.exports = {
    normalizeURL,
   links_from_html, 
   crawlPage
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

function isRelativURL(url){
    let regex = /^\//;
    return regex.test(url)
}

// for now takes an html file and logs the links
 async function links_from_html(htmlBody, baseURL){ 
    let links;
    try{
        //const dom = await JSDOM.fromFile(htmlBody);
        const dom = await JSDOM.fromURL(htmlBody);
        const links = dom.window.document.links; // "Hello world"
        for(l of links){
            //dom.window.document.links[0].href
            //console.log(l.toString());
            //let url = new URL(l.toString());
            let url = normalizeURL(l.toString());
            if(isRelativURL(url)){
                console.log(`${baseURL}${url}`);
            }else{
                console.log(url);
            }
            
        }
     } catch (error){
        console.error("Error reading file:", error);
     }
}

async function crawlPage(url){
   const response = await fetch(url, {
    method: 'GET', 
    mode: 'cors',
    headers: {
        'Content-type': 'text/html',
    }

   })
    //console.log(response.headers.Content_Type);
    if(response.ok){
        console.log("Response OK!")
        const data = await response.text();
        console.log(data); 
    }else{
        throw new Error("Network response was not OK")
    }

}