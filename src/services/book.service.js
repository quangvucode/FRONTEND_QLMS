// src/services/book.service.js
import apiClient from './api.service';

class BookService {
    // Lấy danh sách tất cả các sách
    getAll() {
        return apiClient.get('/books');
    }

    // Lấy chi tiết một cuốn sách theo ID
    get(id) {
        return apiClient.get(`/books/${id}`);
    }

    // Thêm một cuốn sách mới
    create(data) {
        return apiClient.post('/books', data);
    }

    // Cập nhật thông tin sách theo ID
    update(id, data) {
        return apiClient.put(`/books/${id}`, data);
    }

    // Xóa sách theo ID
    delete(id) {
        return apiClient.delete(`/books/${id}`);
    }
}

export default new BookService();
