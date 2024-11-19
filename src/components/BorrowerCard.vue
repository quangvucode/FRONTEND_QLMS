<template>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">Tên Người Mượn: {{ borrower.name }}</h5>
            <p class="card-text">Địa Chỉ: {{ borrower.contact }}</p>
            <p class="card-text">Email: {{ borrower.email }}</p>
            <p class="card-text">Số điện thoại: {{ borrower.phone }}</p>
            <button @click="editBorrower" class="btn btn-primary me-2">Tuỳ chỉnh người mượn</button>
            <button @click="deleteBorrower" class="btn btn-danger">Xoá người mượn</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        borrower: {
            type: Object,
            required: true,
        },
    },
    methods: {
        editBorrower() {
            this.$router.push(`/borrowers/edit/${this.borrower._id}`);
        },
        deleteBorrower() {
            this.$emit("delete-borrower", this.borrower._id);
        },
    },
};
</script>
