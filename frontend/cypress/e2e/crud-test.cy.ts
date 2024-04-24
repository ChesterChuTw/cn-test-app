// 產生隨機六位數字
const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

// 測試待辦事項建立功能
describe('Todo List Create Test', () => {

    it('should add a new todo item', () => {
        cy.visit('/');

        // 輸入一個待辦事項並提交 (加上隨機號碼後輟，避免與使用者資料衝突)
        cy.get('#name').type('test title ' + randomSixDigitNumber); // 取得標題輸入框並輸入待辦事項標題
        cy.get('#description').type('test description ' + randomSixDigitNumber); // 取得描述輸入框並輸入待辦事項描述
        cy.get('.Form button').click(); // 取得提交按鈕並點擊

        // 檢查待辦事項是否已成功添加到清單中 (會加到最尾部)
        cy.get('.Card').last()
            .then((lastItem) => {
                // 檢查待辦事項的標題和描述是否一致
                expect(lastItem.find('.Card--text h1')).to.contain('test title ' + randomSixDigitNumber);
                expect(lastItem.find('.Card--text span')).to.contain('test description ' + randomSixDigitNumber);
            });
    });
});

// 測試待辦事項標注完成&刪除功能
describe('Todo List Update and Delete Test', () => {

    // 測試待辦事項標注完成功能
    it('should mark the item as "complete"', () => {
        cy.visit('/');

        // 標注最後一個待辦事項為完成
        cy.get('.Card').last()
            .then((lastItem) => {
                // 點擊完成按鈕
                cy.wrap(lastItem).find('.Card--button .Card--button__done').click();

                // 檢查待辦事項是否已標注為完成
                cy.wrap(lastItem).find('.Card--text h1').should('have.class', 'line-through');
                cy.wrap(lastItem).find('.Card--text span').should('have.class', 'line-through');
            });
    });

    // 測試待辦事項刪除功能
    it('should delete the item', () => {
        cy.visit('/');

        // 刪除最後一個待辦事項
        cy.get('.Card').last()
            .then((lastItem) => {
                // 點擊刪除按鈕
                cy.wrap(lastItem).find('.Card--button .Card-button__delete').click();

                // 最後一個待辦事項應該已經不存在
                cy.wrap(lastItem).should('not.exist');
            });
    });

});


