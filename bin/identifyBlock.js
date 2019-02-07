// 思路： 定义所有最小值构成的方块枚举
// 定义旋转矩阵用于旋转图形
// 每一组数字旋转4次进行判断
// 每一次循环将数字平移到左上角（最小值）
// 枚举判断

const rotate_table = {
    1: 13, 2: 9, 3: 5, 4: 1,
    5: 14, 6: 10, 7: 6, 8: 2,
    9: 15, 10: 11, 11: 7, 12: 3,
    13: 16, 14: 12, 15: 8, 16: 4
}

function rotate(numbers) {
    return numbers.map(n => rotate_table[n]);
}

// 向左平移
function shift_left(numbers) {
    // 计算需要平移几行，n-1处理边界值，比如4，8
    let shift_count = Math.min(...numbers.map(n => (n - 1) % 4));
    return numbers.map(n => n - shift_count);
}

// 向上平移
function shift_up(numbers) {
    // 计算需要平移几行，n-1处理边界值，比如4，8
    let shift_count = Math.min(...numbers.map(n => Math.floor((n - 1) / 4)));
    return numbers.map(n => n - shift_count * 4);
}

// 定义最小数字组成图形
const blocks = {
    '1,5,9,13': 'I',
    '2,6,9,10': 'J',
    '1,5,9,10': 'L',
    '1,2,5,6': 'O',
    '2,3,5,6': 'S',
    '1,2,3,6': 'T',
    '1,2,6,7': 'Z'
}

function identify(numbers) {
    let numbers_str = numbers.slice().sort((a, b) => a - b).join();
    if (numbers_str in blocks)
        return blocks[numbers_str];
    return null;
}

function identifyBlock(numbers) {
    /*
    grid(4x4):
    +--+--+--+--+
    |1 |2 |3 |4 |
    +--+--+--+--+
    |5 |6 |7 |8 |
    +--+--+--+--+
    |9 |10|11|12|
    +--+--+--+--+
    |13|14|15|16|
    +--+--+--+--+

    blocks(7 kinds):
    'I'  'J'  'L'  'O'  'S'  'T'  'Z'

     *    *   *    **    **  ***  **
     *    *   *    **   **    *    **
     *   **   **
     *

    */
    for (let i = 0; i < 4; ++i) {
        let result = identify(shift_left(shift_up(numbers)));
        // console.log(result)
        if (result !== null)
            return result;

        // 旋转图形 上下左右4次循环
        numbers = rotate(numbers);
    }
    return null;
}

var assert = require('assert');

if (!global.is_checking) {
    assert.equal(identifyBlock([10, 13, 14, 15]), 'T', 'T');
    assert.equal(identifyBlock([1, 5, 9, 6]), 'T', 'T');
    assert.equal(identifyBlock([2, 3, 7, 11]), 'L', 'L');
    assert.equal(identifyBlock([4, 8, 12, 16]), 'I', 'I');
    assert.equal(identifyBlock([3, 1, 5, 8]), null, 'null');
    console.log('"Run" is good. How is "Check"?');
}
