<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ loan.bookTitle }} - {{ loan.borrowerName }}</h5>
            <p class="card-text">Ngày mượn: {{ new Date(loan.loanDate).toLocaleDateString() }}</p>
            <p class="card-text">
                Ngày trả : {{ loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : "Not Returned" }}
            </p>
            <p class="card-text">Trạng thái: {{ loan.returned ? "Yes" : "No" }}</p>
            <button @click="editLoan" class="btn btn-primary me-2">Tuỳ chỉnh</button>
            <button @click="deleteLoan" class="btn btn-danger">Xoá</button>
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
        editLoan() {
            this.$router.push(`/loans/edit/${this.loan._id}`);
        },
        deleteLoan() {
            this.$emit("delete-loan", this.loan._id);
        },
    },
};
</script>
