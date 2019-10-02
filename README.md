# Wordpress CMS Tips

## Adding a form - CMS
- HTML Contents blocks are parsed literally. You can use use the static site class names.
- The `Custom CSS Class` field under the `Appearance` tab of a field is used as the `id` of inputs on the static site.
- The `Description` section is not used.
- All forms will validate captcha. No need to add a captcha field from the CMS.
- Do not use a `Radio buttons` field for inputs with a single option. Use a `Checkbox` instead.
- All fields are required.
- Set the form title from within the form settings.
- Set the submit button text from within the settings page. `Form Button > Button Text`
- Set the redirect URL from the confirmations page. `Default confirmation > confirmation type = redirect`

## Adding a form - JS
- `library/api.js`
- The Form ID is displayed within wordpress when editing a form.
- Must link new form to validations via ID.
- Append new form within the `setUpForms` function.
- Add custom styles if neccesary.