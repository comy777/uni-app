import Home from '../src/views/Home.vue'

describe('HelloWorld', () => {
    it('Should render the component', () => {
        expect(typeof Home.setup).toBe('function')
    })
})