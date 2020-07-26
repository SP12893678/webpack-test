import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameStartScene extends Scene {
    constructor(width, height) {
        super()
        this.setBackground(width, height)
        this.setButton()
    }

    setBackground(width) {
        var background = new Sprite(resources[ResourcesManager.game_start].texture)
        var scale = width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.position.set(100, 400)
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
