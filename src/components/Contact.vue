<template>
    <main>
        <div class="contact-page-container">
            <a href="https://instagram.com/fahdadatin" class="contact-link" target="_blank">
                <!-- <img src="../assets/ui-insta.png" alt="Instagram Link"> -->
                Instagram
            </a>
            <a href="https://fahdadatin.tumblr.com" class="contact-link" target="_blank">
                <!-- <img src="../assets/ui-tumblr.png" alt="Tumblr Link"> -->
                Tumblr
            </a>
            <a href="https://twitter.com/pantherkid" class="contact-link" target="_blank">
                <!-- <img src="../assets/ui-twitter.png" alt="Twitter Link"> -->
                Twitter
            </a>
            <a href="mailto:fahdad@fahdadatin.com" class="contact-link">
                <!-- <img src="../assets/ui-email.png" alt="Email Address"> -->
                Email
            </a>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style>

.contact-page-container {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}
.contact-page-container > a {
    display: block;
    margin: 20px 0;
    text-decoration: none;
    transition: all .2s ease-in-out;
    filter: brightness(0.9);
}
.contact-page-container > a:hover {
    transform: scale(1.2);
    filter: brightness(1);
}
</style>
