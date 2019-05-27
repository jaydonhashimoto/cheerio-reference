const axios = require('axios');
const cheerio = require('cheerio');

//extract apis out of buttercms documentation
//this is what we want returned
/**
 <pre class="highlight shell">
    <code>
        curl -X GET
        <span class="s1">
            https://api.buttercms.com/v2/pages/&lt;page_type_slug&gt;/&lt;page_slug&gt;/?auth_token=api_token_b60a008a&apos;
        </span>\n
    </code>
</pre>
*/
axios
    .get('https://buttercms.com/docs/api/')
    .then((res) => {
        const $ = cheerio.load(res.data);

        //this css selector matches all 'pre' elements
        const urlElems = $('pre.highlight.shell');

        //loop through all elements found
        for (let i = 0; i < urlElems.length; i++) {
            //find 's1' class
            // Since the URL is within the span element, we can use the find method
            // To get all span elements with the `s1` class that are contained inside the
            // pre element. We select the first such element we find (since we have seen that the first span
            const urlSpan = $(urlElems[i]).find('span.s1')[0]

            //proceed only if element exists
            if (urlSpan) {
                //wrap span in '$' to get only the text
                const urlText = $(urlSpan).text();
                console.log(urlText);
            }
        }


    })
    .catch(err => {
        console.log(err);
    });

/**
 * Another example that gets post title
 */
axios
    .get('https://www.pixiv.net/ranking.php?mode=daily&content=illust')
    .then(res => {
        const $ = cheerio.load(res.data);

        const posts = $('section.ranking-item');
        for (let i = 0; i < posts.length; ++i) {
            const postTitle = $(posts[i]).find('a.title')
            if (postTitle) {
                const title = $(postTitle).text();
                console.log(title);
            }
        }
    })
    .catch(err => {
        console.log(err);
    });

/**
 * working on scrapping page that needs login creds
 * reference: https://formcarry.com/documentation/axios-example
 */
axios
    .get('https://www.patreon.com/semblanceofsanity/posts')
    .then(res => {
        const $ = cheerio.load(res.data);
        const posts = $('span.nfbshm-1 zsTHz');
        for (let i = 0; i < posts.length; ++i) {
            const postTitle = $(posts[i]).find('a.title')[0];
            console.log(postTitle);
            if (postTitle) {
                const title = $(postTitle).text();
                console.log(title);
            }
        }
    })
    .catch(err => {
        console.log(err);
    });


/**
 * Reference from documentation page
 * https://www.npmjs.com/package/cheerio 
 */
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

//returns boolean
$('input[type="checkbox"]').prop('checked');

//set property
$('input[type="checkbox"]').prop('checked', true).val()


