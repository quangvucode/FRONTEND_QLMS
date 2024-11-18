<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Quản Lý Mượn Sách</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" exact>Trang Chủ</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/books" class="nav-link">Sách</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/borrowers" class="nav-link">Đọc Giả</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/loans" class="nav-link">Theo dỗi mượn sách</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
}
</style>
