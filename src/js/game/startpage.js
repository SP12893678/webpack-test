import * as PIXI from 'pixi.js'
import * as particles from 'pixi-particles'
import { OutlineFilter } from 'pixi-filters'
import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

import emitter_test from '@/assets/json/emitter.json'

import Button from './component/button'
import CreatRoleUI from './creatrolepage'
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
        var background = new Sprite(resources['../src/assets/images/game-start.jpg'].texture)
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
        var button2 = new Button(150, 50, 20)
        button2.position.set(100, 400)
        this.container.addChild(button2)
        this.button2 = button2

        // button2.click = () => {
        //     console.log(123)
        //     this.button2.interactive = false
        //     this.button2.buttonMode = false

        //     gsap.to(this.container, {
        //         pixi: { alpha: 0 },
        //         duration: 1,
        //         onComplete: () => {
        //             this.container.parent.removeChild(this.container)
        //         },
        //     })

        //     var creatrolepage = new CreatRoleUI(this.width, this.height)
        //     creatrolepage.alpha = 0
        //     this.container.parent.addChild(creatrolepage)
        //     gsap.to(creatrolepage, {
        //         pixi: { alpha: 1 },
        //         duration: 1,
        //     })
        // }
    }
}
