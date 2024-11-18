<template>
    <div>
        <h1>{{ isEdit ? 'Chỉnh sửa người mượn' : 'Thêm người mượn' }}</h1>
        <form @submit.prevent="saveBorrower">
            <div class="mb-3">
                <label for="name" class="form-label">Tên người mượn</label>
                <input v-model="borrower.name" type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="borrower.email" type="email" class="form-control" id="email" required />
            </div>
            <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu thông tin' }}</button>
        </form>
    </div>
</template>

<script>
import borrowerService from '../services/borrower.service';

export default {
    data() {
        return {
            borrower: {
                name: '',
                email: '',
            },
            isEdit: false,
        };
    },
    async created() {
        if (this.$route.params.id) {
            this.isEdit = true;
            const response = await borrowerService.get(this.$route.params.id);
            this.borrower = response.data;
        }
    },
    methods: {
        async saveBorrower() {
            if (this.isEdit) {
                await borrowerService.update(this.$route.params.id, this.borrower);
            } else {
                await borrowerService.create(this.borrower);
            }
            this.$router.push('/borrowers');
        },
    },
};
</script>
