import * as PIXI from 'pixi.js'
// import load_resources from './assets/json/resources.json'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameStartUI {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.container = new Container()
        this.setBackground()
        this.setText()
    }

    setBackground() {
        var background = new Sprite(resources['./src/assets/images/game-start.jpg'].texture)
        var scale = this.width / background.width
        background.scale.set(scale, scale)
        this.container.addChild(background)
    }

    setText() {
        var text = new PIXI.Text('Click to Start', {
            fontFamily: 'Raleway',
            fontSize: 32,
            fill: 0xf1f1f1,
            align: 'center',
        })
        text.position.set((this.width - text.width) / 2, ((this.height - text.height) / 4) * 3)
        this.container.addChild(text)
    }
}
