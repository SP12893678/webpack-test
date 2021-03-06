import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import ScenesManager from '@/js/game/engine/ScenesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameMainScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setButton()
    }

    setBackground() {
        var background = new Sprite(resources[ResourcesManager.game_main].texture)
        var scale = ScenesManager.defaultWidth / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '返回'
        button.position.set(700, 400)
        button.click = () => {
            Events.emit('goto', { id: 'create_role', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
