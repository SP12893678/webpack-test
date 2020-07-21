<template>
    <!-- <div>
        <h1>This is Manage Page.</h1>
        <router-link to="/foo">Go to Foo</router-link>
        <router-view></router-view>
    </div> -->
    <v-app id="inspire">
        <div>
            <v-app-bar color="deep-purple" dark>
                <v-app-bar-nav-icon @click="nav_drawer = true"></v-app-bar-nav-icon>
                <v-toolbar-title>情境式環境音管理平台</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer v-model="nav_drawer" absolute temporary width="280">
                <v-list nav class="py-0">
                    <v-list-item two-line>
                        <v-list-item-avatar>
                            <!-- <img src="./assets/images/avatar-default.png" /> -->
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

                        <v-list-item to="/manage-enviro">
                            <v-list-item-icon>
                                <v-icon>mdi-monitor-edit</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>情境教材管理</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/manage-audio">
                            <v-list-item-icon>
                                <v-icon>mdi-music-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>聲音資源管理</v-list-item-title>
                        </v-list-item>

                        <v-list-item to="/manage-account">
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
            passdata: {},
        }
    },
    mounted() {
        console.log('Manage Page run')
    },
}
</script>

<style scoped></style>
