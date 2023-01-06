import type { Capabilities, Options, Services } from '@wdio/types'
import { check_inbox } from 'gmail-tester'
import { resolve } from 'path'
import { CheckInboxOptions, WdioGmailServiceOptions } from './types.js'


export default class GmailService implements Services.ServiceInstance {
    private _credentialsJsonPath: string
    private _tokenJsonPath: string
    private _intervalSec: number
    private _timeoutSec: number
    constructor (private serviceOptions: WdioGmailServiceOptions, private _capabilities: Capabilities.Capabilities, private _config: Options.Testrunner) {
        this._credentialsJsonPath = serviceOptions.credentialsJsonPath
        this._tokenJsonPath = serviceOptions.tokenJsonPath
        this._intervalSec = serviceOptions.intervalSec ?? 10
        this._timeoutSec = serviceOptions.timeoutSec ?? 60
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(capabilities: Capabilities.Capabilities, specs: string[], browser: any) {
        const credentials_json_path = this._credentialsJsonPath
        const token_json_path = this._tokenJsonPath
        const wait_time_sec = this._intervalSec
        const max_wait_time_sec = this._timeoutSec
        browser.addCommand('checkInbox', async function ({ from, to, subject, includeBody = true, before, after, includeAttachments = false, label = 'INBOX' } : CheckInboxOptions) {
            if (!from && !to && !subject) { 
                throw new Error('At least one of `from`, `to` or `subject` need to be provided to checkInbox');
            }
            return await check_inbox(resolve(credentials_json_path), resolve(token_json_path), { from, to, subject, include_body: includeBody, before, after, include_attachments: includeAttachments, label, wait_time_sec, max_wait_time_sec })
        })
    }
}