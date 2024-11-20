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
        // Kiểm tra nếu là FormData thì sử dụng Content-Type multipart/form-data
        if (data instanceof FormData) {
            return apiClient.post('/books', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return apiClient.post('/books', data); // Trường hợp không có file
    }

    // Cập nhật thông tin sách theo ID
    update(id, data) {
        // Kiểm tra nếu là FormData thì sử dụng Content-Type multipart/form-data
        if (data instanceof FormData) {
            return apiClient.put(`/books/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return apiClient.put(`/books/${id}`, data); // Trường hợp không có file
    }

    // Xóa sách theo ID
    delete(id) {
        return apiClient.delete(`/books/${id}`);
    }
}

export default new BookService();
