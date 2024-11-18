<template>
    <div>
        <h1>Danh sách</h1>
        <router-link to="/books/add" class="btn btn-primary mb-3">Thêm sách</router-link>
        <div v-for="book in books" :key="book._id" class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">{{ book.author }}</p>
                <router-link :to="`/books/edit/${book._id}`" class="btn btn-primary">Sửa sách</router-link>
                <br><button @click="deleteBook(book._id)" class="btn btn-danger">Xoá sách</button>
            </div>
        </div>
    </div>
</template>

<script>
import bookService from '../services/book.service';

export default {
    data() {
        return {
            books: [],
        };
    },
    async created() {
        const response = await bookService.getAll();
        this.books = response.data;
    },
    methods: {
        async deleteBook(id) {
            await bookService.delete(id);
            this.books = this.books.filter(book => book._id !== id);
        },
    },
};
</script>
