<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">{{ isEdit ? 'Tuỳ Chỉnh' : 'Thêm Sách' }}</h1>
    <form @submit.prevent="saveBook" class="form-container p-4 shadow-lg rounded">
      <div class="mb-4">
        <label for="title" class="form-label">Tên Sách</label>
        <input v-model="book.title" type="text" class="form-control styled-input" id="title" required
          placeholder="Nhập tên sách" />
      </div>
      <div class="mb-4">
        <label for="author" class="form-label">Tác Giả</label>
        <input v-model="book.author" type="text" class="form-control styled-input" id="author" required
          placeholder="Nhập tác giả" />
      </div>
      <div class="mb-4">
        <label for="publicationYear" class="form-label">Năm Xuất Bản</label>
        <input v-model="book.publicationYear" type="number" class="form-control styled-input" id="publicationYear"
          required placeholder="Nhập năm xuất bản" />
      </div>
      <div class="mb-4">
        <label for="publisher" class="form-label">Nhà Xuất Bản</label>
        <input v-model="book.publisher" type="text" class="form-control styled-input" id="publisher" required
          placeholder="Nhập nhà xuất bản" />
      </div>
      <div class="mb-4">
        <label for="copies" class="form-label">Số Bản Phát Hành</label>
        <input v-model="book.copies" type="number" class="form-control styled-input" id="copies" required />
      </div>
      <div class="mb-4">
        <label for="image" class="form-label">Ảnh Sách</label>
        <input type="file" class="form-control file-input" id="image" @change="handleFileUpload" accept="image/*" />
      </div>
      <button type="submit" class="btn btn-custom w-100">
        <i class="bi bi-save me-2"></i>{{ isEdit ? 'Cập nhật' : 'Lưu' }}
      </button>
    </form>
  </div>
</template>

<script>
import BookService from '../services/book.service';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        publicationYear: '',
        publisher: '',
        copies: 1,
      },
      imageFile: null, // Biến lưu file ảnh
      isEdit: false,
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      try {
        const response = await BookService.get(this.$route.params.id);
        this.book = response.data;
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.imageFile = event.target.files[0]; // Lưu file ảnh được tải lên
    },
    async saveBook() {
      try {
        const formData = new FormData();

        // Thêm thông tin sách vào formData
        Object.keys(this.book).forEach((key) => {
          formData.append(key, this.book[key]);
        });

        // Thêm file ảnh nếu có
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        if (this.isEdit) {
          await BookService.update(this.$route.params.id, formData);
        } else {
          await BookService.create(formData);
        }

        // Hiển thị thông báo thành công
        Swal.fire({
          icon: 'success',
          title: 'Đã lưu thành công!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push('/books');
      } catch (error) {
        console.error('Error saving book:', error);

        // Hiển thị thông báo lỗi
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

.file-input {
  border-radius: 10px;
  padding: 0.5rem;
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
