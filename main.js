console.log("Hello there!")
const { links_from_html, crawlPage} = require('./crawl.js'); 

const { argv } = require('node:process');
  

function main(){
        let baseURL;
        if(argv.length < 3 || argv.length > 3){
            console.error("Wrong number of arguments");
        } else{
            
            console.log(`Getting links from body of baseURL: ${argv[2]}`);
            links_from_html(argv[2]);
            baseURL = argv[2];
            crawlPage(baseURL);
        }
        

}

main()