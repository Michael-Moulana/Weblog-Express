const settingModel = require('@models/setting')

exports.index = async (req, res) => {

    const settings = await settingModel.findAll()
    const presentedSettings = {}

    // converting an array of objects to an object
    settings.forEach( item => {
        presentedSettings[item.setting_name] = item.setting_value
    })

    res.adminRender('admin/settings/index', {
        config: presentedSettings, helpers: {
            isChecked: function(value, options) {
                // if true, 
                return parseInt(value) === 1 ? options.fn(this) : options.inverse(this)
            }
        }
    })
}

exports.store = async (req, res) => {
    // all data received from body
    const settings = req.body
    // new object for adding data from checkboxes to it
    const validatedSettings = {}

    //object.keys() returns keys of a json obj
    //for example, setting_name will be returned as a second key,
    // then foreach will do actions on the retured value
    // forEach will give the keys of settings object as a input
    Object.keys(settings).forEach( (setting_name) => {
        // if checkbox is marked as checked, the value will be 'on',
        // otherwise there will not be a key-value pair for that key.

        if (settings[setting_name] === 'on') {
            validatedSettings[setting_name] = 1
        } else {
            validatedSettings[setting_name] = settings[setting_name]
        }
    })

    if (!validatedSettings.hasOwnProperty('users_can_register')) {
        validatedSettings.users_can_register = 0
    }

    if (!validatedSettings.hasOwnProperty('users_can_submit_comment')) {
        validatedSettings.users_can_submit_comment = 0
    }

    await settingModel.update(validatedSettings)
    req.flash('success', ['تنظیمات جدید با موقیت ذخیره شدند'])
    res.redirect('/admin/settings')
}

