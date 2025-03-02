//src/app/admin/services/BandService.js

import Band from '../../models/Band.js';

class BandService {
    async getAllBands() {
        try {
            const bands = await Band.find({}).lean();
            return bands;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách ban nhạc: ' + error.message);
        }
    }
    // các phương thức khác liên quan đến Band (create, update, delete, getById, getBySlug, ...)
}

export default new BandService();