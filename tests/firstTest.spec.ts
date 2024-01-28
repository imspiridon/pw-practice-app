import {test} from '@playwright/test'
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})


test.describe('test suite 1', () => {
    // test.beforeEach() can go at this level too
    test.beforeEach( async ({ page }) => {
        await page.getByText('Forms').click() 
    })
    test('navigate to form layouts', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigaet to datepicker', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})