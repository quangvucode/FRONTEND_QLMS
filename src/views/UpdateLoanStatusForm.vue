<template>
    <div>
        <h1>Cập nhật trạng thái mượn sách</h1>
        <div v-if="loan">
            <p><strong>Sách:</strong> {{ loan.bookTitle }}</p>
            <p><strong>Người mượn:</strong> {{ loan.borrowerName }}</p>
            <p><strong>Ngày mượn:</strong> {{ formatDate(loan.loanDate) }}</p>
            <p><strong>Ngày trả:</strong> {{ loan.returnDate ? formatDate(loan.returnDate) : 'Chưa trả' }}</p>
            <div class="mb-3">
                <label for="returned" class="form-label">Trạng thái mượn sách:</label>
                <select v-model="loan.returned" class="form-control" id="returned">
                    <option :value="false">Chưa trả</option>
                    <option :value="true">Đã trả</option>
                </select>
            </div>
            <button @click="updateLoanStatus" class="btn btn-primary">Cập nhật</button>
        </div>
        <div v-else>
            <p>Đang tải thông tin mượn sách...</p>
        </div>
    </div>
</template>

<script>
import loanService from '../services/loan.service';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            loan: null, // Chứa dữ liệu mượn sách
        };
    },
    async created() {
        try {
            const response = await loanService.get(this.$route.params.id);
            this.loan = response.data;
        } catch (error) {
            console.error("Error fetching loan:", error);
        }
    },
    methods: {
        async updateLoanStatus() {
            if (this.loan.returned) {
                // Nếu chọn "Đã trả", cập nhật ngày trả là ngày hiện tại
                this.loan.returnDate = new Date();
            } else {
                // Nếu chọn "Chưa trả", xoá ngày trả
                this.loan.returnDate = null;
            }

            try {
                // Gửi yêu cầu cập nhật
                await loanService.update(this.$route.params.id, {
                    returned: this.loan.returned,
                    returnDate: this.loan.returnDate,
                });

                // Hiển thị thông báo cập nhật thành công
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Quay về danh sách mượn sách
                this.$router.push('/loans');
            } catch (error) {
                console.error("Error updating loan status:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Không thể cập nhật trạng thái mượn sách. Vui lòng thử lại!',
                });
            }
        },
        formatDate(date) {
            return date ? new Date(date).toLocaleDateString() : '';
        },
    },
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>
