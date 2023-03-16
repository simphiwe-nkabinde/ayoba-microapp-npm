import { AyobaStub } from "./ayobaStub.js";
var Ayoba = getAyoba()

/**
* Determine the mobile operating system and returns the
* proper javascript interface
*/
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) return null

    if (/android/i.test(userAgent)) {
        try {
            return Android;
        } catch (error) {
            return null;
        }
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return null
    return "unknown";
}

if (Ayoba == null || Ayoba == 'unknown') {
    //Browser test Environment
    Ayoba = new AyobaStub();

} else {
    //Ayoba Environment
}

console.log(Ayoba);

/**
 * returns user's phone number
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} country code
 */
export function getUserPhoneNumber(successCb = null, errorCb = null) {
    let phoneNumber = '';
    try {
        phoneNumber = Ayoba.getMsisdn();
        if (typeof successCb == 'function') successCb(phoneNumber)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return phoneNumber;
}


/**
 * returns user's country code
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} country code
 */
export function getUserCountryCode(successCb = null, errorCb = null) {
    let countryCode = ''
    try {
        countryCode = Ayoba.getCountry();
        if (typeof successCb == 'function') successCb(countryCode)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err)
    }
    return countryCode
}

/**
 * returns user's ayoba registered contacts as JSON object
 * @param {(res) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
export function getUserAyobaContacts(successCb = null, errorCb = null) {
    let ayobaContacts = ''
    try {
        ayobaContacts = Ayoba.getAllContacts();
        if (typeof successCb == 'function') successCb(ayobaContacts)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return ayobaContacts
}

/**
 * returns all user's contacts as JSON object
 * @param {(res) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
export function getAllUserContacts(successCb = null, errorCb = null) {
    let allContacts = ''
    try {
        allContacts = Ayoba.getAllContacts();
        if (typeof successCb == 'function') successCb(allContacts)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return allContacts
}

/**
 * get user's language code
 * @param {(res:string) => {}} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 * @returns {string} user language code
 */
export function getUserLanguageCode(successCb = null, errorCb = null) {
    let lang = ''
    try {
        lang = Ayoba.getLanguage();
        if (typeof successCb == 'function') successCb(lang)
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else console.error(err);
    }
    return lang
}

/**
 * closes application
 */
export function closeApp() {
    try {
        Ayoba.finish()
    } catch (err) {
        console.error(err);
    }
}

//PAYMENTS
/**
 * initiate payment process.
 * @param {{method:string, amount:Number, currency: string, description?: string }} payload object containing payment details
 * @param {(payload: {transactionId:string, status: string, error:any}) => {}} successCb callback function for handling success response 
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function startPayment(payload, successCb, errorCb) {
    try {
        const { method, amount, currency, description } = payload
        const res = Ayoba.startPayment(method, amount, currency, description);
    } catch (err) {
        if (typeof errorCb == 'function') return errorCb(err)
        else console.error(err);
    }
}

export function sendGenericEvent(event, successCb = null, errorCb = null) {
    try {
        const res = Ayoba.sendGenericEvent(event);
        if (typeof successCb == 'function') successCb(res)
    } catch (err) {
        if (typeof errorCb == 'function') return errorCb(err)
        else console.error(err);
    }
}

//expose hook functions to DOM
const script = document.createElement('SCRIPT')
const textnode = document.createTextNode(
    `
    var userProfile = {name: '', profileImage: ''}

    function onLocationChanged(lon, lat) {
        console.log(lon, lat)
    }
    function onNicknameChanged(nickname) {
        console.log(nickname)
        userProfile.name = nickname
    }
    function onAvatarChanged(avatar) {
        console.log(avatar)
        userProfile.profileImage = avatar
    }
    `
)
script.append(textnode)
document.body.append(script)

export function getUserProfile() {
    return userProfile
}