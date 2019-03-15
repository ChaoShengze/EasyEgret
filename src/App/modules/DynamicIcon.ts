/**********************************************************
 **  动态图标，用以实现类似LOL和Dota2中技能Countdown的效果  **
 **********************************************************/

/**
 * 动态图标 特效种类枚举
 */
enum DynamicIconAnimationType {
    CW_Circle,
    AC_Circle,
    LeftToRight,
    RightToLeft,
    UpToDown,
    DownToUp
}

/**
 * 动态图标，可以实现多种效果
 * @description 可选效果见 枚举 DynamicIconAnimationType
 */
class DynamicIcon extends egret.DisplayObjectContainer {

    public iconImg: egret.Bitmap;
    public iconImgMask: egret.Bitmap;
    public extraMask: egret.Bitmap;
    public maskShape: egret.Shape;
    public animationType: number = DynamicIconAnimationType.CW_Circle;
    public isAC: boolean = false;
    public isPlaying: boolean = false;

    public action: Function = null;

    public get maskAngle(): number {
        switch (this.isAC) {
            case false:
            default:
                return 0;
            case true:
                return 6.283;
        }
    }

    public set maskAngle(ang: number) {
        this.maskShape.graphics.clear();
        this.maskShape.graphics.beginFill(0xffffff, 1);
        this.maskShape.graphics.moveTo(this.iconImgMask.width * 0.5, this.iconImgMask.height * 0.5);
        this.maskShape.graphics.lineTo(this.iconImgMask.width * 0.5, this.iconImgMask.height * 0.5);
        this.maskShape.graphics.drawArc(this.iconImgMask.width * 0.5, this.iconImgMask.height * 0.5, this.iconImgMask.width,
            this.isAC ? ang : 0,
            this.isAC ? 0 : ang);
        this.maskShape.graphics.lineTo(this.iconImgMask.width * 0.5, this.iconImgMask.height * 0.5);
        this.maskShape.graphics.endFill();
        this.iconImgMask.mask = this.maskShape;
    }

    public reSetting(): void {
        if (this.maskShape) {
            this.maskShape.graphics.clear();
        } else {
            this.maskShape = new egret.Shape();
        }
        this.maskShape.visible = true;
        this.maskShape.graphics.beginFill(0xffffff, 1);
        this.maskShape.graphics.drawRect(0, 0, this.iconImgMask.width, this.iconImgMask.height);
        this.maskShape.graphics.endFill();
        this.maskShape.scaleX = 0;
        this.maskShape.scaleY = 0;

        this.extraMask ? this.extraMask.visible = false : void 0;

        this.iconImgMask.mask = this.maskShape;
    }

    constructor(iconImage: egret.Bitmap, iconImageMask: egret.Bitmap, extraMask?: egret.Bitmap) {
        super();

        this.iconImg = iconImage;
        this.iconImgMask = iconImageMask;

        this.reSetting();

        let set = (img: egret.Bitmap) => {
            this.extraMask = img;
            this.extraMask.visible = false;
            this.addChild(this.extraMask);
        }

        extraMask ? set(extraMask) : void 0;
        this.addChild(this.maskShape);
        this.addChild(this.iconImg);
        this.addChild(this.iconImgMask);
    }

    private final(): void {
        this.maskShape ? this.maskShape.graphics.clear() : void 0;
        this.iconImgMask.mask = null;
        this.action ? this.action() : void 0;
        this.extraMask ? this.extraMask.visible = true : void 0;
        this.isPlaying = false;
    }

    public playAnimation(time: number): void {
        this.isPlaying = true;
        this.iconImg.visible = true;
        this.iconImgMask.visible = true;
        this.maskShape.visible = true;
        this.extraMask ? this.extraMask.visible = false : void 0;

        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.maskShape);

        let set = () => {
            this.maskShape.anchorOffsetX = this.maskShape.width;
            this.maskShape.anchorOffsetY = this.maskShape.height;
            this.maskShape.x = this.maskShape.width;
            this.maskShape.y = this.maskShape.height;
            this.maskShape.scaleX = 1;
        }

        let tw: egret.Tween;
        switch (this.animationType) {
            case DynamicIconAnimationType.CW_Circle:
                this.maskShape.scaleX = 1;
                this.maskShape.scaleY = 1;
                tw = egret.Tween.get(this);
                tw.to({ maskAngle: 6.283 }, time).call(() => {
                    this.final();
                });
                break;
            case DynamicIconAnimationType.AC_Circle:
                this.isAC = true;
                this.maskShape.scaleX = 1;
                this.maskShape.scaleY = 1;
                tw = egret.Tween.get(this);
                tw.to({ maskAngle: 0 }, time).call(() => {
                    this.final();
                });
                break;
            case DynamicIconAnimationType.LeftToRight:
                this.maskShape.scaleY = 1;
                tw = egret.Tween.get(this.maskShape);
                tw.to({ scaleX: 1, scaleY: 1 }, time).call(() => {
                    this.final();
                });
                break;
            case DynamicIconAnimationType.RightToLeft:
                this.maskShape.scaleY = 1;
                tw = egret.Tween.get(this.maskShape);
                tw.to({ scaleX: 1, scaleY: 1 }, time).call(() => {
                    this.final();
                });
                break;
            case DynamicIconAnimationType.UpToDown:
                set();
                tw = egret.Tween.get(this.maskShape);
                tw.to({ scaleX: 1, scaleY: 1 }, time).call(() => {
                    this.final();
                });
                break;
            case DynamicIconAnimationType.DownToUp:
                set();
                tw = egret.Tween.get(this.maskShape);
                tw.to({ scaleX: 1, scaleY: 1 }, time).call(() => {
                    this.final();
                });
                break;
            default:
                egret.error("illegal animationType：", this.animationType);
                return;
        }
    }

    public stopAnimation(): void {
        this.iconImgMask.mask = null;
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.maskShape);
    }

    public showMainIcon(): void {
        this.iconImg.visible = false;
        this.iconImgMask.visible = true;
        this.iconImgMask.mask = null;
        this.extraMask ? this.extraMask.visible = true : void 0;
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.maskShape);
    }

    public pauseAnimation(): void {
        egret.Tween.pauseTweens(this);
        egret.Tween.pauseTweens(this.maskShape);
    }

    public resumeAnimation(): void {
        egret.Tween.resumeTweens(this);
        egret.Tween.resumeTweens(this.maskShape);
    }
}