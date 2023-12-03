
describe('Проверка авторизации', function () {
    
    it('Покупка нового фото для тренера', function () {
        cy.clearCookies('https://pokemonbattle.me/'); // чистим куки
        cy.visit('https://pokemonbattle.me/').wait(1000); // открыть сайт покемонов
        cy.get(':nth-child(1) > .auth__input').type('random7342587@ya.ru'); // ввести правильный логин
        cy.get('#password').type('RTandom7tghnn09'); // ввести правильный пароль
        cy.get('.auth__button').click().wait(1000); // нажать войти
        cy.get('.header__btns > [href="/shop"]').click().wait(1000); // открыть магазин
        cy.get('.shop__item').not('.feature-empty').children('.shop__button').eq(Math.floor(Math.random() * 11)).click().wait(1000); // рандомно выбираем лот не помеченный классом ".feature-empty", жмем на его кнопку
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('2202206344499855'); // вводим номер карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('0124'); // вводим срок действия карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // вводим код
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Cthulhu Cthulhovich'); // вводим имя
        cy.get('.pay-btn').click().wait(1000); // жмакаем оплатить, ни в чем себе не отказывая :)
        cy.get('#cardnumber').type('56456'); // вводим код для успешной оплаты
        cy.get('.payment__submit-button').click().wait(1000); // жмем кнопку
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // проверяем сообщение об успешной отправке
        cy.get('.payment__adv').click(2).wait(1000); // возвращаемся в магазин
    })

})
