<template>
    <div>
        <h1>Danh sách theo dỗi mượn sách</h1>
        <router-link to="/loans/add" class="btn btn-primary mb-3">Thêm theo dỗi ngày mượn</router-link>
        <div v-if="loans.length === 0">Không có dữ liệu mượn sách.</div>
        <div v-for="loan in loans" :key="loan._id" class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ loan.bookTitle }}</h5>
                <p class="card-text">Người mượn: {{ loan.borrowerName }}</p>
                <p class="card-text">Ngày mượn: {{ loan.loanDate }}</p>
                <p class="card-text">Ngày trả:{{ loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() :'Chưa trả' }}</p>
                <p class="card-text">Trạng thái: {{ loan.returned ? 'Đã trả' : 'Chưa trả' }}</p>
                <router-link :to="`/loans/update-status/${loan._id}`" class="btn btn-primary me-2">Cập nhật theo dỗi</router-link>
                <button @click="deleteLoan(loan._id)" class="btn btn-danger">Xoá trạng thái</button>
            </div>
        </div>
    </div>
</template>

<script>
import LoanService from '../services/loan.service';

export default {
    data() {
        return {
            loans: [],
        };
    },
    async created() {
        try {
            const response = await LoanService.getAll();
            this.loans = response.data;
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    },
    methods: {
        async deleteLoan(id) {
            try {
                await LoanService.delete(id);
                this.loans = this.loans.filter(loan => loan._id !== id);
            } catch (error) {
                console.error("Error deleting loan:", error);
            }
        },
    },
};
</script>
