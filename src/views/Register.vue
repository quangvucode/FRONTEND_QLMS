<template>
  <div class="register-page container-fluid d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow-lg p-4" style="max-width: 450px; width: 100%;">
      <div class="card-body">
        <h2 class="text-center mb-4 fw-bold text-primary">Đăng Ký</h2>
        <form @submit.prevent="handleRegister">
          <!-- Họ tên -->
          <div class="form-group mb-4">
            <label for="name" class="form-label text-secondary">Họ Tên</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-secondary">
                <i class="bi bi-person"></i>
              </span>
              <input
                v-model="name"
                type="text"
                id="name"
                class="form-control"
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="form-group mb-4">
            <label for="email" class="form-label text-secondary">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-secondary">
                <i class="bi bi-envelope"></i>
              </span>
              <input
                v-model="email"
                type="email"
                id="email"
                class="form-control"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>

          <!-- Mật khẩu -->
          <div class="form-group mb-4">
            <label for="password" class="form-label text-secondary">Mật Khẩu</label>
            <div class="input-group">
              <span class="input-group-text bg-light text-secondary">
                <i class="bi bi-lock"></i>
              </span>
              <input
                v-model="password"
                type="password"
                id="password"
                class="form-control"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <!-- Nút đăng ký -->
          <button type="submit" class="btn btn-success w-100 py-2 fw-bold mb-3">Đăng Ký</button>

          <!-- Chuyển đến đăng nhập -->
          <p class="text-center">
            <span class="text-muted">Đã có tài khoản? </span>
            <router-link to="/login" class="text-primary fw-bold">Đăng nhập</router-link>.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

---

### **Script**

```javascript
<script>
import UserService from "../services/user.service";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        // Gửi yêu cầu đăng ký qua API
        await UserService.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });

        // Hiển thị thông báo đăng ký thành công
        Swal.fire({
          title: "Thành công!",
          text: "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Chuyển hướng về trang đăng nhập
        this.$router.push("/login");
      } catch (error) {
        // Hiển thị lỗi nếu đăng ký thất bại
        Swal.fire({
          title: "Thất bại!",
          text: error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
          icon: "error",
          confirmButtonText: "Thử lại",
        });
      }
    },
  },
};
</script>
<style scoped>
/* Tổng thể giao diện */
.register-page {
  background: linear-gradient(135deg, #ffffff, #f1f1f1);
  font-family: "Roboto", sans-serif;
}

/* Card chứa form */
.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

/* Tiêu đề */
h2 {
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 1rem;
}

/* Label */
.form-label {
  font-size: 0.9rem;
  color: #666;
}

/* Input nhóm */
.input-group {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.input-group .form-control {
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 0.95rem;
}

.input-group-text {
  border: none;
  border-radius: 10px 0 0 10px;
}

/* Nút đăng ký */
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-success:hover {
  background-color: #218838;
  transform: scale(1.02);
}

/* Chuyển đến đăng nhập */
.text-primary {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.text-primary:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  h2 {
    font-size: 1.5rem;
  }
  .form-label {
    font-size: 0.85rem;
  }
  .btn-success {
    font-size: 0.9rem;
  }
}
</style>
