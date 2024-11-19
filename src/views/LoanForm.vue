<template>
    <div>
        <h1>{{ isEdit ? 'Chỉnh sửa mượn sách' : 'Thêm theo dõi mượn sách' }}</h1>
        <form @submit.prevent="saveLoan">
            <div class="mb-3">
                <label for="book" class="form-label">Sách muốn mượn</label>
                <select v-model="loan.bookId" class="form-control" required>
                    <option v-for="book in books" :key="book._id" :value="book._id">{{ book.title }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="borrower" class="form-label">Người mượn sách</label>
                <select v-model="loan.borrowerId" class="form-control" required>
                    <option v-for="borrower in borrowers" :key="borrower._id" :value="borrower._id">{{ borrower.name }}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="loanDate" class="form-label">Ngày mượn</label>
                <input v-model="loan.loanDate" type="date" class="form-control" id="loanDate" required />
            </div>
            <div class="mb-3">
                <label for="returnDate" class="form-label">Ngày trả</label>
                <input v-model="loan.returnDate" type="date" class="form-control" id="returnDate" />
                <small v-if="error" class="text-danger">{{ error }}</small>
            </div>
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu theo dõi' }}</button>
        </form>
    </div>
</template>

<script>
import loanService from '../services/loan.service';
import bookService from '../services/book.service';
import borrowerService from '../services/borrower.service';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            loan: {
                bookId: '',
                borrowerId: '',
                loanDate: '',
                returnDate: '',
            },
            books: [],
            borrowers: [],
            isEdit: false,
            error: '', // Biến để lưu thông báo lỗi ngày mượn và trả
        };
    },
    async created() {
        try {
            // Load danh sách sách và người mượn
            const bookResponse = await bookService.getAll();
            this.books = bookResponse.data;

            const borrowerResponse = await borrowerService.getAll();
            this.borrowers = borrowerResponse.data;

            // Load dữ liệu nếu đang chỉnh sửa
            if (this.$route.params.id) {
                this.isEdit = true;
                const response = await loanService.get(this.$route.params.id);
                this.loan = response.data;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    methods: {
        async saveLoan() {
            // Kiểm tra ràng buộc ngày mượn và trả
            const loanDate = new Date(this.loan.loanDate);
            const returnDate = new Date(this.loan.returnDate);

            if (this.loan.returnDate && returnDate < loanDate) {
                this.error = "Lỗi,không hợp lí.";
                return;
            }

            try {
                if (this.isEdit) {
                    await loanService.update(this.$route.params.id, this.loan);
                    Swal.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    await loanService.create(this.loan);
                    Swal.fire({
                        icon: 'success',
                        title: 'Lưu theo dõi thành công!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                this.$router.push('/loans');
            } catch (error) {
                console.error("Error saving loan:", error);
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
