<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ loan.bookTitle }}</h5>
            <p class="card-text">Người mượn: {{ loan.borrowerName }}</p>
            <p class="card-text">Ngày mượn: {{ new Date(loan.loanDate).toLocaleDateString() }}</p>
            <p class="card-text">
                Ngày trả:
                {{ loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : 'Chưa trả' }}
            </p>
            <p class="card-text">Trạng thái: {{ loan.returned ? 'Đã trả' : 'Chưa trả' }}</p>
            <router-link
                :to="`/loans/update-status/${loan._id}`"
                class="btn btn-primary me-2"
            >
                Cập nhật theo dõi
            </router-link>
            <button @click="deleteLoan" class="btn btn-danger">Xoá trạng thái</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loan: {
            type: Object,
            required: true,
        },
    },
    methods: {
        deleteLoan() {
            this.$emit("delete-loan", this.loan._id);
        },
    },
};
</script>
