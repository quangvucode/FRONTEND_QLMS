<template>
  <div>
    <h1>{{ isEdit ? 'Chỉnh sửa người mượn' : 'Thêm người mượn' }}</h1>
    <form @submit.prevent="saveBorrower">
      <div class="mb-3">
        <label for="name" class="form-label">Tên người mượn</label>
        <input
          v-model="borrower.name"
          type="text"
          class="form-control"
          id="name"
          required
          placeholder="Nhập tên người mượn"
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <input
          v-model="borrower.contact"
          type="text"
          class="form-control"
          id="address"
          required
          placeholder="Nhập địa chỉ"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="borrower.email"
          type="email"
          class="form-control"
          id="email"
          required
          placeholder="Nhập email"
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input
          v-model="borrower.phone"
          type="tel"
          class="form-control"
          id="phone"
          required
          placeholder="Nhập số điện thoại"
        />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEdit ? 'Cập nhật' : 'Lưu thông tin' }}</button>
    </form>
  </div>
</template>

<script>
import BorrowerService from '../services/borrower.service';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      borrower: {
        name: '',
        address: '',
        email: '',
        phone: '',
      },
      isEdit: false,
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      try {
        const response = await BorrowerService.get(this.$route.params.id);
        this.borrower = response.data;
      } catch (error) {
        console.error("Error fetching borrower:", error);
      }
    }
  },
  methods: {
    async saveBorrower() {
      try {
        if (this.isEdit) {
          await BorrowerService.update(this.$route.params.id, this.borrower);
          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          await BorrowerService.create(this.borrower);
          Swal.fire({
            icon: 'success',
            title: 'Đã lưu thông tin thành công!',
            showConfirmButton: false,
            timer: 1500,
          });
        }

        this.$router.push('/borrowers');
      } catch (error) {
        console.error("Error saving borrower:", error);
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
