<template>
  <main>
    <div class="contact-page-container">
      <div class="contact-header contact-container">
        <div class="contact-header-inside">
          <h1>Get in touch</h1>
          <p>We'll make something great together.</p>
        </div>
      </div>
      <div class="contact-info contact-container">
        <div class="contact-flex-container">
          <div class="contact">
            <font-awesome-icon icon="envelope" class="contact-icon"/>
            <h2>E-mail me</h2>
            <a href="mailto:someone@yoursite.com">dudeski@mail.com</a>
          </div>
          <div class="contact">
            <font-awesome-icon icon="phone" class="contact-icon"/>
            <h2>Let's talk</h2>
            <a href="tel:555-555-5555">555-555-5555</a>
          </div>
          <div class="contact">
            <font-awesome-icon :icon="['fab', 'twitter']" class="contact-icon"/>
            <h2>Tweet me</h2>
            <a href="https://twitter.com/dudeski">@dudeski</a>
          </div>
          <div class="contact">
            <font-awesome-icon :icon="['fab', 'instagram']" class="contact-icon"/>
            <h2>Insta me</h2>
            <a href="https://instagram.com/dudeski">Dudeski</a>
          </div>
          <div class="contact">
            <font-awesome-icon :icon="['fab', 'linkedin']" class="contact-icon"/>
            <h2>Connect with me</h2>
            <a href="https://linkedin.com/dudeskiman">Dudeskiman</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.contact-page-container {
  background-image: linear-gradient(225deg, transparent, #252525 65%),
    url("../assets/img/photo-bg.jpg");
}
@media screen and (min-width: 900px) {
  .contact-page-container {
    background-image: none;
  }
  .contact-header:before {
    background-image: url("../assets/img/photo-bg.jpg");
  }
}
</style>
