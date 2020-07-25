import * as PIXI from 'pixi.js'
import Scene from '../engine/Scene'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class GameScene extends Scene {
    constructor() {
        super()

        //add a bunny :)
        this.bunny = new Sprite(resources['../src/assets/images/loadingbar.png'].texture)
        // center the sprites anchor point
        this.bunny.anchor.x = 0.5
        this.bunny.anchor.y = 0.5
        // move the sprite t the center of the screen
        this.bunny.position.x = 50
        this.bunny.position.y = 50

        this.addChild(this.bunny)
    }

    update() {
        super.update()
        this.bunny.rotation += 0.1
    }
}
