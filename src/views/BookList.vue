<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Danh sách Sách</h1>
        <router-link to="/books/add" class="btn btn-primary mb-3">Thêm sách</router-link>

        <div class="row gx-3 gy-4"><!-- Sử dụng gx-3 để giảm khoảng cách ngang, gy-4 để kiểm soát khoảng cách dọc -->
            <div
                class="col-12 col-md-6 col-lg-4"
                v-for="book in books"
                :key="book._id"
            >
                <BookCard
                    :book="book"
                    @delete-book="deleteBook"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import BookCard from '../components/BookCard.vue';
import bookService from '../services/book.service';

export default {
    components: { BookCard },
    data() {
        return {
            books: [],
        };
    },
    async created() {
        try {
            const response = await bookService.getAll();
            this.books = response.data;
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    },
    methods: {
        async deleteBook(id) {
            try {
                const result = await Swal.fire({
                    title: 'Bạn có chắc muốn xoá sách này?',
                    text: "Hành động này không thể hoàn tác!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Xóa',
                    cancelButtonText: 'Hủy',
                });

                if (result.isConfirmed) {
                    await bookService.delete(id);
                    this.books = this.books.filter(book => book._id !== id);
                    Swal.fire('Đã xóa!', 'Sách đã được xóa thành công.', 'success');
                }
            } catch (error) {
                console.error("Error deleting book:", error);
                Swal.fire('Lỗi!', 'Không thể xóa sách, vui lòng thử lại.', 'error');
            }
        },
    },
};
</script>
