import * as PIXI from 'pixi.js'
import Scene from './Scene'

export default class ScenesManager {
    constructor() {
        this.scenes = {}
        this.currentScene = null
        this.renderer = null
    }

    create(width, height) {
        if (this.renderer) return this

        this.renderer = new PIXI.autoDetectRenderer({
            view: document.getElementById('app'),
            width: width,
            height: height,
        })

        // this.renderer = PIXI.autoDetectRenderer(width, height)
        // document.body.appendChild(this.renderer.view)
        this.loop()
        return this
    }
    loop() {
        requestAnimationFrame(this.loop.bind(this))

        if (!this.currentScene || this.currentScene.isPaused()) return
        this.currentScene.update()
        this.renderer.render(this.currentScene)
    }

    createScene(id, myScene = new Scene()) {
        if (this.scenes[id]) return undefined

        var scene = myScene
        this.scenes[id] = scene
        return scene
    }

    goToScene(id) {
        if (this.scenes[id]) {
            if (this.currentScene) this.currentScene.pause()
            this.currentScene = this.scenes[id]
            this.currentScene.resume()
            return true
        }
        return false
    }
}
