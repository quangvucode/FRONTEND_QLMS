<template>
    <div class="login-page container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%;">
            <div class="card-body">
                <h2 class="text-center mb-4 fw-bold text-primary">Đăng Nhập</h2>
                <form @submit.prevent="login">
                    <!-- Email -->
                    <div class="form-group mb-4">
                        <label for="emailLogin" class="form-label text-secondary">Email</label>
                        <div class="input-group">
                            <span class="input-group-text bg-light text-secondary">
                                <i class="bi bi-envelope"></i>
                            </span>
                            <input
                                v-model="loginForm.email"
                                type="email"
                                id="emailLogin"
                                class="form-control"
                                placeholder="Nhập email của bạn"
                                required
                            />
                        </div>
                    </div>

                    <!-- Mật khẩu -->
                    <div class="form-group mb-4">
                        <label for="passwordLogin" class="form-label text-secondary">Mật khẩu</label>
                        <div class="input-group">
                            <span class="input-group-text bg-light text-secondary">
                                <i class="bi bi-lock"></i>
                            </span>
                            <input
                                v-model="loginForm.password"
                                type="password"
                                id="passwordLogin"
                                class="form-control"
                                placeholder="Nhập mật khẩu của bạn"
                                required
                            />
                        </div>
                    </div>

                    <!-- Nút đăng nhập -->
                    <button type="submit" class="btn btn-primary w-100 py-2 fw-bold mb-3">Đăng Nhập</button>

                    <!-- Liên kết đến đăng ký -->
                    <div class="text-center">
                        <span class="text-muted">Bạn chưa có tài khoản? </span>
                        <router-link to="/register" class="text-primary fw-bold">Đăng ký ngay</router-link>.
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2"; // SweetAlert2 để hiển thị thông báo
import userService from "../services/user.service"; // Service API cho người dùng

export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async login() {
            try {
                const response = await userService.login(this.loginForm);
                Swal.fire("Thành công", "Đăng nhập thành công!", "success");
                // Lưu token vào localStorage
                localStorage.setItem("token", response.data.token);
                this.$router.push("/"); // Chuyển hướng về trang chủ
            } catch (error) {
                Swal.fire("Thất bại", "Sai thông tin đăng nhập!", "error");
            }
        },
    },
};
</script>

<style scoped>
/* Tổng thể giao diện */
.login-page {
    background: linear-gradient(135deg, #ffffff, #f1f1f1);
    font-family: 'Roboto', sans-serif;
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

/* Nút đăng nhập */
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s;
    font-size: 1rem;
}

.btn-primary:hover {
    background-color: #0056b3;
    transform: scale(1.02);
}

/* Liên kết đăng ký */
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
    .btn-primary {
        font-size: 0.9rem;
    }
}
</style>
