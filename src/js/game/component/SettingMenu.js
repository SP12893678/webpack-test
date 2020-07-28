import * as PIXI from 'pixi.js'
import Overlay from './overlay'
import ScenesManager from '@/js/game/engine/ScenesManager'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class SettingMenu extends Overlay {
    constructor() {
        super()

        var background = new Sprite(resources[ResourcesManager.menu].texture)
        var scale = (ScenesManager.defaultWidth * 0.4) / background.width
        background.scale.set(scale, scale)
        background.anchor.set(0.5, 0.5)
        background.position.set(ScenesManager.defaultWidth / 2, ScenesManager.defaultHeight / 2)
        this.addChild(background)

        this.background = background
    }
}
