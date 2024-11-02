import { vi, test, expect } from 'vitest'
const Service = require('../../')

vi.mock('../../src/service.js', () => class {
    before () {
        return 'beforeCalled'
    }
})

test('should export the right method', async () => {
    const service = new Service.default({})
    const browser = { addCommand: vi.fn() }
    await service.before(null, null, browser)
    expect(service['isCJS']).toBe(true)
    expect(browser.addCommand).toBeCalledTimes(1)
})
