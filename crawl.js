const { link, createWriteStream } = require("fs");
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
 async function links_from_html(htmlLink, baseURL){ 
    //console.log(`READING: ${htmlLink}`);
    let dom;
    try{
        let url = htmlLink;
        dom = await JSDOM.fromURL(url);
    }catch(err){
        throw new Error(`Was not possible to read ${htmlLink}}`);

    }
    const links_list = [];
    try{
        //const dom = await JSDOM.fromFile(htmlBody);
        const links = dom.window.document.links; 
        // "Hello world"
        
        for(let l of links){
            let url = normalizeURL(l.toString());
            if(isRelativURL(url)){
                links_list.push(`https://${baseURL}${url}/`)
                //console.log(`${baseURL}${url}`);
            }else{
                links_list.push(`https://${url}/`);
                //console.log(url);
            }
            
        }
     } catch (error){
         // 
         console.error("Error reading file:", error);
       throw new Error(error);

     }
     if(links_list.length >=1){
        console.log(`Succesfully retrived links from ${htmlLink}`)
     }
     return links_list;
}

async function crawlPage(baseURL, currentURL, pages){
    let currentURLobj = new URL(currentURL);
    let baseURLobj = new URL(baseURL);
    if(currentURLobj.hostname != baseURLobj.hostname && currentURLobj.hostname != `www.${baseURLobj.hostname}` ){
        return pages;
    }
    let normalizeCurrentUrl = normalizeURL(currentURL);

    if(pages[normalizeCurrentUrl]){
        pages[normalizeCurrentUrl]++;
        return pages;
    }

    if(baseURL == currentURL){
        pages[normalizeCurrentUrl] = 0;
    }else{
        pages[normalizeCurrentUrl] = 1;
    }

    try{
        const links = await links_from_html(currentURL, baseURL);
        //console.log(links);
        
        let store_pages = pages;
        for(let link of links){
            //console.log(link)
            store_pages = await crawlPage(baseURL, `${link}`, store_pages);
            
        }
        //console.log(store_pages)
        return store_pages;
        //console.log(pages);
    }catch(err){
        console.log(errr);
        throw new Error(`Could not read links from ${currentURL}`);
        
    }

}


async function crawlURLandPrint(url){
    let pg1 = await crawlPage(url, url, {});
    console.log(pg1);
    
}


crawlURLandPrint('https://wagslane.dev/')

