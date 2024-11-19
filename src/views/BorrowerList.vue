<template>
    <div>
        <h1>Danh Sách Người Mượn</h1>
        <router-link to="/borrowers/add" class="btn btn-primary mb-3">Thêm người mượn</router-link>
        
        <!-- Sử dụng BorrowerCard để hiển thị từng người mượn -->
        <BorrowerCard 
        v-for="borrower in borrowers" 
        :key="borrower._id" 
        :borrower="borrower"
        @delete-borrower="confirmDelete" />
    </div>
</template>

<script>
import Swal from 'sweetalert2'; // Import SweetAlert2
import BorrowerCard from '../components/BorrowerCard.vue';
import borrowerService from '../services/borrower.service';

export default {
    components: { BorrowerCard },
    data() {
        return {
            borrowers: [],
        };
    },
    async created() {
        try {
            const response = await borrowerService.getAll();
            this.borrowers = response.data;
        } catch (error) {
            console.error("Error fetching borrowers:", error);
        }
    },
    methods: {
        // Hiển thị thông báo nhắc nhở trước khi xóa
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
                this.deleteBorrower(id);
            }
        },

        // Xóa người mượn
        async deleteBorrower(id) {
            try {
                await borrowerService.delete(id); // Gọi API để xóa người mượn
                this.borrowers = this.borrowers.filter(borrower => borrower._id !== id); // Cập nhật danh sách hiển thị

                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error deleting borrower:", error);
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
