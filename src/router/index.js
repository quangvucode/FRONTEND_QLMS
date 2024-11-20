import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../views/BookList.vue';
import Home from '../views/Home.vue';
import BorrowerList from '../views/BorrowerList.vue';
import LoanList from '../views/LoanList.vue';
import BookForm from '../views/BookForm.vue';
import BorrowerForm from '../views/BorrowerForm.vue';
import LoanForm from '../views/LoanForm.vue';
import UpdateLoanStatusForm from '../views/UpdateLoanStatusForm.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/books', component: BookList },
    { path: '/books/add', component: BookForm },
    { path: '/books/edit/:id', component: BookForm },
    { path: '/borrowers', component: BorrowerList },
    { path: '/borrowers/add', component: BorrowerForm },
    { path: '/borrowers/edit/:id', component: BorrowerForm },
    { path: '/loans', component: LoanList },
    { path: '/loans/add', component: LoanForm },
    { path: '/loans/update-status/:id', component: UpdateLoanStatusForm },
    { path: '/login', component: Login },
    { path: '/register', component: Register },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
