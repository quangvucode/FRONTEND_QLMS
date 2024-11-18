import apiClient from './api.service';

class LoanService {
    // Lấy danh sách tất cả giao dịch mượn sách
    getAll() {
        return apiClient.get('/loans');
    }

    // Lấy chi tiết giao dịch mượn sách theo ID
    get(id) {
        return apiClient.get(`/loans/${id}`);
    }

    // Thêm giao dịch mượn sách mới
    create(data) {
        return apiClient.post('/loans', data);
    }

    // Cập nhật thông tin giao dịch mượn sách theo ID
    update(id, data) {
        return apiClient.put(`/loans/${id}`, data);
    }

    // Xóa giao dịch mượn sách theo ID
    delete(id) {
        return apiClient.delete(`/loans/${id}`);
    }
}

export default new LoanService();
