import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../views/BookList.vue';
import BorrowerList from '../views/BorrowerList.vue';
import LoanList from '../views/LoanList.vue';
import BookForm from '../views/BookForm.vue';
import BorrowerForm from '../views/BorrowerForm.vue';
import LoanForm from '../views/LoanForm.vue';
import UpdateLoanStatusForm from '../views/UpdateLoanStatusForm.vue';


const routes = [
    { path: '/', redirect: '/books' },
    { path: '/books', component: BookList },
    { path: '/books/add', component: BookForm },
    { path: '/books/edit/:id', component: BookForm },
    { path: '/borrowers', component: BorrowerList },
    { path: '/borrowers/add', component: BorrowerForm },
    { path: '/borrowers/edit/:id', component: BorrowerForm },
    { path: '/loans', component: LoanList },
    { path: '/loans/add', component: LoanForm },
    { path: '/loans/edit/:id', component: LoanForm },
    { path: '/loans/update-status/:id', component: UpdateLoanStatusForm },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
