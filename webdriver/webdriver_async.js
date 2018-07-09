const webdriver = require("selenium-webdriver");
const until = webdriver.until;

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

function clickLink(link) {
    link.click();
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function signIn(login, password) {
    return browser.findElement(webdriver.By.id('login_field')).sendKeys(login).then(() => {
        return browser.findElement(webdriver.By.id('password')).sendKeys(password);
    }).then(() => {
        return browser.findElement(webdriver.By.name('commit')).click();
    })
}

function createRepo() {
    return browser.findElement(webdriver.By.css('strong.reponame-suggestion')).getText().then((text) => {
        return browser.findElement(webdriver.By.id('repository_name')).sendKeys(text);
    }).then(() => {
        return browser.findElement(webdriver.By.id('repository_auto_init')).click();
    }).then(() => {
        return browser.wait(until.elementLocated(webdriver.By.css('div > button[type="submit"]')), 2000).then((el) => {
            el.click();
        }); 
    })
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://github.com/login').then(() => {
    return signIn("TestAutomationUser", "Time4Death!");
}).then(() => {
    return browser.findElement(webdriver.By.linkText('New repository')).click();
}).then(() => {
    return createRepo();
}).then(() => {
    return browser.findElement(webdriver.By.linkText('Settings')).click();
}).then(() => {
    closeBrowser();
}).catch((err) => {
    handleFailure(err);
});






