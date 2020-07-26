import * as PIXI from 'pixi.js'
import Scene from './Scene'

class ScenesManager {
    constructor() {
        this.scenes = {}
        this.currentScene = null
        this.renderer = null
        this.defaultWidth = 1000
        this.defaultHeight = 625
    }

    create(width, height) {
        if (this.renderer) return this

        this.renderer = new PIXI.autoDetectRenderer({
            view: document.getElementById('app'),
            width: width,
            height: height,
        })
        // this.renderer.autoResize = true
        // this._rescale()
        // window.addEventListener('resize', this._rescale.bind(this), false)

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

    _rescale() {
        this.ratio = Math.min(window.innerWidth / this.defaultWidth, window.innerHeight / this.defaultHeight)
        this.width = this.defaultWidth * this.ratio
        this.height = this.defaultHeight * this.ratio
        console.log(this.width, this.height)
        this.renderer.resize(this.width, this.height)
    }
}

export default new ScenesManager()
