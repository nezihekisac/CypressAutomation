/// <reference types="Cypress" />


describe("SauceDemo Login test", function () {

    it("LogInTC-login as standard_user", function () {
        cy.visit('https://www.saucedemo.com/')
        cy.title().should('eq', "Swag Labs")
    })
    it("NegativeLogInTC-login with wrong credentials", () => {
        cy.get('#user-name').type('user')
        cy.get('#password').type('134567')
        cy.get('#login-button').click()
    })
    it("PositiveLogInTC-login with corect credentials", () => {
        cy.get('#user-name').clear().type('standard_user')
        cy.get('#password').clear().type('secret_sauce')
        cy.get('svg[class="svg-inline--fa fa-times fa-w-11 "]').click()
        cy.get('#login-button').click()
    })
    it('Buying first item', () => {

        cy.get('.inventory_item:visible').should('have.length', 6)
        cy.get('div.inventory_list').find('.inventory_item').should('have.length', 6)
        cy.get('div.inventory_list').find('.inventory_item').eq(1).contains('Add to cart').click()
        cy.wait(2000)
        console.log('sf')
    
        cy.get('div.inventory_list').find('.inventory_item').each(($el, index, $list) => {

            const textProduct = $el.find('inventory_item_name').text()
            if (textProduct.includes('Sauce Labs Bike Light')) {
                cy.wrap($el).find('btn btn_primary btn_small btn_inventory').click()
            }
        }) 
        cy.get('div.inventory_list').find('.inventory_item').eq(0).contains('Add to cart').click()
        cy.wait(2000)
        console.log('sf')

        cy.get('div.inventory_list').find('.inventory_item').each(($el, index, $list) => {

            const textProduct2 = $el.find('inventory_item_name').text()
            if (textProduct2.includes('Sauce Labs Backpack')) {
                cy.wrap($el).find('btn btn_primary btn_small btn_inventory').click()
            }
        })
       
        
        cy.get('.shopping_cart_link').click()
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.wait(2000)

        cy.get('.shopping_cart_link').click()




        cy.get('div.cart_item:visible').should('have.length', 2)
        
        cy.get('.cart_list').find('div.cart_item').should('have.length', 2)
        cy.get('.cart_list').find('div.cart_item').eq(1).contains('$29.99')
        console.log('sf')

        cy.get('div.cart_item:visible').should('have.length', 2)
      
        cy.get('.cart_list').find('div.cart_item').should('have.length', 2)
        cy.get('.cart_list').find('div.cart_item').eq(0).contains('$9.99')
        console.log('sf')

        cy.get('#checkout').click()


       
            cy.get('#first-name').type('user')
            cy.get('#last-name').type('user')
            cy.get('#postal-code').type('we234')
            cy.get('#continue').click()
            cy.wait(2000)

            cy.get('.summary_total_label').contains('$43.18')
      

    })


})
