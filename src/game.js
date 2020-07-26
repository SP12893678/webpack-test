import 'babel-polyfill'
import * as PIXI from 'pixi.js'

import ScenesManager from '@/js/game/engine/ScenesManager'
import ResourcesManager from '@/js/game/engine/ResourcesManager'
import Events from '@/js/game/Events'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
/**----------------------------- */
;(function() {
    function loadProgressHandler(loader, resource) {
        if (
            resources[ResourcesManager.loading_bg].texture &&
            resources[ResourcesManager.loading_bar].texture &&
            scenesManager.scenes['loading'] == null
        )
            Events.emit('goto', { id: 'loading' })
        if (scenesManager.scenes['loading'] != null) {
            scenesManager.scenes['loading'].text.text = '加載資源' + (Math.ceil(loader.progress) | 0) + '%'
            gsap.set(scenesManager.scenes['loading'].bar, {
                pixi: {
                    positionX: -scenesManager.scenes['loading'].bar.width + (Math.ceil(loader.progress) * 1000) / 100,
                },
            })
        }
    }

    function getloadResources(resources) {
        let data = Object.values(resources)
        return data.filter((item, index, self) => index === self.indexOf(item) && !PIXI.loader.resources[item])
    }

    function start() {
        console.log('game ready')
        Events.emit('goto', { id: 'game_start' })
    }

    /**--------------------------------------------------- */

    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite

    let scenesManager = ScenesManager
    scenesManager.create(1000, 625)

    loader
        .add(getloadResources(ResourcesManager))
        .on('progress', loadProgressHandler)
        .load(start)

    // console.log(img)
})()
