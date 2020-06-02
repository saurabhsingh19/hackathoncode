const thumb1 = 'tea-light-thumb.jpeg';
const image1 = 'tea-light.jpeg';
const thumb2 = 'white-light-thumb.jpeg';
const image2 = 'white-light.jpeg';
const thumb3 = 'pink-light-thumb.jpeg';
const image3 = 'pink-light.jpeg';
const thumb4 = 'tea-light-thumb.jpeg';
const image4 = 'tea-light.jpeg';
var fs = require('fs');


module.exports = {
    'Image tag should be visible inside carousel-frame' : function(browser) {
        browser.url('file://' + __dirname + '/../index.html')
        .useXpath()
        .waitForElementVisible('//div[@test-id="carousel-frame"]//img',1000);
    },
    'Should display tea-light.jpeg image once page is loaded' : function(browser) {
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image1) >= 0);
        });
    },
    'Should have 4 thumbnail images in menu' : function(browser) {
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[1]',
         'src', function (result) { 
            this.assert.ok(String(result.value).indexOf(thumb1) >= 0); 
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[2]',
         'src', function (result) { 
            this.assert.ok(String(result.value).indexOf(thumb2) >= 0);
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[3]',
         'src', function (result) { 
            this.assert.ok(String(result.value).indexOf(thumb3) >= 0);
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[4]', 
            'src', function (result) { 
            this.assert.ok(String(result.value).indexOf(thumb4) >= 0);
        });
    },
    'carousel-frame image should change with click on menu thumbs' : function(browser) { 
        browser.useXpath().click('(//div[@id="menu"]//img)[2]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img', 
            'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image2) >= 0);
        });
        browser.useXpath().click('(//div[@id="menu"]//img)[3]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image3) >= 0);
        }); 
        browser.useXpath().click('(//div[@id="menu"]//img)[4]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image4) >= 0);
        });
    },
    'testing previous button' : function(browser) {
        browser.useXpath().click('//div[@class="previous"]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image3) >= 0);
        });
    },
    'testing next button' : function(browser) {
        browser.useXpath().click('//div[@class="next"]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
             console.log(result.value);
            this.assert.ok(String(result.value).indexOf(image4) >= 0);
        });
    }, 
    'reaching ends in menu should not change image on next click' : function(browser) {
        browser.useXpath().click('//div[@class="next"]');
        browser.useXpath().click('//div[@class="next"]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image4) >= 0);
        });
    },
    'thumb should have selected class on cliking on it' : function(browser) {
        browser.useXpath().click('(//div[@id="menu"]//img)[3]');
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[1]', 'class',
         function (result) {
            this.assert.ok(String(result.value).indexOf('selected') < 0);
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[2]', 'class',
         function (result) {
            this.assert.ok(String(result.value).indexOf('selected') < 0);
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[3]', 'class',
         function (result) {
            this.assert.ok(String(result.value).indexOf('selected') >= 0);
        });
        browser.useXpath().getAttribute('(//div[@id="menu"]//img)[4]', 'class',
         function (result) {
            this.assert.ok(String(result.value).indexOf('selected') < 0);
        });
    },
    'clicking on slide should change carousel-frame image but not selected thumb' : function(browser) {
        browser.useXpath().click('//input[@test-id="slide"]');
          browser.useXpath()
          .waitForElementVisible('//div[@test-id="carousel-frame"]//img[contains(@src, "tea-light")]',
           2000);

          browser.useXpath().getAttribute('(//div[@id="menu"]//img)[3]', 'class',
           function (result) {
            this.assert.ok(String(result.value).indexOf('selected') >= 0);
        });
        browser.useXpath().click('//div[@class="previous"]');
        browser.useXpath().getAttribute('//div[@test-id="carousel-frame"]//img',
         'src', function (result) {
            this.assert.ok(String(result.value).indexOf(image2) >= 0);
        });
    },
    'should have atleast 8 ES6 features and 5 ES6-Only features' : function(browser) {
        let data = fs.readFileSync('es6check', {encoding: 'utf-8'});
        var count = (data.match(/ES6/g) || []).length;
        browser.assert.ok(count > 7);
        count = (data.match(/only available in ES6/g) || []).length;
        browser.assert.ok(count > 4);
    }
}
