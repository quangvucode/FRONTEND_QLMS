<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">{{ isEdit ? 'Chỉnh sửa người mượn' : 'Thêm người mượn' }}</h1>
    <form @submit.prevent="saveBorrower" class="form-container p-4 shadow-lg rounded">
      <div class="mb-4">
        <label for="name" class="form-label">Tên người mượn</label>
        <input v-model="borrower.name" type="text" class="form-control styled-input" id="name" required
          placeholder="Nhập tên người mượn" />
      </div>
      <div class="mb-4">
        <label for="address" class="form-label">Địa chỉ</label>
        <input v-model="borrower.address" type="text" class="form-control styled-input" id="address" required
          placeholder="Nhập địa chỉ" />
      </div>
      <div class="mb-4">
        <label for="email" class="form-label">Email</label>
        <input v-model="borrower.email" type="email" class="form-control styled-input" id="email" required
          placeholder="Nhập email" />
      </div>
      <div class="mb-4">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input v-model="borrower.phone" type="tel" class="form-control styled-input" id="phone" required
          placeholder="Nhập số điện thoại" />
      </div>
      <button type="submit" class="btn btn-custom w-100">
        <i class="bi bi-save me-2"></i>{{ isEdit ? 'Cập nhật' : 'Lưu thông tin' }}
      </button>
    </form>
  </div>
</template>

### Script:
```javascript
<script>
import BorrowerService from '../services/borrower.service';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      borrower: {
        name: '',
        address: '',
        email: '',
        phone: '',
      },
      isEdit: false,
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      try {
        const response = await BorrowerService.get(this.$route.params.id);
        this.borrower = response.data;
      } catch (error) {
        console.error("Error fetching borrower:", error);
      }
    }
  },
  methods: {
    async saveBorrower() {
      try {
        if (this.isEdit) {
          await BorrowerService.update(this.$route.params.id, this.borrower);
          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await BorrowerService.create(this.borrower);
          Swal.fire({
            icon: 'success',
            title: 'Đã lưu thông tin thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
        }

        this.$router.push('/borrowers');
      } catch (error) {
        console.error("Error saving borrower:", error);
        Swal.fire({
          icon: 'error',
          title: 'Có lỗi xảy ra',
          text: 'Vui lòng thử lại!',
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 600px;
}

.form-container {
  background-color: #f9f9f9;
  border: 2px solid #007bff;
}

.form-label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #555;
}

.styled-input {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 0.7rem 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.styled-input:focus {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.styled-input::placeholder {
  color: #aaa;
  font-style: italic;
}

.btn-custom {
  background-color: #007bff;
  color: white;
  padding: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}
</style>
