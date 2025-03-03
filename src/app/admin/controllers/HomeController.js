// src/app/admin/controllers/HomeController.js
import UserService from '../services/UserService.js';
import BookingService from '../services/BookingService.js';
import MusicService from '../services/MusicService.js';

export const index = async (req, res, next) => {
    try {
        const totalUsers = await UserService.getTotalUsers();
        const totalBookings = await BookingService.getTotalBookings();
        const totalSongs = await MusicService.getTotalSongs();
        const recentBookings = await BookingService.getRecentBookings();

        res.render('dashboard', {
            title: 'Dashboard',
            totalUsers,
            totalBookings,
            totalSongs,
            recentBookings,
            layout: 'admin'
        });

    } catch (error) {
        next(error);
    }
};