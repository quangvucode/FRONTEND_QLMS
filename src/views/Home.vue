<template>
    <div class="container mt-5">
        <h1 class="text-center mb-3">Quản Lý Thư Viện</h1>
        <p class="text-center text-muted">Chào mừng bạn đến với hệ thống quản lý thư viện.</p>

        <div class="row mt-4">
            <!-- Quản lý Sách -->
            <div class="col-md-4">
                <div class="card">
                    <router-link to="/books">
                        <img src="/images/books.webp" class="card-img-top" alt="Quản lý sách" />
                    </router-link>
                    <div class="card-body text-center">
                        <h5 class="card-title">Quản Lý Sách</h5>
                        <p class="card-text text-muted">Thêm, sửa, và xóa thông tin sách trong thư viện.</p>
                        <router-link to="/books" class="btn btn-primary">Xem Sách</router-link>
                    </div>
                </div>
            </div>

            <!-- Quản lý Người Mượn -->
            <div class="col-md-4">
                <div class="card">
                    <router-link to="/borrowers">
                        <img src="/images/borrowers.webp" class="card-img-top" alt="Quản lý người mượn" />
                    </router-link>
                    <div class="card-body text-center">
                        <h5 class="card-title">Quản Lý Người Mượn</h5>
                        <p class="card-text text-muted">Quản lý thông tin cá nhân của người mượn.</p>
                        <router-link to="/borrowers" class="btn btn-primary">Xem Người Mượn</router-link>
                    </div>
                </div>
            </div>

            <!-- Quản lý Mượn Sách -->
            <div class="col-md-4">
                <div class="card">
                    <router-link to="/loans">
                        <img src="/images/loans.webp" class="card-img-top" alt="Quản lý mượn sách" />
                    </router-link>
                    <div class="card-body text-center">
                        <h5 class="card-title">Quản Lý Mượn Sách</h5>
                        <p class="card-text text-muted">Theo dõi và quản lý trạng thái mượn sách.</p>
                        <router-link to="/loans" class="btn btn-primary">Xem Mượn Sách</router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer mt-5 py-3 bg-light">
  <div class="container">
    <!-- Dòng chữ bản quyền -->
    <div class="text-center mb-2">
      <p class="mb-0">© 2024 Quản Lý Thư Viện. All Rights Reserved.</p>
    </div>
    
    <!-- Phần liên hệ và mạng xã hội -->
    <div class="d-flex justify-content-between align-items-center">
      <!-- Phần liên hệ -->
      <div class="footer-contact">
        <p class="mb-0 small">
          Liên hệ: 
          <a href="mailto:vub2012168@student.ctu.edu.vn">vub2012168@student.ctu.edu.vn</a> | 
          <a href="tel:+84901234567">+84 397 393 983</a>
        </p>
      </div>
      
      <!-- Phần mạng xã hội -->
      <div class="footer-social">
        <a href="https://www.facebook.com/QuangVuHi2105/" target="_blank" rel="noopener noreferrer" class="me-3">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="me-3">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="me-3">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>
</footer>


    </div>
</template>

<script>
export default {
    name: "Home",
};
</script>

<style scoped>
/* Tiêu đề */
h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #007bff;
}

/* Card */
.card {
    border: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.card-img-top {
    height: 250px;
    object-fit: contain; /* Hiển thị toàn bộ hình ảnh */
    border-radius: 0.25rem;
}

.card-title {
    color: #333;
    font-size: 1.25rem;
    font-weight: bold;
}

.card-text {
    color: #6c757d;
    font-size: 0.9rem;
}

/* Nút bấm */
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s ease-in-out;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004494;
    transform: translateY(-2px);
}

/* Footer */
.footer {
  background-color: #f8f9fa;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.85rem;
  padding: 1rem 0;
}

.footer .text-center {
  font-size: 0.85rem;
  color: #555;
}

.footer-contact {
  text-align: left;
  font-size: 1rem;
  line-height: 1.5;
}

.footer-social {
  text-align: right;
}

.footer a {
  color: #007bff;
  text-decoration: none;
}

.footer a:hover {
  color: #0056b3;
}

.footer i {
  font-size: 2rem;
  color: #007bff;
  transition: color 0.3s;
}

.footer i:hover {
  color: #0056b3;
  transform: scale(1.2);
}



/* Responsive */
@media (max-width: 768px) {
    .card {
        margin-bottom: 20px;
    }

    h1 {
        font-size: 2rem;
    }
}
</style>
