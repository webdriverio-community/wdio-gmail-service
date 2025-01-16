import { test, expect, vi } from 'vitest'
// eslint-disable-next-line camelcase
import { check_inbox } from 'gmail-tester'

import GmailService from '../src/index.js'

vi.mock('gmail-tester', () => ({
    check_inbox: vi.fn().mockResolvedValue([{ some: 'email' }])
}))

test('registers checkInbox command', () => {
    const service = new GmailService({} as any)
    const browser: any = {
        addCommand: vi.fn()
    }
    service.before(null as never, null as never, browser)
    expect(browser.addCommand).toBeCalledWith('checkInbox', expect.any(Function))
})

test('throws if required options not set', async () => {
    const service = new GmailService({} as any)
    await expect(() => service['_checkInbox']({ from: 'foo' } as any)).rejects.toThrow(/not set, but required/)
    service['_credentials'] = 'foo'
    await expect(() => service['_checkInbox']({ from: 'foo' } as any)).rejects.toThrow(/not set, but required/)
})

test('throws if from, to or subject is not set', async () => {
    const service = new GmailService({} as any)

    await expect(() => service['_checkInbox'](undefined as any)).rejects.toThrow()
    await expect(() => service['_checkInbox']({} as any)).rejects.toThrow(/At least one/)
})

test('throws if from, to or subject is not set', async () => {
    const service = new GmailService({
        credentials: 'foo',
        token: 'bar'
    } as any)

    await service['_checkInbox']({ from: 'foo' })
    expect(check_inbox).toBeCalledWith(
        expect.any(String),
        expect.any(String),
        expect.any(Object)
    )
})
