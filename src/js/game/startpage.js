import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles'
import { OutlineFilter } from 'pixi-filters'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

import emitter_test from '@/assets/json/emitter.json'
import emitter_shot from '@/assets/json/emitter-shot.json'

import Button from './component/button'

// import load_resources from './assets/json/resources.json'
gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

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
        this.setButton()
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
        text.filters = [new OutlineFilter(1, 0xf0aaee)]

        text.alpha = 0.5
        text.anchor.set(0.5, 0.5)
        text.position.set(this.width / 2, (this.height / 4) * 3)
        this.container.addChild(text)
        this.text = text
        this.doGASP(text, 1)
    }

    doGASP(sprite, alpha) {
        this.animation = gsap.to(sprite, {
            pixi: { scaleX: 1.5, scaleY: 1.5, alpha: alpha, positionY: sprite.position.y + 15 },
            duration: 1,
            repeat: -1,
            yoyo: true,
        })
    }

    setButton() {
        var button = new Container()
        button.position.set(100, 100)

        var maskGraphic = new PIXI.Graphics()
        maskGraphic.beginFill(0xff0000)
        maskGraphic.moveTo(20, 0)
        maskGraphic.lineTo(170, 0)
        maskGraphic.lineTo(150, 50)
        maskGraphic.lineTo(0, 50)
        maskGraphic.lineTo(20, 0)
        maskGraphic.endFill()

        var border = new PIXI.Graphics()
        border.lineStyle(2, 0xe4f9ff, 1)
        border.moveTo(20, 0)
        border.lineTo(170, 0)
        border.lineTo(150, 50)
        border.lineTo(0, 50)
        border.lineTo(20, 0)

        var text = new PIXI.Text('開始遊戲', {
            fontFamily: 'Noto Sans TC',
            fontSize: 16,
            fill: 0xf1f1f1,
            align: 'center',
            fontWeight: '400',
        })
        text.position.set((maskGraphic.width - text.width) / 2, (maskGraphic.height - text.height) / 2)

        button.mask = maskGraphic
        button.addChild(maskGraphic)
        button.addChild(text)
        button.addChild(border)
        this.container.addChild(button)
        this.button = button
        this.doParticles()

        var button2 = new Button(150, 50, 20)
        button2.position.set(100, 400)
        this.container.addChild(button2)
        this.button2 = button2
    }

    doParticles() {
        emitter_test.pos.x = 85
        emitter_test.pos.y = 220
        var emitter = new particles.Emitter(
            this.button,
            [PIXI.Texture.fromImage('./src/assets/images/particle.png')],
            emitter_test
        )
        var elapsed = Date.now()
        var update = function () {
            requestAnimationFrame(update)
            var now = Date.now()

            emitter.update((now - elapsed) * 0.001)
            elapsed = now
        }
        emitter.emit = true
        update()
    }
}
