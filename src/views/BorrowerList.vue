<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Danh Sách Người Mượn</h1>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <!-- Thanh tìm kiếm -->
            <div class="search-bar w-50">
                <input v-model="searchQuery" type="text" class="form-control"
                    placeholder="Tìm kiếm người mượn theo tên..." />
            </div>
            <!-- Nút thêm người mượn -->
            <router-link to="/borrowers/add" class="btn-custom">
                <i class="bi bi-plus-circle me-2"></i> Thêm Người Mượn
            </router-link>
        </div>

        <div class="row gx-3 gy-4">
            <div class="col-12 col-md-6 col-lg-4" v-for="borrower in filteredBorrowers" :key="borrower._id">
                <BorrowerCard :borrower="borrower" @delete-borrower="confirmDelete" />
            </div>
        </div>
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
            borrowers: [], // Danh sách người mượn
            searchQuery: '', // Lưu từ khóa tìm kiếm
        };
    },
    async created() {
        try {
            const response = await borrowerService.getAll(); // Lấy danh sách người mượn từ API
            this.borrowers = response.data;
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    },
    computed: {
        filteredBorrowers() {
            // Lọc danh sách người mượn dựa trên từ khóa tìm kiếm
            return this.borrowers.filter((borrower) =>
                borrower.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        async confirmDelete(id) {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn muốn xoá?',
                text: 'Hành động này không thể hoàn tác!',
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
        async deleteBorrower(id) {
            try {
                await borrowerService.delete(id); // Gọi API để xóa người mượn
                this.borrowers = this.borrowers.filter((borrower) => borrower._id !== id); // Cập nhật danh sách hiển thị

                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa thành công!',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } catch (error) {
                console.error('Error deleting borrower:', error);
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
<style scoped>
/* Nút thêm người mượn */
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

/* Thanh tìm kiếm */
.search-bar input {
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    transition: border-color 0.3s ease-in-out;
}

.search-bar input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}
</style>

