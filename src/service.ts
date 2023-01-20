import { check_inbox } from 'gmail-tester'
import type { Services } from '@wdio/types'

import { CheckInboxOptions, WdioGmailServiceOptions } from './types.js'

export default class GmailService implements Services.ServiceInstance {
    private _credentialsJsonPath: string
    private _tokenJsonPath: string
    private _intervalSec: number
    private _timeoutSec: number
    constructor (serviceOptions: WdioGmailServiceOptions) {
        this._credentialsJsonPath = serviceOptions.credentialsJsonPath
        this._tokenJsonPath = serviceOptions.tokenJsonPath
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

        if (typeof this._credentialsJsonPath !== 'string') {
            throw new Error('Service option "credentialsJsonPath" not set, but required')
        }

        if (typeof this._tokenJsonPath !== 'string') {
            throw new Error('Service option "tokenJsonPath" not set, but required')
        }

        const wait_time_sec = this._intervalSec
        const max_wait_time_sec = this._timeoutSec
        return await check_inbox(
            this._credentialsJsonPath,
            this._tokenJsonPath,
            {
                from,
                to,
                subject,
                include_body: includeBody,
                before,
                after,
                include_attachments: includeAttachments,
                label,
                wait_time_sec,
                max_wait_time_sec
            }
        )
    }
}
