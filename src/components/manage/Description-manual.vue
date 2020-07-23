<template>
    <v-dialog v-model="dialog" width="80%">
        <v-card>
            <v-card-title>Test Title</v-card-title>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: ["dialog"],
    data() {
        return {
            // dialog: true,
        };
    },
    mounted() {
        console.log("Descript manual Page run");
    },
};
</script>

<style scoped>
.jf-title {
    font-size: 36px;
}
</style>
