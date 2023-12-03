
describe('Проверка авторизации', function () {
    
    it('1. Позитивный: правильный логин, правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#mail').type('german@dolnikov.ru'); // а) Ввести правильный логин
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('iLoveqastudio1'); // б) Ввести правильный пароль
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click(); // в) Нажать войти
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // г) Проверить нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // и наличие кнопки крестик
    })

    it('2. Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#forgotEmailButton').click(); // а) Нажать «Забыли пароль»
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible');
        cy.get('#mailForgot').type('german@dolnikov.ru'); // б) Ввести любой имейл
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // в) Проверка, что получили нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // и есть кнопка крестика
    })

    it('3. Негативный: правильный логин, НЕ правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#mail').type('german@dolnikov.ru'); // а) Ввести правильный логин
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('badpass'); // б) Ввести НЕ правильный пароль
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click(); // в) Нажать войти
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // г) Проверить нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // и наличие кнопки крестик
    })
    
    it('4. Негативный: НЕ правильный логин, правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#mail').type('bad@login.ru'); // а) Ввести НЕ правильный логин
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('iLoveqastudio1'); // б) Ввести правильный пароль
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click(); // в) Нажать войти
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // г) Проверить нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // и наличие кнопки крестик
    })

    it('5. Негативный: логин без @, правильный пароль', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#mail').type('germandolnikov.ru'); // а) Ввести логин без @
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('iLoveqastudio1'); // б) Ввести правильный пароль
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click(); // в) Нажать войти
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // г) Проверить, что получаем текст с ошибкой
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('6. Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/');
        cy.get('#loginButton').should('be.disabled');
        cy.get('#mail').type('GerMan@Dolnikov.ru'); // а) Ввести логин без @
        cy.get('#loginButton').should('be.disabled');
        cy.get('#pass').type('iLoveqastudio1'); // б) Ввести правильный пароль
        cy.get('#loginButton').should('be.enabled');
        cy.get('#loginButton').click(); // в) Нажать войти
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // г) Проверить, что авторизация успешна (нужный текст
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // и наличие кнопки крестик)
    })
})
