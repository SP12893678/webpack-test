import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import Scene from '@/js/game/engine/Scene'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import ScenesManager from '@/js/game/engine/ScenesManager'
// import loadingBackground from '@/assets/images/OLO2ED0.jpg'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class LoadingScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setText()
        this.setLoadingBar()
    }

    setBackground() {
        console.log(ResourcesManager)
        var background = new Sprite(resources[ResourcesManager.loading_bg].texture)
        var scale = ScenesManager.defaultWidth / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setText() {
        var text = new PIXI.Text('加載資源000%', {
            fontFamily: 'Noto Sans TC',
            fontSize: 16,
            fill: 0x000000,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set((ScenesManager.defaultWidth - text.width) / 2, ScenesManager.defaultHeight - 65 - 5 - text.height)
        this.addChild(text)
        this.text = text
    }

    setLoadingBar() {
        let bar = new Sprite(resources[ResourcesManager.loading_bar].texture)
        bar.filters = [new GlowFilter(10, 1.6, 0)]
        var scale = ScenesManager.defaultWidth / (bar.width - 100)
        bar.scale.set(scale, scale)
        bar.position.set(-bar.width, ScenesManager.defaultHeight - 65)
        this.addChild(bar)
        this.bar = bar
    }

    update() {
        super.update()
    }
}
