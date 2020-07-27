import * as PIXI from 'pixi.js'
import ScenesManager from '@/js/game/engine/ScenesManager'
import ResourcesManager from '@/js/game/engine/ResourcesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class Dialog extends PIXI.Container {
    constructor() {
        super()
        this.interactive = true
        this.setOverlay()
        this.setBoard()
    }

    setOverlay() {
        var overlay = new PIXI.Graphics()
        overlay.beginFill(0x000000, 0.45)
        overlay.drawRect(0, 0, ScenesManager.defaultWidth, ScenesManager.defaultHeight)
        overlay.endFill()
        this.addChild(overlay)
        this.overlay = overlay
    }

    setBoard() {
        var board = new Sprite(resources[ResourcesManager.menu].texture)
        var scale = (ScenesManager.defaultWidth * 0.4) / board.width
        board.scale.set(scale, scale)
        board.anchor.set(0.5, 0.5)
        board.position.set(ScenesManager.defaultWidth / 2, ScenesManager.defaultHeight / 2)
        this.addChild(board)
        this.board = board
    }
}
