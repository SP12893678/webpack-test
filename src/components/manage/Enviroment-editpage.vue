<template>
    <v-main class="pr-0">
        <canvas v-resize="onResizeCanvas" id="enviro" class="enviro"></canvas>
        <div class="objects-display">
            <v-card-title class="jf-title">物件列表</v-card-title>
            <v-divider></v-divider>
            <v-slide-group v-model="model" mandatory show-arrows center-active>
                <v-slide-item v-for="(object, index) in objects" :key="object.id" v-slot:default="{ active, toggle }">
                    <v-card @click="clickObject(index)" :color="active ? 'primary' : 'grey lighten-1'" class="ma-4" height="100" width="100">
                        <v-img :src="object.pic_src" max-height="100" min-height="100" min-width="100" contain></v-img>
                    </v-card>
                </v-slide-item>
            </v-slide-group>
        </div>

        <v-navigation-drawer width="320px" app absolute permanent right>
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium jf-title">編輯區域</v-list-item-title>
                    </v-list-item-content>
                    <v-spacer></v-spacer>
                    <v-btn @click="test" color="red" text> <v-icon left>mdi-content-save</v-icon>儲存 </v-btn>
                </v-list-item>
            </template>
            <v-divider></v-divider>
            <v-list shaped>
                <v-list-group prepend-icon="mdi-image-area" value="true">
                    <template v-slot:activator>
                        <v-list-item-title>背景</v-list-item-title>
                    </template>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-text-field v-model="enviro.name" label="情境名稱" outlined clearable hide-details></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-select v-model="enviro.category" :items="audio_type_arr" label="情境類別" dense outlined hide-details></v-select>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-btn @click="background_img_profile.dialog = true" class="mb-4" color="secondary" block>選擇情境背景</v-btn>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-group prepend-icon="mdi-shape-plus">
                    <template v-slot:activator>
                        <v-list-item-title>物件</v-list-item-title>
                    </template>
                    <v-divider></v-divider>
                    <v-list-item>
                        <v-list-item-content>
                            <v-row>
                                <v-col cols="7" class="pt-0 pb-0">
                                    <v-btn @click="addnewObject" class="mb-4" block outlined>新增物件</v-btn>
                                </v-col>
                                <v-col cols="4" class="pt-0 pb-0">
                                    <v-btn @click="deleteObject" color="error" outlined>刪除物件</v-btn>
                                </v-col>
                            </v-row>

                            <v-text-field v-model="select_object.name" label="物件名稱" dense outlined clearable hide-details></v-text-field>
                            <v-row class="mt-2">
                                <v-col>
                                    <v-text-field v-model="select_object.position.x" label="X軸位置" dense outlined hide-details></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field v-model="select_object.position.y" label="Y軸位置" dense outlined hide-details></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn @click="object_img_profile.dialog = true" class="mt-2 mb-2" color="secondary" block>選擇物件圖片</v-btn>
                            <v-slider
                                v-model="select_object.scale"
                                max="20"
                                min="0.0001"
                                step="0.0001"
                                class="mb-3 mt-3"
                                prepend-icon="mdi-aspect-ratio"
                                hide-details
                            >
                                <template v-slot:append>
                                    <v-text-field
                                        v-model="select_object.scale"
                                        type="number"
                                        class="mt-0 pt-0"
                                        style="width: 60px"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </template>
                            </v-slider>

                            <v-slider v-model="select_object.degree" min="0" max="360" prepend-icon="mdi-format-rotate-90" hide-details>
                                <template v-slot:append>
                                    <v-text-field
                                        v-model="select_object.degree"
                                        type="number"
                                        class="mt-0 pt-0"
                                        style="width: 60px"
                                        hide-details
                                        single-line
                                    ></v-text-field>
                                </template>
                            </v-slider>

                            <v-row no-gutters class="mb-4 mt-4">
                                <v-col cols="12" sm="5" class="mr-2">
                                    <v-select v-model="audio_type" :items="audio_type_arr" label="聲音類別" dense outlined hide-details></v-select>
                                </v-col>
                                <v-col cols="12" sm="5" class="mr-0">
                                    <v-select
                                        v-model="select_object.audio"
                                        item-text="name"
                                        :items="audioName"
                                        label="聲音名稱"
                                        return-object
                                        dense
                                        outlined
                                        hide-detail
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="1">
                                    <v-btn icon>
                                        <v-icon>mdi-volume-high</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-dialog v-model="object_img_profile.dialog" max-width="1000" max-height="600" persistent>
            <v-card>
                <v-card-title>
                    <span class="jf-title">物件圖像庫</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="changeObjectImg" icon>
                        <v-icon color="grey lighten-1">mdi-check</v-icon>
                    </v-btn>
                </v-card-title>
                <v-tabs v-model="object_img_profile.tab" background-color="transparent" color="basil" grow>
                    <v-tab>雲端</v-tab>
                    <v-tab>從電腦上傳</v-tab>
                </v-tabs>
                <v-tabs-items v-model="object_img_profile.tab">
                    <v-tab-item>
                        <v-card>
                            <v-container fluid>
                                <v-item-group v-model="object_img_profile.cloud_select" mandatory>
                                    <v-row>
                                        <v-col v-for="(item, i) in object_img_profile.cloud_img" :key="i" md="auto">
                                            <v-item v-slot:default="{ active, toggle }" :value="item">
                                                <v-card :ripple="{ class: 'white--text' }" min-width="100" min-height="150" max-width="200" max-height="150">
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="active ? 'border text-right pa-2' : ' text-right pa-2'"
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-file-input
                                v-model="object_img_profile.file_input"
                                @change="fileOnChange($event, 'object')"
                                class="ma-2"
                                color="deep-purple accent-4"
                                label="File input"
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                :show-size="1000"
                                multiple
                                counter
                                outlined
                            >
                                <template v-slot:selection="{ index, text }">
                                    <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>

                                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2"
                                        >+{{ object_img_profile.file_input.length - 2 }} File(s)</span
                                    >
                                </template>
                            </v-file-input>
                            <v-container fluid>
                                <v-item-group v-model="object_img_profile.local_select" mandatory>
                                    <v-row>
                                        <v-col v-for="(item, i) in object_img_profile.local_img" :key="i" md="auto">
                                            <v-item v-slot:default="{ active, toggle }" :value="item">
                                                <v-card :ripple="{ class: 'white--text' }" min-width="100" min-height="150" max-width="200" max-height="150">
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="active ? 'border text-right pa-2' : ' text-right pa-2'"
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-dialog>
        <v-dialog v-model="background_img_profile.dialog" max-width="1000" max-height="600" persistent>
            <v-card>
                <v-card-title>
                    <span class="jf-title">背景圖像庫</span>
                    <v-spacer></v-spacer>
                    <v-btn @click="changeBackgroundImg" icon>
                        <v-icon color="grey lighten-1">mdi-check</v-icon>
                    </v-btn>
                </v-card-title>
                <v-tabs v-model="background_img_profile.tab" background-color="transparent" color="basil" grow>
                    <v-tab>雲端</v-tab>
                    <v-tab>從電腦上傳</v-tab>
                </v-tabs>
                <v-tabs-items v-model="background_img_profile.tab">
                    <v-tab-item>
                        <v-card>
                            <v-container fluid>
                                <v-item-group v-model="background_img_profile.cloud_select" mandatory>
                                    <v-row>
                                        <v-col v-for="(item, i) in background_img_profile.cloud_img" :key="i" md="auto">
                                            <v-item v-slot:default="{ active, toggle }" :value="item">
                                                <v-card :ripple="{ class: 'white--text' }" min-width="100" min-height="150" max-width="200" max-height="150">
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="active ? 'border text-right pa-2' : ' text-right pa-2'"
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-file-input
                                v-model="background_img_profile.file_input"
                                @change="fileOnChange($event, 'background')"
                                :show-size="1000"
                                class="ma-2"
                                color="deep-purple accent-4"
                                label="File input"
                                placeholder="Select your files"
                                prepend-icon="mdi-paperclip"
                                outlined
                                counter
                                multiple
                            >
                                <template v-slot:selection="{ index, text }">
                                    <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>{{ text }}</v-chip>

                                    <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2"
                                        >+{{ background_img_profile.file_input.length - 2 }} File(s)</span
                                    >
                                </template>
                            </v-file-input>
                            <v-container fluid>
                                <v-item-group v-model="background_img_profile.local_select" mandatory>
                                    <v-row>
                                        <v-col v-for="(item, i) in background_img_profile.local_img" :key="i" md="auto">
                                            <v-item v-slot:default="{ active, toggle }" :value="item">
                                                <v-card :ripple="{ class: 'white--text' }" min-width="100" min-height="150" max-width="200" max-height="150">
                                                    <v-img
                                                        @click="toggle"
                                                        :src="item"
                                                        :class="active ? 'border text-right pa-2' : ' text-right pa-2'"
                                                        max-height="150"
                                                        min-height="150"
                                                        min-width="100"
                                                        class
                                                        contain
                                                    >
                                                        <v-overlay
                                                            v-if="active"
                                                            transition="fade-transition"
                                                            color="rgba(100, 100, 255, 0.5)"
                                                            absolute
                                                        ></v-overlay>
                                                    </v-img>
                                                </v-card>
                                            </v-item>
                                        </v-col>
                                    </v-row>
                                </v-item-group>
                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import * as PIXI from 'pixi.js'
