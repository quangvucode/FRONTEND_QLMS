<template>
  <div>
    <h1>{{ isEdit ? 'Tuỳ Chỉnh' : 'Thêm Sách' }}</h1>
    <form @submit.prevent="saveBook">
      <div class="mb-3">
        <label for="title" class="form-label">Tên Sách</label>
        <input
          v-model="book.title"
          type="text"
          class="form-control"
          id="title"
          required
          placeholder="Nhập tên sách"
        />
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Tác Giả</label>
        <input
          v-model="book.author"
          type="text"
          class="form-control"
          id="author"
          required
          placeholder="Nhập tác giả"
        />
      </div>
      <div class="mb-3">
        <label for="publicationYear" class="form-label">Năm Xuất Bản</label>
        <input
          v-model="book.publicationYear"
          type="number"
          class="form-control"
          id="publicationYear"
          required
          placeholder="Nhập năm xuất bản"
        />
      </div>
      <div class="mb-3">
        <label for="publisher" class="form-label">Nhà Xuất Bản</label>
        <input
          v-model="book.publisher"
          type="text"
          class="form-control"
          id="publisher"
          required
          placeholder="Nhập nhà xuất bản"
        />
      </div>
      <div class="mb-3">
        <label for="copies" class="form-label">Số Bản Phát Hành</label>
        <input
          v-model="book.copies"
          type="number"
          class="form-control"
          id="copies"
          required
        />
      </div>
      <div class="mb-3">
        <label for="image" class="form-label">Ảnh Sách</label>
        <input
          type="file"
          class="form-control"
          id="image"
          @change="handleFileUpload"
          accept="image/*"
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? 'Cập nhật' : 'Lưu' }}
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
.card-img-top {
  object-fit: cover;
}
</style>
