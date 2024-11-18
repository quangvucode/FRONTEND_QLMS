// src/services/borrower.service.js
import apiClient from './api.service';

class BorrowerService {
    // Lấy danh sách tất cả người mượn
    getAll() {
        return apiClient.get('/borrowers');
    }

    // Lấy chi tiết người mượn theo ID
    get(id) {
        return apiClient.get(`/borrowers/${id}`);
    }

    // Thêm người mượn mới
    create(data) {
        return apiClient.post('/borrowers', data);
    }

    // Cập nhật thông tin người mượn theo ID
    update(id, data) {
        return apiClient.put(`/borrowers/${id}`, data);
    }

    // Xóa người mượn theo ID
    delete(id) {
        return apiClient.delete(`/borrowers/${id}`);
    }
}

export default new BorrowerService();
