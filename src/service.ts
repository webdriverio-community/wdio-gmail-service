// eslint-disable-next-line camelcase
import { check_inbox } from 'gmail-tester'
import type { Credentials } from 'gmail-tester'
import type { Services } from '@wdio/types'

import type { CheckInboxOptions, WdioGmailServiceOptions } from './types.js'

export default class GmailService implements Services.ServiceInstance {
    private _credentials: string | Credentials
    private _token: string | Record<string, unknown>
    private _intervalSec: number
    private _timeoutSec: number
    constructor (serviceOptions: WdioGmailServiceOptions) {
        this._credentials = serviceOptions.credentials
        this._token = serviceOptions.token
        this._intervalSec = serviceOptions.intervalSec ?? 10
        this._timeoutSec = serviceOptions.timeoutSec ?? 60
    }

    async before(_: never, __: never, browser: WebdriverIO.Browser) {
        browser.addCommand('checkInbox', this._checkInbox.bind(this))
    }

    private async _checkInbox ({ from, to, subject, includeBody = true, before, after, includeAttachments = false, label = 'INBOX' }: CheckInboxOptions) {
        if (!from && !to && !subject) {
            throw new Error('At least one of `from`, `to` or `subject` need to be provided to checkInbox')
        }

        if (!this._credentials) {
            throw new Error('Service option "credentials" not set, but required')
        }

        if (!this._token) {
            throw new Error('Service option "token" not set, but required')
        }

        return await check_inbox(
            this._credentials,
            this._token,
            {
                from,
                to,
                subject,
                include_body: includeBody,
                before,
                after,
                include_attachments: includeAttachments,
                label,
                wait_time_sec: this._intervalSec,
                max_wait_time_sec: this._timeoutSec
            }
        )
    }
}
