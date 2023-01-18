# wdio-gmail-service
A WebdriverIO plugin to fetch e-mails from Google Mail. Wraps [Gmail Tester](https://github.com/levz0r/gmail-tester)

## Usage

### Gmail Authentication

You'll need to follow the instructions at [Gmail Tester](https://github.com/levz0r/gmail-tester) to create the `credentials.json` (the OAuth2 Authentication file) and `token.json` (the OAuth2 token). 

### Configuration

// wdio.conf.js
```js
const { join } = require('path')

export.config = {
    // ...
    services: [["gmail-service", {
        credentialsJsonPath: join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10
        timeoutSec: 60
    }]]
    // ...
};
```


## Service Options

### credentialsJsonPath  
Path to credentials JSON file

Example: join(process.cwd(), './credentials.json')

Type: string

Required: true

### tokenJsonPath
Path to token JSON file

Example: join(process.cwd(), './token.json')

Type: string

Required: true

### intervalSec
Interval between gmail inbox checks

Type: number

Default: 10

Required: false

### timeoutSec
The maximum time to wait for finding the email for the given filters

Type: number

Default: 60

Required: false


## Writing tests

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account

        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });

        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')


    })
})
```

## checkInbox parameters. Require at least one of from, to, or subject

```from```: String. Filter on the email address of the receiver.   
```to```: String. Filter on the email address of the sender.   
```subject```: String. Filter on the subject of the email.   
```includeBody```: boolean. Set to true to fetch decoded email bodies.   
```includeAttachments```: boolean. Set to true to fetch the base64-encoded email attachments.   
```before```: Date. Filter messages received before the specified date.   
```after```: Date. Filter messages received after the specified date.   
```label```: String. The default label is 'INBOX', but can be changed to 'SPAM', 'TRASH' or a custom label. For a full list of built-in labels, see https://developers.google.com/gmail/api/guides/labels?hl=en   
