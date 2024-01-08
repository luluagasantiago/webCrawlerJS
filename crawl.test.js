const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');  

const jsdom = require("jsdom");
const { JSDOM } = jsdom;




test('https://blog.boot.dev/path/ equal to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

test('https://blog.boot.dev/path equal to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('http://blog.boot.dev/path equal to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path')
})

test('http://blog.boot.dev/path/ equal to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
})

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>
<a href="https://boot.dev/">Learn Backend Development</a>
<a href="/locations">Learn Backend Development</a>
`);
const links = dom.window.document.querySelector("a"); // "Hello world"


console.log(typeof(links));