import { AyobaStub } from "./ayobaStub.js";
import { Subject } from "rxjs";

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
        else throw err;
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
 * returns user's ayoba registered contacts
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
        else throw err;
    }
    return ayobaContacts
}

/**
 * returns all user's contacts
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
        else throw err;
    }
    return allContacts
}

/**
 * returns user's language code
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
        else throw err;
    }
    return lang
}

/**
 * opens a dialogue to share url string
 * @param {string} url string data to be shared
 * @param {()=>{}} successCb callback function called if no errors
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function shareUrl(url, successCb = null, errorCb = null) {
    try {
        Ayoba.shareUrl(url);
        if (typeof successCb == 'function') successCb()
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err;
    }
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

/**
 * initiate payment process.
 * @param {{method:string, amount:Number, currency: string, description?: string }} payload object containing payment details
 * @param {(payload: {transactionId:string, status: string, error:any}) => {}} successCb callback function for handling success response 
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function startPayment(payload, successCb = null, errorCb = null) {
    try {
        const { method, amount, currency, description } = payload
        Ayoba.startPayment(method, amount, currency, description);
        if (typeof successCb == 'function') successCb()
    } catch (err) {
        if (typeof errorCb == 'function') return errorCb(err)
        else throw err;
    }
}

export function sendGenericEvent(event, successCb = null, errorCb = null) {
    try {
        Ayoba.sendGenericEvent(event);
        if (typeof successCb == 'function') successCb()
    } catch (err) {
        if (typeof errorCb == 'function') return errorCb(err)
        else throw err;
    }
}

//Rxjs Subjects for making data from Ayoba hook functions observable
const locationSubject = new Subject()
const presenceSubject = new Subject()
const nicknameSubject = new Subject()
const avatarSubject = new Subject()
const carrierSubject = new Subject()
const securedMsisdnSubject = new Subject()

/**
 * passes an observed realtime location value to successCb
 * @param {({lon: string, lat: string}) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserLocation(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') locationSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}
/**
 * passes an observed realtime user-presence value to successCb
 * @param {(online: 0|1) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserPresence(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') presenceSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}
/**
 * passes a username to successCb
 * @param {(username: string) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserName(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') nicknameSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}
/**
 * passes an image url to successCb
 * @param {(imageUrl: string) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserAvatar(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') avatarSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}
/**
 * triggers a call to set the user Carrier value
 */
export function triggerSetCarrier() {
    try {
        Ayoba.getCarrier()
    } catch (err) {
        console.log(err);
    }
}
/**
 * passes the user's network carrier to successCb
 * @param {(carrier: string) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserCarrier(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') carrierSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}

/**
 * triggers a call to set the user's encrypted phone number
 */
export function triggerSetSecuredNumber() {
    try {
        Ayoba.getSecuredMsisdn()
    } catch (err) {
        console.log(err);
    }
}
/**
 * passes a user's encrypted phone number to successCb
 * @param {(encryptedNumber: string) => { }} successCb callback function for handling success response
 * @param {(err) => {}} errorCb callback function for handling error response
 */
export function getUserSecuredNumber(successCb, errorCb = null) {
    try {
        if (typeof successCb == 'function') securedMsisdnSubject.subscribe({next: (v) => successCb(v)})
    } catch (err) {
        if (typeof errorCb == 'function') errorCb(err)
        else throw err
    }
}


/**
 * The Ayoba hook functions must be exposed to the DOM
 * inorder for the Ayoba environment to identify and call them
 * 
 * The AyobaObserver object contains response methods for handling data 
 * passed from the hook functions. The methods are first declared in the DOM and 
 * later mutated.
 */
const script = document.createElement('SCRIPT')
const textnode = document.createTextNode(
    `
    var AyobaObserver = {
        onChangeLocation: (res) => {console.log(res)},
        onChangePresence: (res) => {console.log(res)},
        onChangeNickname: (res) => {console.log(res)},
        onChangeAvatar: (res) => {console.log(res)},
        onResponseGetCarrier: (res) => {console.log(res)},
        onResponseGetSecuredMsisdn: (res) => {console.log(res)}
    }
    function onLocationChanged(lon, lat) {
        try {
            AyobaObserver.onChangeLocation({lon,lat})
        } catch(err) {console.log(err)}
    }
    function onNicknameChanged(nickname) {
        try {
            AyobaObserver.onChangeNickname(nickname)
        } catch(err) {console.log(err)}
    }
    function onAvatarChanged(avatar) {
        try {
            AyobaObserver.onChangeAvatar(avatar)
        } catch(err) {console.log(err)}
    }
    function onPresenceChanged(presence) {
        try {
            AyobaObserver.onChangePresence(presence)
        } catch(err) {console.log(err)}
    }
    function onGetSecuredMsisdnResponse(securedMsisdn) {
        try {
            AyobaObserver.onResponseGetSecuredMsisdn(securedMsisdn)
        } catch(err) {console.log(err)}
    }
    function onGetCarrierResponse(carrier) {
        try {
            AyobaObserver.onResponseGetCarrier(carrier)
        } catch(err) {console.log(err)}
    }
    `
)
script.append(textnode)
document.body.append(script)

/**
 * mutate AyobaObserver methods to 
 * pass response values to the next(v) observer methods
 */
AyobaObserver.onChangeLocation = (res) => {locationSubject.next(res)}
AyobaObserver.onChangePresence = (res) => {presenceSubject.next(res)}
AyobaObserver.onChangeNickname = (res) => {nicknameSubject.next(res)}
AyobaObserver.onChangeAvatar = (res) => {avatarSubject.next(res)}
AyobaObserver.onResponseGetCarrier = (res) => {carrierSubject.next(res)}
AyobaObserver.onResponseGetSecuredMsisdn = (res) => {securedMsisdnSubject.next(res)}
