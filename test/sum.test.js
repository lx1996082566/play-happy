import sum from './sum'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})

test('two plus two is four', () => {
    expect(2 + 2) // 返回一个"期望"的对象
        .toBe(4); // toBe匹配器
});

test('object assignment', () => {
    const data = { one: 1 }
    data['two'] = 2
    expect(data)
        .toEqual({ one: 1, two: 2 }) // toEqual递归检查对象或数组的每个字段
})

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

test('null', () => {
    const n = null;
    expect(n).toBeNull(); // just null
    expect(n).toBeDefined(); // just undefined 
    expect(n).not.toBeUndefined(); //  not undefined
    expect(n).not.toBeTruthy(); // not true
    expect(n).toBeFalsy(); // just false
});

test('两个浮点数字相加', () => {
    const value = 0.1 + 0.2; // 0.30000000000000004
    //expect(value).toBe(0.3);           这句会报错，因为浮点数有舍入误差
    expect(value)
        .toBeCloseTo(0.3); // toBeCloseTo浮点数 这句可以运行
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph')
        .toMatch(/stop/); // toMatch 正则
});

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList)
        .toContain('beer'); // toContain 一个数组或可迭代对象是否包含某个特定项
    expect(new Set(shoppingList))
        .toContain('beer');
});

//如果要测试特定函数在调用时是否引发错误，请使用toThrow
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});
function fetchData(callback) {
    return callback('peanut butter')
}
test('the data is peanut butter', done => {
    function callback(data) {
        try {
            expect(data).toBe('peanut butter');
            done();
        } catch (error) {
            done(error);
        }
    }

    fetchData(callback);
});
function promise1() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('peanut butter')
        }, 100)
    })
}

test('the data is peanut butter', () => {
    // return promise1().then(data => {
    //     expect(data).toBe('peanut butter')
    // })
    return expect(promise1()).resolves.toBe('peanut butter');
})

function promise2() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            rej('error')
        }, 100)
    })
}

test('the fetch fails with an error', () => {
    expect.assertions(1); // 验证一定数量的断言被调用
    // return promise2().catch(data => {
    //     expect(data).toMatch('error')
    // })
    return expect(promise2()).rejects.toMatch('error');
})

// .only执行失败了就不会执行其他的 其他就处于skipped
// test.only('this will be the only test that runs', () => {
//     expect(true).toBe(false);
// });

// test('this test will not run', () => {
//     expect('A').toBe('A');
// });

const myMock = jest.fn(); // mock 函数

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();

// console.log(myMock.mock, myMock.mock.instances);

const { getChangedFilesForRoots } = require('jest-changed-files');

// 打印出当前目录最后修改过的一组文件 // 这里的目录是根目录
getChangedFilesForRoots(['./test'], {
    lastCommit: true,
}).then(result => {
    // return console.log(result.changedFiles)
});


// diff
const diff = require('jest-diff').default;

const m = { a: { b: { c: 5 } } };
const n = { a: { b: { c: 5 } } };

const diffR = diff(m, n);

// print diff
// console.log(diffR);