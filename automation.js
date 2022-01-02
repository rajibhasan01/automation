const { Builder, By, Key, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

//Login to the system
async function goToLoginPage() {
    return new Promise(async function (resolve, reject) {
        await driver.findElement(By.xpath("//a[@class='btn btn-primary'][normalize-space()='Login']")).click();
        await driver.sleep(2000);
        driver.findElement(By.xpath("//input[@id='lEmail']")).sendKeys("mushfiqur@braincraftapps.com");
        await driver.sleep(2000);
        driver.findElement(By.xpath("//input[@id='password']")).sendKeys("Nayeem-225!");
        await driver.sleep(2000);
        let loginBtn = driver.findElement(By.xpath("//button[normalize-space()='Log In']"));
        await driver.sleep(2000);
        await driver.executeScript("arguments[0].click();", loginBtn)
        resolve(true);
    })
}

//Goto create gif page
const createGifPage = async () => {
    await driver.findElement(By.xpath("//a[@href='/gif-maker']//div//span")).click();
    driver.quit();
}


function openWebsite() {
    //Open the website in the browser 
    driver.get("https://dev.gifbuz.com/").then(async function () {
        console.log('not logged  in');
        await driver.sleep(2000);
        await driver.findElement(By.xpath("//button[@id='rcc-confirm-button']")).click();
        await driver.sleep(2000);
        await goToLoginPage();
        let interval = setInterval(() => {
            driver.getCurrentUrl().then(function (url) {
                if (url === 'https://dev.gifbuz.com/dashboard/my-upload') {
                    clearInterval(interval);
                    createGifPage();
                }
            });
        }, 1000);
    })
}

openWebsite();
