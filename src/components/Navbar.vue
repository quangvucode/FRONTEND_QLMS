<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid">
      <!-- Logo thương hiệu -->
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="/images/logo.webp" alt="Logo" class="logo me-2" />
        <span class="brand-name">Quản Lý Mượn Sách</span>
      </router-link>

      <!-- Nút toggle menu -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu chính -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto"> <!-- Căn giữa menu -->
          <li class="nav-item">
            <router-link to="/" class="nav-link btn-custom" exact-active-class="active">Trang Chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link btn-custom" exact-active-class="active">Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/borrowers" class="nav-link btn-custom" exact-active-class="active">Đọc Giả</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/loans" class="nav-link btn-custom" exact-active-class="active">Theo Dõi Mượn Sách</router-link>
          </li>
        </ul>

        <!-- Phần tài khoản -->
        <div class="user-actions d-flex align-items-center">
          <router-link to="/login" class="nav-link">
            <i class="bi bi-person-circle"></i> Tài Khoản
          </router-link>
          <router-link to="/help" class="nav-link">
            <i class="bi bi-question-circle"></i> Hỗ Trợ
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Căn chỉnh tổng thể */
.navbar {
  background-color: #f8f9fa;
  border-bottom: 3px solid #ff6f61;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6f61 !important;
}

.navbar-brand .logo {
  height: 80px;
}

.navbar-nav {
  margin: 0 auto; /* Căn giữa menu */
}

.nav-link {
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

/* Tùy chỉnh nút */
.btn-custom {
  display: inline-block;
  background-color: #fbf7f6;
  color: #0b0b0b;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 25px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #ff4a3a;
  color: #fff;
  border-color: #ff4a3a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-custom.active {
  background-color: #ff3a21;
  color: #fff;
  border-color: #ff3a21;
  box-shadow: 0 0 10px rgba(255, 58, 33, 0.5);
}

/* Phần tài khoản */
.user-actions {
  margin-left: auto; /* Đẩy tài khoản và hỗ trợ sang phải */
  display: flex;
  align-items: center;
}

.user-actions .nav-link {
  font-size: 0.95rem;
  color: #555;
  margin-left: 15px;
}

.user-actions .nav-link:hover {
  color: #ff6f61;
}
</style>
