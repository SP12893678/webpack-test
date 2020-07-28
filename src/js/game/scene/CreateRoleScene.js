import * as PIXI from 'pixi.js'
import Scene from '@/js/game/engine/Scene'
import Events from '@/js/game/Events'
import Button from 'Component/button'
import SettingMenu from 'Component/SettingMenu'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import ScenesManager from '@/js/game/engine/ScenesManager'

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite

export default class CreateRoleScene extends Scene {
    constructor() {
        super()
        this.setBackground()
        this.setButton()
        this.setMenu()
    }

    setBackground() {
        var background = new Sprite(resources[ResourcesManager.create_role].texture)
        var scale = ScenesManager.defaultWidth / background.width
        background.scale.set(scale, scale)
        this.addChild(background)
    }

    setButton() {
        var button = new Button(150, 50, 20)
        button.text.text = '創建角色'
        button.text.style.fill = 0x000000
        button.position.set(500, 100)
        button.click = () => {
            Events.emit('goto', { id: 'game_main', animate: 'fadeIn' })
        }
        this.addChild(button)
        this.button = button
    }

    setMenu() {
        var menu = new SettingMenu()
        menu.background.interactive = true
        menu.background.click = () => {
            menu.visible = false
        }
        this.addChild(menu)
    }

    update() {
        super.update()
    }
}
