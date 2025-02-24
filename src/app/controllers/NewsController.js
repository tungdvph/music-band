import News from '../models/News.js';

export const index = async (req, res) => {
    try {
        const news = await News.find({}).populate('author').lean(); // Populate the author field
        res.render('news', { title: 'Tin tức', news }); // Pass 'news' instead of 'newss'
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Lỗi khi tải trang tin tức.' });
    }
};