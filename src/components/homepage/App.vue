<template>
    <v-app>
        <!-- <v-navigation-drawer app></v-navigation-drawer> -->

        <v-app-bar app></v-app-bar>
        <v-main>
            <v-container class="ma-0 pa-0" fluid fill-height>
                <!-- <router-view></router-view> -->
                <v-carousel ref="carousel" id="carousel" v-model="value" class="ma-0 pa-0" height="100%" vertical vertical-delimiters hide-delimiter-background>
                    <v-carousel-item v-for="(slide, i) in slides" :key="i">
                        <v-sheet :color="colors[i]" height="100%">
                            <v-row class="fill-height" align="center" justify="center">
                                <div class="display-3">{{ slide }} Slide</div>
                            </v-row>
                        </v-sheet>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </v-main>

        <!-- <v-footer app></v-footer> -->
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
            slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
            value: 0,
            scrollable: true,
        }
    },
    mounted() {
        document.querySelector('.v-carousel__controls').style.right = 0
        this.setCarouselEvent()
    },
    methods: {
        setCarouselEvent() {
            var app = this
            window.addEventListener('wheel', function(event) {
                if (!app.scrollable) return
                let offset = event.deltaY < 0 ? -1 : 1
                let slides_length = app.$refs['carousel'].$slots.default.length
                app.scrollable = false
                app.value = app.value + offset < slides_length && app.value + offset >= 0 ? app.value + offset : app.value
                if (!(app.value + offset < slides_length && app.value + offset >= 0)) app.scrollable = true
            })

            const transition = document.querySelector('#carousel')
            transition.addEventListener('transitionend', (e) => {
                if (e.propertyName.indexOf('transform') != -1) this.scrollable = true
            })
        },
    },
}
</script>

<style scoped>
.v-window-x-transition-enter-active,
.v-window-x-transition-leave-active,
.v-window-x-reverse-transition-enter-active,
.v-window-x-reverse-transition-leave-active,
.v-window-y-transition-enter-active,
.v-window-y-transition-leave-active,
.v-window-y-reverse-transition-enter-active,
.v-window-y-reverse-transition-leave-active {
    transition: all 1000ms ease 0s;
}
</style>
