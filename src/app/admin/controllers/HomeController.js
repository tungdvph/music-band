// src/app/admin/controllers/HomeController.js
import UserService from '../services/UserService.js';
import BookingService from '../services/BookingService.js';
import MusicService from '../services/MusicService.js';
import ContactService from '../services/ContactService.js';

export const index = async (req, res, next) => {
    try {
        const userService = new UserService();       // Tạo instance
        const bookingService = new BookingService(); // Tạo instance
        const musicService = new MusicService();       // Tạo instance
        const contactService = new ContactService();     // Tạo instance

        const totalUsers = await userService.getTotalUsers();
        const totalBookings = await bookingService.getTotalBookings();
        const totalSongs = await musicService.getTotalSongs();
        const recentBookings = await bookingService.getRecentBookings();
        const totalContacts = await contactService.getAllContacts();

        const currentYear = new Date().getFullYear();
        const revenueData = await BookingService.getRevenueByMonth(currentYear);
        console.log("revenueData:", revenueData);
        const bookingStatusCounts = await bookingService.getBookingStatusCounts();
        const contactStatusCounts = await contactService.getContactStatusCounts();

        res.render('dashboard', {
            title: 'Dashboard',
            totalUsers,
            totalBookings,
            totalSongs,
            recentBookings,
            revenueData,
            bookingStatusCounts,
            contactStatusCounts,
            totalContacts: totalContacts.length, //Sử dụng biến totalContacts
            layout: 'admin'
        });
    } catch (error) {
        next(error);
    }
};