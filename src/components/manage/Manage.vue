<template>
    <v-app id="inspire">
        <div>
            <v-app-bar color="deep-purple" dark>
                <v-app-bar-nav-icon @click="nav_drawer = true"></v-app-bar-nav-icon>
                <v-toolbar-title>情境式環境音管理平台</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu rounded="lg" offset-y>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn v-bind="attrs" v-on="on" icon>
                            <v-icon>mdi-help-network</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link>
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-book-open-variant</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>說明手冊</v-list-item-title>
                        </v-list-item>
                        <v-list-item link>
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-teach</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>操作導覽</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item link>
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-card-account-mail</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>客服訊問</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>

            <v-navigation-drawer v-model="nav_drawer" absolute temporary width="280">
                <v-list nav class="py-0">
                    <v-list-item class="mb-0" two-line>
                        <v-list-item-avatar>
                            <v-img :src="require('@/assets/images/avatar-default.png')"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>User Name</v-list-item-title>
                            <v-list-item-subtitle>Identity</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>
                </v-list>
                <v-list nav>
                    <v-list-item-group active-class="deep-purple--text text--accent-4">
                        <v-list-item to="/">
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>首頁</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/enviroment-dashboard">
                            <v-list-item-icon>
                                <v-icon>mdi-monitor-edit</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>情境教材管理</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/audio-dashboard">
                            <v-list-item-icon>
                                <v-icon>mdi-music-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>聲音資源管理</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/student-dashboard">
                            <v-list-item-icon>
                                <v-icon>mdi-account-cog</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>學生帳戶管理</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </div>
        <router-view :passdata="passdata" @passdata="passdata = $event"></router-view>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            nav_drawer: false,
            passdata: {}
        }
    },
    mounted() {
        console.log('Manage Page run')

        /**Todo
         * requset personal data and update name and identity
         * else router push to Website Index
         */
    }
}
</script>

<style scoped></style>
