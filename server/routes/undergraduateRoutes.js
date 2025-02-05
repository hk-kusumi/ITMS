const { Router } = require('express');
const undergraduateController = require('../controllers/undergraduateController');
const { restrictedTo } = require('../middleware/authMiddleware');
const { cvUpload, imageUpload } = require('../middleware/uploadMiddleware');
const { deleteExistingImage } = require('../middleware/deleteMiddleware');

const router = Router();

router.route('/create')
    .post(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.createUndergraduate)

router.route('/user/all')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.viewAll)

router.route('/user/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getUndergraduate)
    .patch(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.updateUndergraduateUser)

router.route('/profile')
    .get(restrictedTo('undergraduate'), undergraduateController.viewProfile)
    .patch(restrictedTo('undergraduate'), undergraduateController.updateProfile)

router.route('/profile/image')
    .patch(restrictedTo('undergraduate'), deleteExistingImage, imageUpload, undergraduateController.updateProfileImage)

router.route('/dashboard')
    .get(restrictedTo('undergraduate'), undergraduateController.undergraduateDashboard)

router.route('/delete/:userId')
    .delete(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.deleteUndergraduate)

// ############################## Private Notes ##############################

router.route('/note')
    .post(restrictedTo('undergraduate'), undergraduateController.addNote)
    .patch(restrictedTo('undergraduate'), undergraduateController.editNote)

router.route('/note/all')
    .get(restrictedTo('undergraduate'), undergraduateController.getAllNotes)

router.route('/note/:noteId')
    .get(restrictedTo('undergraduate'), undergraduateController.getNote)

// ############################## Intern Process ##############################

router.route('/intern/list')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.viewInternList)

router.route('/intern/company-selection')
    .get(restrictedTo('undergraduate'), undergraduateController.getCompanySelection)
    .patch(restrictedTo('undergraduate'), undergraduateController.updateCompanySelection)

router.route('/intern/set-weighted-gpa')
    .post(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.setWeightedGPA)

// 🛑 This is a tempory route controller. just for checking 🛑
router.route('/intern/status/add')
    .patch(undergraduateController.addInternStatus)

router.route('/intern/status')
    .patch(restrictedTo('undergraduate'), undergraduateController.updateInternStatus)

router.route('/intern/assign-supervisor/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.assignSupervisorGET)
    .patch(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.assignSupervisorPATCH)

router.route('/intern/internship')
    .patch(restrictedTo('undergraduate'), undergraduateController.updateInternship)

// ############################## Daily Reports ##############################

router.route('/daily-report/all')
    .get(restrictedTo('undergraduate'), undergraduateController.viewAllDailyReports)

router.route('/daily-report/:weekNo')
    .get(restrictedTo('undergraduate'), undergraduateController.viewDailyReport);

router.route('/daily-report')
    .post(restrictedTo('undergraduate'), undergraduateController.editDailyReport)

router.route('/daily-report/weekly-problem-section')
    .post(restrictedTo('undergraduate'), undergraduateController.editDailyReportProblemSection)

router.route('/daily-report/submit')
    .patch(restrictedTo('undergraduate'), undergraduateController.submitDailyReport)

router.route('/daily-report/all/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getAllDailyReports)

router.route('/daily-report/:undergraduateId/week/:weekNo')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getDailyReport)

// ############################## Monthly Reports ##############################

router.route('/monthly-report/all')
    .get(restrictedTo('undergraduate'), undergraduateController.viewAllMonthlyReports)

router.route('/monthly-report/:monthNo')
    .get(restrictedTo('undergraduate'), undergraduateController.viewMonthlyReport);

router.route('/monthly-report/week')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyReportWeek)

router.route('/monthly-report/monthly-problem-section')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyProblemSection)

router.route('/monthly-report/leave-record')
    .post(restrictedTo('undergraduate'), undergraduateController.editMonthlyLeaveRecord)

router.route('/monthly-report/submit')
    .patch(restrictedTo('undergraduate'), undergraduateController.submitMonthlyReport)

router.route('/monthly-report/all/:undergraduateId')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getAllMonthlyReports)

router.route('/monthly-report/:undergraduateId/month/:monthNo')
    .get(restrictedTo('system-admin', 'department-coordinator'), undergraduateController.getDailyReport)

// ############################## CV Application ##############################

router.route('/info/upload-cv')
    .post(restrictedTo('undergraduate'), cvUpload, undergraduateController.uploadCV)

router.route('/info/soft-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addSoftSkill)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteSoftSkill)

router.route('/info/technology-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addTechnologySkill)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteTechnologySkill)

router.route('/info/certifications')
    .post(restrictedTo('undergraduate'), undergraduateController.addCertifications)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteCertifications)

router.route('/info/extra-activities')
    .post(restrictedTo('undergraduate'), undergraduateController.addExtraActivities)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteExtraActivities)

router.route('/info/projects')
    .post(restrictedTo('undergraduate'), undergraduateController.addProject)
    .delete(restrictedTo('undergraduate'), undergraduateController.deleteProject)

router.route('/info/english-skill')
    .post(restrictedTo('undergraduate'), undergraduateController.addEnglishSkill)

router.route('/info')
    .get(undergraduateController.getAdditionalInformation)

// ############################## Progress Report ##############################

router.route('progress-report/:internId')
    .post(restrictedTo('supervisor'), undergraduateController.addProgressReport)
    .get(restrictedTo('system-admin', 'department-coordinator', 'supervisor'), undergraduateController.getProgressReport)

// ############################## Final Feedback ##############################

router.route('final-feedback/:internId')
    .post(restrictedTo('supervisor'), undergraduateController.addFinalFeedback)
    .get(restrictedTo('system-admin', 'department-coordinator', 'supervisor'), undergraduateController.getFinalFeedback)

// get report admin supervisor have differnt perspectives

module.exports = router;