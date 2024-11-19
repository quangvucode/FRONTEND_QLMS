<template>
    <div>
        <h1>Danh sách Sách</h1>
        <router-link to="/books/add" class="btn btn-primary mb-3">Thêm sách</router-link>
        
        <!-- Sử dụng BookCard để hiển thị từng sách -->
        <BookCard
            v-for="book in books"
            :key="book._id"
            :book="book"
            @delete-book="deleteBook"
        />
    </div>
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2
import BookCard from '../components/BookCard.vue';
import bookService from '../services/book.service';

export default {
    components: { BookCard }, // Khai báo sử dụng BookCard
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
                // Hiển thị xác nhận trước khi xóa
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
                    await bookService.delete(id); // Gọi API để xóa sách
                    this.books = this.books.filter(book => book._id !== id); // Cập nhật danh sách

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
