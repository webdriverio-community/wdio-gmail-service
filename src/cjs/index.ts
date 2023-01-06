const path = import('path')

exports.default = class CJSGmailService {
    private _credentialsJsonPath: string
    private _tokenJsonPath: string
    private _intervalSec: number
    private _timeoutSec: number

    constructor (serviceOptions: any, _capabilities: any, _config: any) {
        this._credentialsJsonPath = serviceOptions.credentialsJsonPath
        this._tokenJsonPath = serviceOptions.tokenJsonPath
        this._intervalSec = serviceOptions.intervalSec ?? 10
        this._timeoutSec = serviceOptions.timeoutSec ?? 60
    }

    async before(config: any, capabilities: any, browser: any) {
        const credentials_json_path = this._credentialsJsonPath
        const token_json_path = this._tokenJsonPath
        const wait_time_sec = this._intervalSec
        const max_wait_time_sec = this._timeoutSec
        browser.addCommand('checkInbox', async function ({ from, to, subject, includeBody = true, before, after, includeAttachments = false, label = 'INBOX' } : { from: string; to: string, subject: string, includeBody: boolean, before: Date, after: Date, includeAttachments: boolean, label: string }) {
            if (!from && !to && !subject) { 
                throw new Error('At least one of `from`, `to` or `subject` need to be provided to checkInbox')
            }
            return await import('gmail-tester').then(async (gt) => 
                gt.check_inbox((await path).resolve(credentials_json_path), (await path).resolve(token_json_path), { from, to, subject, include_body: includeBody, before, after, include_attachments: includeAttachments, label, wait_time_sec, max_wait_time_sec }))
        })
    }
}