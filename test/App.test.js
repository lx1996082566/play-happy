import Vue from 'vue'
import App from '../src/App.vue'

describe("App.test.js", () => {
    let cmp, vm;

    beforeEach(() => {
        cmp = Vue.extend(App);
        vm = new cmp({
            data: {
                messages: ["Cat"]
            }
        }).$mount();
    });

    it('messages是否等于["Cat"]', () => {
        expect(vm.messages).toEqual(["Cat"]);
    });
});

