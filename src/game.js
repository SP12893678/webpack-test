import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import Sound from 'pixi-sound'

import people from './assets/json/people.json'
import load_resources from './assets/json/resources.json'

import Scene from './js/game/engine/Scene'
import ScenesManager from './js/game/engine/ScenesManager'
import TestScene from './js/game/scene/TestScene'
import LoadingScene from './js/game/scene/LoadingScene'
import GameStartScene from './js/game/scene/GameStartScene'

import { gsap } from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

var EventEmitter = require('eventemitter3')

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)
// import { apiTest } from './js/api'
/**----------------------------- */
;(function() {
    function loadProgressHandler(loader, resource) {
        if (resource.url == '../src/assets/images/loadingbar.png' && scenesManager.scenes['loading'] == null) {
            scenesManager.createScene('loading', new LoadingScene(1000, 625))
            scenesManager.createScene('test', new TestScene(1000, 625))
            scenesManager.goToScene('loading')
        }
        if (scenesManager.scenes['loading'] != null) {
            scenesManager.scenes['loading'].text.text = '加載資源' + (Math.ceil(loader.progress) | 0) + '%'
            gsap.set(scenesManager.scenes['loading'].bar, {
                pixi: {
                    positionX: -scenesManager.scenes['loading'].bar.width + (Math.ceil(loader.progress) * 1000) / 100,
                },
            })
        }
    }

    function getloadResources(load_resources) {
        var data = []
        data = data.concat(load_resources.game_start_page)
        console.log('data', data)
        return data
    }

    function start() {
        console.log('game ready')
        scenesManager.createScene('game_start', new GameStartScene(1000, 625))
        scenesManager.goToScene('game_start')
    }

    function setEvents() {
        events.on('back', (val) => {
            console.log(val)
        })
        events.on('goto', (val) => {
            console.log(val)
            scenesManager.goToScene(val)
        })
        events.on('creat', (val) => {
            scenesManager.createScene(val.id, val.scene)
            scenesManager.goToScene(val.id)
            scenesManager.scenes[val.id].alpha = 0
            gsap.to(scenesManager.scenes[val.id], {
                pixi: {
                    alpha: 1,
                },
                duration: 1,
            })
        })
    }

    /**--------------------------------------------------- */

    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite

    window.events = new EventEmitter()

    console.log('people', people)
    console.log('resources', load_resources)

    loader
        .add(getloadResources(load_resources))
        .on('progress', loadProgressHandler)
        .load(start)
    setEvents()

    //get reference of ScenesManager;
    var scenesManager = new ScenesManager()
    scenesManager.create(1000, 625)

    document.getElementById('pause').addEventListener('click', () => {
        scenesManager.currentScene.pause()
    })
    document.getElementById('start').addEventListener('click', () => {
        scenesManager.currentScene.resume()
    })
    document.getElementById('game').addEventListener('click', () => {
        scenesManager.goToScene('loading')
    })
    document.getElementById('blank').addEventListener('click', () => {
        scenesManager.goToScene('test')
    })
})()

/**PIXI sound test */
// Sound.stopAll()
// Sound.add('brooming1', resources['./src/assets/audio/brooming1.mp3'])
// Sound.play('brooming1')
