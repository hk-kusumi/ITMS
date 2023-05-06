const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { imageUpload } = require('../middleware/uploadMiddleware');

const router = Router();

router.route('/create-admin')
    .post(adminController.createAdmin)

router.route('/view-all-users/:userType')
    .get(adminController.viewAllUsers)

router.route('/search-users/:userType')
    .get(adminController.searchUsers)

router.route('/admin-profile/:id')
    .get(adminController.adminProfile)

router.route('/update-admin-profile')
    .patch(imageUpload, adminController.updateAdminProfile)

router.route('/get-all-daily-reports/:undergraduateId')
    .get(adminController.getAllDailyReports)

router.route('/get-daily-report/:undergraduateId/week/:weekNo')
    .get(adminController.getDailyReport);

module.exports = router;