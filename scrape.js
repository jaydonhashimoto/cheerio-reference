const axios = require('axios');
const cheerio = require('cheerio');

// axios
//     .get('https://www.jaydonhashimoto.dev/')
//     .then((res) => {
//         const $ = cheerio.load(res);

//         const siteElement = $('header.showcase');
//         console.log(siteElement.html());
//     })
//     .catch(err => {
//         console.log(err);
//     });

const $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');

/**SELECTORS */

//prints Apple
const apple = $('.apple', '#fruits').text();
console.log(apple);

//prints pear class name
const pear = $('ul .pear').attr('class');
console.log(pear);

//prints Orange
const orange = $('li[class=orange]').html();
console.log(orange);


/**ATTRIBUTES */

//get and print ul id
const fruits = $('ul').attr('id');
console.log(fruits);

//set id to 'favorite' for apple li
const appleHTML = $('.apple').attr('id', 'favorite').html();
console.log($('.apple').attr('id'));

/**GETTING AND SETTING PROPERTIES */

