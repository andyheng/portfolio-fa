<template>
  <footer>
    <div class="container">
      <ul class="footer-list">
          <li class="footer-item">
            <router-link to="/contact" class="footer-link">Contact</router-link>
          </li>
          <li class="footer-item">
            <router-link to="/personal" class="footer-link">Personal</router-link>
          </li>
          <li class="footer-item">
            <a href="https://instagram.com" class="footer-link">Instagram</a>
          </li>
        </ul>
      <p>Built by AH @ Subsequent Elements.</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>