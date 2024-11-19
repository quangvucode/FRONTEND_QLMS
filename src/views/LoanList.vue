<template>
    <div>
        <h1>Danh sách theo dõi mượn sách</h1>
        <router-link to="/loans/add" class="btn btn-primary mb-3">Thêm theo dõi ngày mượn</router-link>
        <div v-if="loans.length === 0">Không có dữ liệu mượn sách.</div>
        <!-- Sử dụng LoanCard để hiển thị từng loan -->
        <LoanCard
            v-for="loan in loans"
            :key="loan._id"
            :loan="loan"
            @delete-loan="confirmDelete"
        />
    </div>
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2
import LoanCard from '../components/LoanCard.vue';
import LoanService from '../services/loan.service';

export default {
    components: { LoanCard },
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
        // Hiển thị thông báo xác nhận trước khi xóa
        async confirmDelete(id) {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn muốn xoá?',
                text: "Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            });

            if (result.isConfirmed) {
                this.deleteLoan(id);
            }
        },

        // Xóa trạng thái mượn sách
        async deleteLoan(id) {
            try {
                await LoanService.delete(id); // Gọi API để xóa trạng thái mượn sách
                this.loans = this.loans.filter(loan => loan._id !== id); // Cập nhật danh sách hiển thị

                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error deleting loan:", error);

                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Không thể xóa trạng thái mượn sách. Vui lòng thử lại!',
                });
            }
        },
    },
};
</script>
