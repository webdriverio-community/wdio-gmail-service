# WebdriverIO Gmail Service [![Test](https://github.com/webdriverio-community/wdio-gmail-service/actions/workflows/test.yml/badge.svg)](https://github.com/webdriverio-community/wdio-gmail-service/actions/workflows/test.yml)

A WebdriverIO plugin to fetch e-mails from Google Mail using [Gmail Tester](https://github.com/levz0r/gmail-tester).

## Installation

The easiest way is to keep `wdio-gmail-service` as a `devDependency` in your package.json.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^1.0.0"
  }
}
```

You can simply do it by:

```sh
npm install wdio-gmail-service --save-dev
```

## Usage

### Gmail Authentication

You'll need to follow the instructions at [Gmail Tester](https://github.com/levz0r/gmail-tester) to create the `credentials.json` (the OAuth2 Authentication file) and `token.json` (the OAuth2 token).

### Configuration

Add the service by adding `gmail` to the service list, e.g.:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## Service Options

### credentialsJsonPath
Absolute path to a credentials JSON file.

Type: `string`

Required: `true`

### tokenJsonPath
Absolute path to a token JSON file.

Type: `string`

Required: `true`

### intervalSec
The interval between Gmail inbox checks.

Type: `number`

Default: `10`

Required: `false`

### timeoutSec
The maximum time to wait for finding the email for the given filters.

Type: `number`

Default: `60`

Required: `false`


## Writing tests

In your WebdriverIO test, you can now check if an email was received.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox` parameters

The command parameters require at least one of `from`, `to`, or `subject`:

### `from`
Filter on the email address of the receiver.

Type: `String`

### `to`
Filter on the email address of the sender.

Type: `String`

### `subject`
Filter on the subject of the email.

Type: `String`

### `includeBody`
Set to true to fetch decoded email bodies.

Type: `boolean`

### `includeAttachments`
Set to true to fetch the base64-encoded email attachments.

Type: `boolean`

### `before`
Filter messages received before the specified date.

Type: `Date`

### `after`
Filter messages received after the specified date.

Type: `Date`

### `label`
The default label is 'INBOX', but can be changed to 'SPAM', 'TRASH' or a custom label. For a full list of built-in labels, see https://developers.google.com/gmail/api/guides/labels?hl=en

Type: `String`

---

For more information on WebdriverIO see the [homepage](https://webdriver.io).
