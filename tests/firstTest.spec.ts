import {expect, test} from '@playwright/test'
test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('Locator syntax rules', async ( {page} ) => {
    // by tag name
    page.locator('input')

    // by id
    await page.locator('#inputEmail1')
        .click();

    // by class value
    page.locator('.input-full-width')

    // by attribute
    page.locator('[placeholder="Email"]')

    // by entire class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different locators
    page.locator('input[placeholder="Email"].input-full-width')

    // by xpath (not recommended)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User-facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: 'Email'}).first().click();
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('IoT Dashboard').click();
    // await page.getByTestId('something')

})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
})

test('locating parent elemtsn', async ({ page }) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Password'}).click();
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click();
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
        .getByRole('textbox', {name: 'Email'}).click();
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: 'Email'}).click();
})
test('reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const basicFormEmail = basicForm.getByRole('textbox', {name: 'Email'})
    
    await basicFormEmail.fill('test@test.com');
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('password');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(basicFormEmail).toHaveValue('test@test.com');
})

test('extracting values', async ({ page }) => { 
    // get single text value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const buttonText = await basicForm.getByRole('button').textContent();

    expect(buttonText).toEqual('Submit');

    // all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonLabels).toContain('Option 1')

    // input value
    const basicFormEmail = basicForm.getByRole('textbox', {name: 'Email'})
    await basicFormEmail.fill('test@test.com');
    const emailValue = await basicFormEmail.inputValue();
    expect(emailValue).toEqual('test@test.com');

    const placeholderValueEmail = await basicFormEmail.getAttribute('placeholder')
    expect(placeholderValueEmail).toEqual('Email')
})
// test.describe('test suite 1', () => {
//     // test.beforeEach() can go at this level too
//     test.beforeEach( async ({ page }) => {
//         await page.getByText('Forms').click() 
//     })
//     test('navigate to form layouts', async ({ page }) => {
//         await page.getByText('Form Layouts').click()
//     })

//     test('navigate to datepicker', async ({ page }) => {
//         await page.getByText('Datepicker').click()
//     })
// })