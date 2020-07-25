import * as PIXI from 'pixi.js'
import Button from './component/button'

var EventEmitter = require('eventemitter3')
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class CreatRoleUI extends PIXI.Container {
    constructor(width, height) {
        super()
        this.setBackground(width, height)
        this.setButton()
    }

    setBackground(width) {
        var background = new Sprite(resources['../src/assets/images/OLO2ED0.jpg'].texture)
        var scale = width / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.position.set(100, 100)
        this.addChild(button)
        this.button = button

        button.click = () => {
            window.events.emit('back', this)
        }
    }
}
