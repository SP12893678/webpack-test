import * as PIXI from 'pixi.js'
import Scene from '../engine/Scene'
import Button from '../component/button'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class CreatRoleScene extends Scene {
    constructor(width, height) {
        super()
        this.setBackground(width, height)
        this.setButton()
    }

    setBackground(width) {
        var background = new Sprite(resources['../src/assets/images/role.jpg'].texture)
        var scale = width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '創建角色'
        button.text.style.fill = 0x000000
        button.position.set(500, 100)
        button.click = () => {
            console.log(button)
            events.emit('goto', 'game_start')
        }
        this.addChild(button)
        this.button = button
    }

    update() {
        super.update()
    }
}
