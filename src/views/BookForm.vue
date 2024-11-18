<template>
  <div>
    <h1>{{ isEdit ? 'Tuỳ Chỉnh' : 'Thêm Sách' }}</h1>
    <form @submit.prevent="saveBook">
      <div class="mb-3">
        <label for="title" class="form-label">Tên Sách</label>
        <input v-model="book.title" type="text" class="form-control" id="title" required />
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Tác Giả</label>
        <input v-model="book.author" type="text" class="form-control" id="author" required />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu' }}</button>
    </form>
  </div>
</template>

<script>
import BookService from '../services/book.service';

export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
      },
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
        console.error("Error fetching book:", error);
      }
    }
  },
  methods: {
    async saveBook() {
      try {
        if (this.isEdit) {
          await BookService.update(this.$route.params.id, this.book);
        } else {
          await BookService.create(this.book);
        }
        this.$router.push('/books');
      } catch (error) {
        console.error("Error saving book:", error);
      }
    },
  },
};
</script>
