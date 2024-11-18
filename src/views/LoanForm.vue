<template>
    <div>
        <h1>{{ isEdit ? 'Chỉnh sửa mượn sách' : 'Thêm theo dỗi mượn sách' }}</h1>
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
                    <option v-for="borrower in borrowers" :key="borrower._id" :value="borrower._id">{{ borrower.name }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="loanDate" class="form-label">Ngày mượn</label>
                <input v-model="loan.loanDate" type="date" class="form-control" id="loanDate" required />
            </div>
            <div class="mb-3">
                <label for="returnDate" class="form-label">Ngày trả</label>
                <input v-model="loan.returnDate" type="date" class="form-control" id="returnDate" />
            </div>
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu trạng thái' }}</button>
        </form>
    </div>
</template>

<script>
import loanService from '../services/loan.service';
import bookService from '../services/book.service';
import borrowerService from '../services/borrower.service';

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
        };
    },
    async created() {
        // Load all books and borrowers for selection
        const bookResponse = await bookService.getAll();
        this.books = bookResponse.data;

        const borrowerResponse = await borrowerService.getAll();
        this.borrowers = borrowerResponse.data;

        // Load loan data if editing
        if (this.$route.params.id) {
            this.isEdit = true;
            const response = await loanService.get(this.$route.params.id);
            this.loan = response.data;
        }
    },
    methods: {
        async saveLoan() {
            if (this.isEdit) {
                if (this.loan.returned) {
                    this.loan.returnDate = new Date(); // Đặt ngày hiện tại cho returnDate khi trả
                }
                await loanService.update(this.$route.params.id, this.loan);
            } else {
                await loanService.create(this.loan);
            }
            this.$router.push('/loans');
        }
    },
};
</script>
