# Ayoba Webpack API for ayoba microapps

A brief description of what this project does and who it's for
## Installation

NPM

```npm i ayoba-microapp-api```

CDN

```<script src="https://cdn.jsdelivr.net/gh/The-DigitalAcademy/ayoba-microapp-cdn@/microapp.js"></script>```
## Features
##### Get the following user's info
- [phone number](#getUserPhoneNumber)
- [country](#getUserCountryCode)
- [contacts](#getAllUserContacts)
- [language](#getUserLanguageCode)
- [realtime location](#getUserLocation)
- [presence](#observeUserPresence)
- [network carrier]()

##### excecute the following functions
- [close application](#closeApp)
- [initiate chat](#startConversation)
- [open share dialogue](#shareUrl)
- [initialize payment](#startPayment)




## getUserPhoneNumber()
returns user's phone number

```
import { getUserPhoneNumber } from 'ayoba-microapp-api'

const userPhone = getUserPhoneNumber()

// OR

function myFunction() {
    const userPhone = getUserPhoneNumber(
        (val) => {console.log('success:', val)},
        (err) => {console.error(err)}
    )
    console.log("user's phone number:", userPhone)
}
```

#### parameters
```
successCb?: (res:string) => { }
```
- *optional*. callback function for handling success response

```
errorCb?: (err:any) => { }
``` 

- *optional*. callback function for handling error response

#### returns 
```phoneNumber: string```
## getUserCountryCode()
returns user's country code

```
import { getUserCountryCode } from 'ayoba-microapp-api'

const userCountry = getUserCountryCode()

//OR

function myFunction() {
    const userCountry = getUserCountryCode(
        (val) => {console.log('success:', val)},
        (err) => {console.error(err)}
    )
    console.log("user's phone number:", userCountry)
}
```

#### parameters
```
successCb?: (res:string) => { }
```
- *optional*. callback function for handling success response

```
errorCb?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### returns 
```phoneNumber: string```
## getUserLanguageCode()
returns user's language code

```
import { getUserLanguageCode } from 'ayoba-microapp-api'

const language = getUserLanguageCode()

//OR

function myFunction() {
    const language = getUserLanguageCode(
        (val) => {console.log('success:', val)},
        (err) => {console.error(err)}
    )
    console.log("user's phone number:", language)
}
```

#### parameters
```
successCb?: (res:string) => { }
```
- *optional*. callback function for handling success response

```
errorCb?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### returns 
```phoneNumber: string```
## getUserAyobaContacts()
returns user's ayoba registered contacts

```
import { getUserAyobaContacts } from 'ayoba-microapp-api'

const userContacts = getUserAyobaContacts()

//OR

function myFunction() {
    const userContacts = getUserAyobaContacts(
        (val) => {console.log('success:', val)},
        (err) => {console.error(err)}
    )
    console.log("user's contacts:", userContacts)
}
```

#### parameters
```
successCb?: (res:string) => { }
```
- *optional*. callback function for handling success response

```
errorCb?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### returns 
```contacts: string JSON: [ {name:string, phoneNumber: string}, . . . ]```
## getAllUserContacts()
returns all user's contacts
```
import { getAllUserContacts } from 'ayoba-microapp-api'

const allUserContacts = getAllUserContacts()

//OR

function myFunction() {
    const allUserContacts = getAllUserContacts(
        (val) => {console.log('success:', val)},
        (err) => {console.error(err)}
    )
    console.log("user's contacts:", allUserContacts)
}
```

#### parameters
```
successCb?: (res:string) => { }
```
- *optional*. callback function for handling success response

```
errorCb?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### returns 
```contacts: string JSON: [ {name:string, phoneNumber: string}, . . . ]```
## observeUserLocation()
passes the user's observed realtime location to *onchange* callback
```
import { observeUserLocation } from 'ayoba-microapp-api'

observeUserLocation(
    (val) => {console.log('current location:', val)},
    (err) => {console.error(err)}
)
```

#### parameters
```
onchange: (location: {lon: string, lat: string}) => { }
```
- *required*. callback function. receives location value

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## observeUserPresence()
passes the user's observed realtime presence to *onchange* callback
```
import { observeUserPresence } from 'ayoba-microapp-api'

observeUserPresence(
    (val) => {console.log('presence:', val)},
    (err) => {console.error(err)}
)
```

#### parameters
```
onchange: (online: 0|1) => { }
```
- *required*. callback function. receives user presence
- 1 = user is present
- 0 = user is not present

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## getUserName()
passes a username to *onsuccess* callback
```
import { getUserName } from 'ayoba-microapp-api'

getUserName(
    (val) => {console.log('username:', val)},
    (err) => {console.error(err)}
)
```

#### parameters
```
onsuccess: (username: string) => { }
```
- *required*. callback function. receives username

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## getUserAvatar()
passes an image url to *onsuccess* callback
```
import { getUserAvatar } from 'ayoba-microapp-api'

getUserAvatar(
    (val) => {console.log('avatar:', val)},
    (err) => {console.error(err)}
)
```

#### parameters
```
onsuccess: (imageUrl: string) => { }
```
- *required*. callback function. receives image url

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## closeApp()
closes application
```
import { closeApp } from 'ayoba-microapp-api'

function onInput() {
    closeApp()
}
```
## startConversation()
opens chat with an ayoba phone Number 
```
import { startConversation } from 'ayoba-microapp-api'

function onInput() {
    startConversation('+27974549153')
}
```
#### parameters
```
ayobaNumber: string
```
- *required*. ayoba registered number

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## shareUrl()
opens a dialogue to share url string
```
import { shareUrl } from 'ayoba-microapp-api'

function onInput() {
    shareUrl('https://www.npmjs.com/package/ayoba-microapp-api')
}
```
#### parameters
```
url: string
```
- *required*. data string to be shared

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value
## startPayment()
opens a dialogue to share url string
```
import { startPayment } from 'ayoba-microapp-api'

function onInput() {
    shareUrl('https://www.npmjs.com/package/ayoba-microapp-api')
}
```
#### parameters
```
payload: {method:string, amount:Number, currency: string, description?: string }
```
- *required*. payment data

```
onerror?: (err:any) => { }
``` 
- *optional*. callback function for handling error response

#### no return value