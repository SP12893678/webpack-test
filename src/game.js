import 'babel-polyfill'
import * as PIXI from 'pixi.js'
import * as dat from 'dat.gui'
import axios from 'axios'
import Sound from 'pixi-sound'

import people from './assets/json/people.json'
import load_resources from './assets/json/resources.json'

import Startpage from './js/game/startpage'
import { apiTest } from './js/api'
/**----------------------------- */
;(function () {
    function getloadResources(load_resources) {
        var data = []
        data = data.concat(load_resources.game_start_page)
        console.log('data', data)
        return data
    }

    function start() {
        var startpage = new Startpage(app.renderer.width, app.renderer.height)
        app.stage.addChild(startpage.container)
        console.log('game ready')
        var fizzyText = new FizzyText()
        var gui = new dat.GUI()
        gui.add(fizzyText, 'alpha', 0, 1)

        /**PIXI sound test */
        // Sound.stopAll()
        // Sound.add('brooming1', resources['./src/assets/audio/brooming1.mp3'])
        // Sound.play('brooming1')
    }

    async function test() {
        const item = await apiTest({ name: 'Teddy', age: 21 })
        console.log(item)
    }

    let Application = PIXI.Application,
        Container = PIXI.Container,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        Sprite = PIXI.Sprite

    let app = new Application({
        width: 1120,
        height: 630,
        antialias: true,
        transparent: false,
        resolution: 1,
        view: document.getElementById('app'),
    })

    console.log('people', people)
    console.log('resources', load_resources)

    loader.add(getloadResources(load_resources)).load(start)

    var FizzyText = function () {
        this.message = 'dat.gui'
        this.alpha = 1
        this.displayOutline = false
    }

    axios.get('../php/test.php', { params: { type: 'test' } }).then((res) => {
        console.log(res.data)
    })

    apiTest({ name: 'Teddy', age: 21 })
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
        })

    test()
})()
