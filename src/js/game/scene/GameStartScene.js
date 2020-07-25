import * as PIXI from 'pixi.js'
import Scene from '../engine/Scene'
import Button from '../component/button'
import CreatRoleScene from './CreatRoleScene'

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
        var background = new Sprite(resources['../src/assets/images/game-start.jpg'].texture)
        var scale = width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.position.set(100, 400)
        button.click = () => {
            events.emit('creat', { id: 'creat_role', scene: new CreatRoleScene(1000, 625) })
            events.emit('goto', 'creat_role')
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
