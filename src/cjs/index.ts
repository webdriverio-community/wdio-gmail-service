exports.default = class CJSGmailService {
    private isCJS = true
    private instance?: any

    constructor(options: never) {
        this.instance = import('../service.js').then((GmailService) => {
            return new GmailService.default(options)
        })
    }

    async before (...args: never[]) {
        const instance = await this.instance
        return instance.before(...args)
    }
}
