var webdriver = require("selenium-webdriver");

function createDriver() {
    var driver = new webdriver.Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    driver.manage().timeouts().implicitlyWait(20000);
    driver.manage().window().maximize();
    return driver;
}

var browser = createDriver();

function logTitle() {
    browser.getTitle().then(function (title) {
        console.log('Current Page Title: ' + title);
    });
}

function clickLink(link) {
    link.click();
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function findMostRelevant() {
    return browser.findElements(webdriver.By.css('a.product-name')).then(function (result) {
        return result[0];
    });
}

function signIn(email, password) {
    return browser.findElement(webdriver.By.id("email")).sendKeys(email).then(() => {
                return browser.findElement(webdriver.By.id("passwd")).sendKeys(password);
            })
}

function proceedToCheckout() {
    return browser.wait(() => {
        browser.findElement(webdriver.By.css('a[title="Proceed to checkout"]')).click();
    }, 2000);
}


function closeBrowser() {
    browser.quit();
}

browser.get('http://automationpractice.com/index.php').then(() => {
    return browser.findElement(webdriver.By.css('a[title="Women"]')).click();
}).then(() => {
    return browser.findElement(webdriver.By.id("layered_category_4")).click();
}).then(() => {
    //add slider drag and drop here
}).then(() => {
    return browser.findElement(webdriver.By.linkText("Blouse")).click();
}).then(() => {
    return browser.findElement(webdriver.By.name("Submit")).click();
}).then(() => {
    return proceedToCheckout();
}).then(() => {
    return browser.findElement(webdriver.By.css("input.cart_quantity_input")).sendKeys("5");
}).then(() => {
    return proceedToCheckout();
}).then(() => {
    return signIn('js18test@gmail.com', 'Time4Death!');
}).then(() => {
    return proceedToCheckout();
}).then(() => {
    return browser.findElement(webdriver.By.id("cgv")).click();
}).then(() => {
    return proceedToCheckout();
}).then(() => {

}).then(() => {
    browser.quit();
});






