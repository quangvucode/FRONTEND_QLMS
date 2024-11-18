<template>
    <div>
        <h1>Danh Sách Người Mượn</h1>
        <router-link to="/borrowers/add" class="btn btn-primary mb-3">Thêm người mượn</router-link>
        <BorrowerCard v-for="borrower in borrowers" :key="borrower._id" :borrower="borrower"
            @delete-borrower="deleteBorrower" />
    </div>
</template>

<script>
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
        const response = await borrowerService.getAll();
        this.borrowers = response.data;
    },
    methods: {
        async deleteBorrower(id) {
            await borrowerService.delete(id);
            this.borrowers = this.borrowers.filter(borrower => borrower._id !== id);
        },
    },
};
</script>
