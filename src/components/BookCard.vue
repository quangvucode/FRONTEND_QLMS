<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">Tác giả: {{ book.author }}</p>
            <p class="card-text">Nhà xuất bản: {{ book.publisher }}</p>
            <p class="card-text">Năm xuất bản: {{ book.publicationYear }}</p>
            <p class="card-text">Số sách xuất bản: {{ book.copies }}</p>
            <button @click="editBook" class="btn btn-primary me-2">Sửa sách</button>
            <button @click="deleteBook" class="btn btn-danger">Xoá sách</button>
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
