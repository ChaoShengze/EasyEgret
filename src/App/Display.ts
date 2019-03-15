namespace App.Display {
    /**
     * 安全移除显示对象
     * @param item 要移除的对象
     */
    export function safeRemove(item: egret.DisplayObject): void {
        if (item.parent) {
            item.parent.removeChild(item);
        }
    }
}