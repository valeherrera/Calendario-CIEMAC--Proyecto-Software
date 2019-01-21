import { browser, by, element } from 'protractor';

describe('AgregarCursoProfesor', function () {
    beforeEach(async function () {
    await browser.waitForAngularEnabled(false);
    await browser.get("http://localhost:5000/AgregarCursoProfesor");
    });
   
    afterEach(function () {
   browser.restart();
    });


    it('Nombre de usuario requerido', async function () {
        browser.sleep(800);
        element(by.xpath('//*[@id="banner"]/div/button')).click().then(function () {
        browser.sleep(300);
        //expect(element(by.xpath('//*[@id="wrapper"]/ul/li/div/strong')).getText()).toEqual("Error:");
        });
        });

        /*
    it('Contraseña requerida', async function () {
        browser.sleep(500);
        element(by.id('username')).sendKeys('marlentrevi@gmail.com');
        element(by.name("login")).click().then(function () {
        browser.sleep(200);
        expect(element(by.xpath('//*[@id="wrapper"]/ul/li/div/strong')).getText()).toEqual("ERROR");
        });
        });
        
    it('Contraseña inválida', async function () {
        browser.sleep(500);
        element(by.id('username')).sendKeys('marlentrevi@gmail.com');
        element(by.id('password')).sendKeys('12345');
        element(by.name("login")).click().then(function () {
        browser.sleep(200);
        
        expect(element(by.xpath('//*[@id="wrapper"]/ul/li[1]/div/strong[1]')).getText()).toEqual("ERROR"
        );
        });
        });

      */  
               
   });