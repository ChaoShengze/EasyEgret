namespace App.Maths {
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    export function limit($from: number, $end: number): number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range: number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(整数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    export function limitInteger($from: number, $end: number): number {
        return Math.round(this.limit($from, $end));
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    export function randomArray(arr: Array<any>): any {
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    /**
     * 打乱数组的实现函数
     */
    function $randomsort(a: any, b: any): number {
        return Math.random() > .5 ? -1 : 1;
    }

    /**
     * 随机打乱一个数组
     * @param arr 要打乱的数组
     * @returns {T[]} 打乱之后的数组
     */
    export function randomSort<T>(arr: T[]): T[] {
        return arr.sort($randomsort);
    }

    /**
     * 合并多个数组
     * @param arr 要合并的数组
     * @returns {T[]} 合并出来的数组
     */
    export function mergeArray<T>(...arr: T[][]): T[] {
        let $arr: T[] = [];
        arr.forEach((_arr) => {
            $arr = $arr.concat(_arr);
        });
        return $arr;
    }
}