import Sound from 'pixi-sound'
import { Editor } from '@/js/manage/environment'
import { apiManageEnviroment, apiManageObject, apiManageAudio, apiGetFolderFileList } from '@/js/api'

export default {
    props: ['passdata'],
    data() {
        return {
            enviro: {},
            objects: [],
            select_object: {
                name: null,
                position: { x: null, y: null },
                imagefile: null,
                scale: null,
                degree: null,
                audio: { name: null, category: null, sound_src: null },
                id: null,
            },
            sprite: null,
            audio: [],
            audio_type: null,
            audio_type_arr: [],
            object_img_profile: {
                cloud_img: [],
                local_img: [],
                file_input: [],
                cloud_select: [],
                local_select: [],
                tab: 0,
                dialog: false,
            },
            background_img_profile: {
                cloud_img: [],
                local_img: [],
                file_input: [],
                cloud_select: [],
                local_select: [],
                tab: 0,
                dialog: false,
            },
            enviro_container: null,
            environment: null,
            model: null,
        }
    },
    async mounted() {
        console.log('Home Page run')
        if (this.passdata.enviro == null) this.$router.back()
        console.log(this.passdata)
        this.getCloudBackgroundImages()
        this.getCloudObjectImages()

        await this.requestDataAndLoad(this.passdata.enviro.id)
        this.getAudiotypes()
    },
    computed: {
        /**取得符合該聲音類別的聲音資源 */
        audioName() {
            var app = this
            if (app.audio_type == '全部') {
                return app.audio
            } else if (app.audio_type != null) {
                return app.audio.filter((item) => {
                    return item.category.indexOf(app.audio_type) >= 0
                })
            }
        },
    },
    methods: {
        test() {
            // console.log(this.selected);
            // console.log(this.object_img_profile.local_img);
            console.log(this.model)
        },
        creatEnvrioment() {
            PIXI.settings.RESOLUTION = window.devicePixelRatio || 1

            let Application = PIXI.Application,
                Container = PIXI.Container,
                loader = PIXI.loader,
                resources = PIXI.loader.resources,
                TextureCache = PIXI.utils.TextureCache,
                Sprite = PIXI.Sprite

            let app = new Application({
                width: 1000,
                height: 625,
                antialias: true,
                transparent: false,
                resolution: 1,
                view: document.getElementById('enviro'),
            })

            this.environment = new Editor(this, app, this.enviro, this.objects)
            this.enviro_container = this.environment.getEnvironment()
            this.enviro_container.position.set(0, 0)
            app.stage.addChild(this.enviro_container)
            console.log('render')
            this.environment.object_click(this.objects[0])
        },
        requestDataAndLoad: async function(enviro_name) {
            var app = this
            await this.get_enviro_data(enviro_name)
            await this.get_object_data(this.enviro.object.split(','))
            await this.getAudioData()

            /**將聲音分類字串轉陣列 */
            this.audio.forEach((item) => {
                item.category = item.category.split(';')
            })

            /**將屬於該物件的聲音資源分配到該物件上 */
            this.objects.forEach((object) => {
                app.audio.forEach((audio) => {
                    if (object.sound_src == audio.id) object.audio = audio
                })
            })

            this.loadResourses()
        },
        /**判定資源是否已載入過，若無則放入陣列中，最後載入資源並執行情境建立與設定 */
        loadResourses() {
            // 將需加載的資源放入陣列
            var load_arr = []

            if (!PIXI.loader.resources['../static/images/enviro/object/object.png']) load_arr.push('../static/images/enviro/object/object.png')

            if (!PIXI.loader.resources[this.enviro.background_src]) load_arr.push(this.enviro.background_src)

            this.objects.forEach((object) => {
                if (!PIXI.loader.resources[object.pic_src]) load_arr.push(object.pic_src)
                if (!PIXI.loader.resources[object.audio.sound_src]) load_arr.push(object.audio.sound_src)
            })

            // 判定有無資源須加載，並執行情境建立與設定
            if (load_arr.length <= 0) this.creatEnvrioment()
            else PIXI.loader.add(load_arr).load(this.creatEnvrioment)
        },
        /**請求後端並取得該情境教材資料
         * @async
         */
        get_enviro_data(id) {
            return apiManageEnviroment({ type: 'get', amount: 'one', item: id })
                .then((res) => {
                    console.log(res.data)
                    this.enviro = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**請求後端並取得該情境教材所需的物件資料
         * @async
         */
        get_object_data(object_arr) {
            return apiManageObject({
                type: 'get',
                amount: 'part',
                items: object_arr,
            })
                .then((res) => {
                    console.log(res.data)
                    this.objects = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**請求後端並取得所有聲音資源資料
         * @async
         */
        getAudioData() {
            return apiManageAudio({ type: 'get', amount: 'all' })
                .then((res) => {
                    console.log(res.data)
                    this.audio = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**過濾聲音資源的分類 */
        getAudiotypes() {
            var app = this
            this.audio_type_arr.push('全部')
            this.audio.forEach((item) => {
                item.category.forEach((c) => {
                    if (app.audio_type_arr.indexOf(c) < 0) app.audio_type_arr.push(c)
                })
            })
        },
        /**取得雲端上的物件圖片 */
        getCloudObjectImages() {
            return apiGetFolderFileList({
                path: 'images-enviro-object',
                extensions: ['*.png'],
            })
                .then((res) => {
                    console.log(res.data)
                    this.object_img_profile.cloud_img = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**取得雲端上的背景圖片 */
        getCloudBackgroundImages() {
            return apiGetFolderFileList({
                path: 'images-enviro-background',
                extensions: ['*.gif', '*.jpg', '*.png'],
            })
                .then((res) => {
                    console.log(res.data)
                    this.background_img_profile.cloud_img = res.data
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        /**將選取好得檔案放入(背景/物件)圖庫中 */
        fileOnChange: function(event, type) {
            event.forEach((file) => {
                var reader = new FileReader()
                var app = this
                reader.onload = function(event) {
                    if (type == 'background') app.background_img_profile.local_img.push(event.target.result)
                    else app.object_img_profile.local_img.push(event.target.result)
                }
                reader.readAsDataURL(file)
            })
        },
        /**更改情境物件圖片 */
        changeObjectImg() {
            var select_img = this.object_img_profile.tab == 0 ? this.object_img_profile.cloud_select : this.object_img_profile.local_select
            this.sprite.texture = PIXI.Texture.from(select_img)
            this.object_img_profile.dialog = false
        },
        /**更改情境背景圖片 */
        changeBackgroundImg() {
            var select_img = this.background_img_profile.tab == 0 ? this.background_img_profile.cloud_select : this.background_img_profile.local_select

            var app = this
            var bg_texture = PIXI.Texture.from(select_img)
            bg_texture.baseTexture.on('loaded', function() {
                var scale = app.environment.getBackground().width / bg_texture.width
                app.environment.getBackground().scale.set(scale, scale)
                app.environment.getBackground().texture = bg_texture
                app.background_img_profile.dialog = false
            })
        },
        /**新增物件並點選新物件 */
        addnewObject() {
            var app = this
            var object_data = {
                coordinate: '0,0',
                id: '-1',
                name: null,
                pic_src: '../static/images/enviro/object/object.png',
                size: '100',
                sound_src: null,
                audio: null,
            }
            var object_texture = PIXI.Texture.from('../static/images/enviro/object/object.png')
            var object = this.environment.creat_Object(object_data, object_texture)
            object_data.sprite = object
            object_data.sprite.click = function() {
                app.environment.object_click(object_data)
            }
            this.environment.object_drag(object_data)
            this.environment.getEnvironment().addChild(object)
            this.objects.push(object_data)
            this.clickObject(this.objects.length - 1)
        },
        /**刪除被選取之情境物件,並點擊物件陣列索引0的物件 */
        deleteObject() {
            var app = this
            var delete_object_index = this.objects.findIndex((object) => object.sprite == app.sprite)
            this.objects[delete_object_index].sprite.parent.removeChild(this.objects[delete_object_index].sprite)
            this.objects[delete_object_index].sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true,
            })
            this.objects.splice(delete_object_index, 1)

            if (this.objects.length > 0) this.clickObject(0)
        },
        /**同步物件列表該物件被點擊事件 */
        clickObject(index) {
            this.model = index
            this.environment.object_click(this.objects[index])
        },
        /**將情境化面調整到適當大小(當視窗大小改變時，執行此函式) */
        onResizeCanvas() {
            const default_width = 1000
            const default_height = 625

            let space_width = window.innerWidth - 320
            let space_height = window.innerHeight - 264

            let aspect_ratio = Math.min(space_width / default_width, space_height / default_height)

            var element = document.getElementsByClassName('enviro')[0]
            element.style.cssText = `width: ${default_width * aspect_ratio}px; 
                                    height: ${default_height * aspect_ratio}px;`
        },
    },
    watch: {
        select_object: {
            handler(val) {
                var app = this
                var i = -1
                this.objects.forEach((object, index) => {
                    if (object.id == app.select_object.id) i = index
                })
                this.sprite.position.x = this.select_object.position.x
                this.sprite.position.y = this.select_object.position.y
                this.sprite.rotation = this.select_object.degree * (Math.PI / 180)
                this.sprite.scale.set(this.select_object.scale, this.select_object.scale)

                this.objects[i].name = this.select_object.name
            },
            deep: true,
        },
    },
}
</script>

<style scoped>
.jf-title {
    font-size: 24px;
}
.app {
    max-height: calc(100vh - 64px) !important;
}
.enviro {
    width: 1000px;
    height: 625px;
}

.objects-display {
    width: calc(100% - 320px) !important;
    position: absolute;
    bottom: 0;
}
</style>
