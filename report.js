const { crawlPage } = require('./crawl.js'); 


function sortObjByKeyAndPrint( obj_pages ){
    let sortable = [];
    for (let url in obj_pages) {
        sortable.push([url, obj_pages[url]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    //const arr = [3, 1, 4, 1, 5, 9];
    //const compareFn = (a, b) => (a[1] > b[1] ? 0 : 1);
    //sortable.sort(compareFn).reverse();
    for( let linkPair of sortable){
        console.log(`Found ${linkPair[1]} internal links to ${linkPair[0]}`)
    }
    
    
    
} 

async function printReport(url){
    console.log("The report is starting...");
    const pagesObj = await crawlPage('https://wagslane.dev/', 'https://wagslane.dev/', {});
    sortObjByKeyAndPrint(pagesObj);

}




printReport('https://wagslane.dev/')

