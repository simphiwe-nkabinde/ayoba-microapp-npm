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
 * @param {(res:string) => {}} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 * @returns {string} country code
 */
export function getUserPhoneNumber(onsuccess = null, onerror = null) {
    let phoneNumber = '';
    try {
        phoneNumber = Ayoba.getMsisdn();
        if (typeof onsuccess == 'function') onsuccess(phoneNumber)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err;
    }
    return phoneNumber;
}


/**
 * returns user's country code
 * @param {(res:string) => {}} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 * @returns {string} country code
 */
export function getUserCountryCode(onsuccess = null, onerror = null) {
    let countryCode = ''
    try {
        countryCode = Ayoba.getCountry();
        if (typeof onsuccess == 'function') onsuccess(countryCode)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else console.error(err)
    }
    return countryCode
}

/**
 * returns user's ayoba registered contacts
 * @param {(res) => {}} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
export function getUserAyobaContacts(onsuccess = null, onerror = null) {
    let ayobaContacts = ''
    try {
        ayobaContacts = Ayoba.getContacts();
        if (typeof onsuccess == 'function') onsuccess(ayobaContacts)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err;
    }
    return ayobaContacts
}

/**
 * returns all user's contacts
 * @param {(res) => {}} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 * @returns {string} JSON object: [ {name:string, phoneNumber: string}, . . . ]
 */
export function getAllUserContacts(onsuccess = null, onerror = null) {
    let allContacts = ''
    try {
        allContacts = Ayoba.getAllContacts();
        if (typeof onsuccess == 'function') onsuccess(allContacts)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err;
    }
    return allContacts
}

/**
 * returns user's language code
 * @param {(res:string) => {}} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 * @returns {string} user language code
 */
export function getUserLanguageCode(onsuccess = null, onerror = null) {
    let lang = ''
    try {
        lang = Ayoba.getLanguage();
        if (typeof onsuccess == 'function') onsuccess(lang)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err;
    }
    return lang
}

/**
 * opens a dialogue to share url string
 * @param {string} url string data to be shared
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function shareUrl(url, onerror = null) {
    try {
        Ayoba.shareUrl(url);
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err;
    }
}

/**
 * opens chat with an ayoba phone Number 
 * @param {string} ayobaNumber string data to be shared
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function startConversation(ayobaNumber, onerror = null) {
    if (!ayobaNumber) return
    try {
        Ayoba.startConversation(ayobaNumber)
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
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
 * @param {(payload: {transactionId:string, status: string, error:any}) => {}} onsuccess callback function for handling success response 
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function startPayment(payload, onerror = null) {
    try {
        const { method, amount, currency, description } = payload
        Ayoba.startPayment(method, amount, currency, description);
        if (typeof onsuccess == 'function') onsuccess()
    } catch (err) {
        if (typeof onerror == 'function') return onerror(err)
        else throw err;
    }
}

export function sendGenericEvent(event, onsuccess = null, onerror = null) {
    try {
        Ayoba.sendGenericEvent(event);
        if (typeof onsuccess == 'function') onsuccess()
    } catch (err) {
        if (typeof onerror == 'function') return onerror(err)
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
 * passes the user's observed realtime location to onchange callback
 * @param {(location: {lon: string, lat: string}) => { }} onchange callback function. receives location value
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function observeUserLocation(onchange, onerror = null) {
    try {
        if (typeof onchange == 'function') locationSubject.subscribe({next: (v) => onchange(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err
    }
}
/**
 * passes the user's observed realtime presence to onchange callback
 * @param {(online: 0|1) => { }} onchange callback function. receives user presence
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function observeUserPresence(onchange, onerror = null) {
    try {
        if (typeof onchange == 'function') presenceSubject.subscribe({next: (v) => onchange(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err
    }
}
/**
 * passes a username to onsuccess
 * @param {(username: string) => { }} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function getUserName(onsuccess, onerror = null) {
    try {
        if (typeof onsuccess == 'function') nicknameSubject.subscribe({next: (v) => onsuccess(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
        else throw err
    }
}
/**
 * passes an image url to onsuccess
 * @param {(imageUrl: string) => { }} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function getUserAvatar(onsuccess, onerror = null) {
    try {
        if (typeof onsuccess == 'function') avatarSubject.subscribe({next: (v) => onsuccess(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
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
 * passes the user's network carrier to onsuccess.
 * *triggerSetCarrier() must be called before this function inorder to set the carrier value
 * @param {(carrier: string) => { }} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function getUserCarrier(onsuccess, onerror = null) {
    try {
        if (typeof onsuccess == 'function') carrierSubject.subscribe({next: (v) => onsuccess(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
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
 * passes a user's encrypted phone number to onsuccess.
 * *triggerSetSecuredNumber() must be called before this function inorder to set the secured number value
 * @param {(encryptedNumber: string) => { }} onsuccess callback function for handling success response
 * @param {(err) => {}} onerror callback function for handling error response
 */
export function getUserSecuredNumber(onsuccess, onerror = null) {
    try {
        if (typeof onsuccess == 'function') securedMsisdnSubject.subscribe({next: (v) => onsuccess(v)})
    } catch (err) {
        if (typeof onerror == 'function') onerror(err)
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
