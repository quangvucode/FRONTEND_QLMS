<template>
    <div class="book-card shadow-lg">
        <!-- Hình ảnh sách -->
        <div class="book-image-container">
            <img
                v-if="book.image"
                :src="`http://localhost:3000${book.image}`"
                class="book-image"
                :alt="`Ảnh của sách ${book.title}`"
            />
        </div>
        <!-- Thông tin sách -->
        <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text"><strong>Tác giả:</strong> {{ book.author }}</p>
            <p class="card-text"><strong>Nhà xuất bản:</strong> {{ book.publisher }}</p>
            <p class="card-text"><strong>Năm xuất bản:</strong> {{ book.publicationYear }}</p>
            <p class="card-text"><strong>Số bản phát hành:</strong> {{ book.copies }}</p>
            <!-- Các nút hành động -->
            <div class="d-flex justify-content-start mt-3">
                <button @click="editBook" class="btn btn-primary btn-sm me-2">Sửa</button>
                <button @click="deleteBook" class="btn btn-danger btn-sm">Xóa</button>
            </div>
        </div>
    </div>
</template>




<script>
export default {
    props: {
        book: {
            type: Object,
            required: true,
        },
    },
    methods: {
        editBook() {
            this.$router.push(`/books/edit/${this.book._id}`);
        },
        deleteBook() {
            this.$emit("delete-book", this.book._id);
        },
    },
};
</script>



<style scoped>
.book-card {
    display: flex;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin: 1rem auto; /* Khoảng cách giữa các thẻ */
    padding: 0.5rem;
    max-width: 100%;
}

.book-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.book-image-container {
    flex-shrink: 0;
    width: 200px;
    height: 300px; /* Cập nhật kích thước ảnh */
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
}

.book-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
    flex-grow: 1;
    padding: 1.5rem;
}

.card-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
}

.card-text {
    font-size: 1rem;
    color: #555;
    margin-bottom: 0.6rem;
}
</style>




