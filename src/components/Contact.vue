<template>
    <main>
        <div class="contact-page-container">
            <a href="https://instagram.com/fahdadatin" class="contact-link">
                <img src="../assets/ui-insta.png" alt="Instagram Link">
            </a>
            <a href="https://tumblr.com/fahdadatin" class="contact-link">
                <img src="../assets/ui-tumblr.png" alt="Tumblr Link">
            </a>
            <a href="https://twitter.com/pantherkid" class="contact-link">
                <img src="../assets/ui-twitter.png" alt="Twitter Link">
            </a>
            <a href="#" class="contact-link">
                <img src="../assets/ui-email.png" alt="Email Address">
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
    margin-top: 150px;
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
