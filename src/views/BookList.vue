<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Danh sách Sách</h1>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="search-bar w-50">
                <input v-model="searchQuery" type="text" class="form-control" placeholder="Tìm kiếm sách theo tên..." />
            </div>
            <!-- Nút Thêm sách -->
            <router-link to="/books/add" class="btn-custom">
                <i class="bi bi-plus-circle me-2"></i> Thêm sách
            </router-link>
        </div>

        <div class="row gx-3 gy-4">
            <div class="col-12 col-md-6 col-lg-4" v-for="book in filteredBooks" :key="book._id">
                <BookCard :book="book" @delete-book="deleteBook" />
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
            books: [], // Danh sách sách từ API
            searchQuery: "", // Giá trị tìm kiếm
        };
    },
    computed: {
        // Trả về danh sách sách đã được lọc theo tên
        filteredBooks() {
            return this.books.filter(book =>
                book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
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
<style scoped>
.search-bar {
    position: relative;
}

.search-bar input {
    border: 2px solid #007bff;
    border-radius: 20px;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
}

.search-bar input:focus {
    border-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.search-bar input::placeholder {
    color: #aaa;
    font-style: italic;
}
/* Nút thêm sách tùy chỉnh */
.btn-custom {
    display: inline-flex;
    align-items: center;
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    border: 2px solid transparent;
}

.btn-custom i {
    font-size: 1.2rem;
}

.btn-custom:hover {
    background-color: #0056b3;
    color: #fff;
    border-color: #0056b3;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}
</style>
