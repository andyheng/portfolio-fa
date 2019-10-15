<template>
    <main>
        <div class="container container-404">
            <h1>404</h1>
            <p>Sorry, I couldn't find the page you were looking for. Try one of these pages:</p>
            <ul class="list-404">
                <li>
                    <router-link to="/" class="link-404">Home</router-link>
                </li>
                <li>
                    <router-link to="/contact" class="link-404">Contact</router-link>
                </li>
                <li>
                    <router-link to="/extra" class="link-404">Extra</router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            mobile: ""
        };
    },
    created() {
        this.mobile = window.innerWidth <= 600;
    }
}
</script>

<style scoped>
    .container-404 {
        margin-top: 11em;
    }
</style>