const express = require('express');
const router = express.Router();
const { getAllReports, getReportById, createReport, updateReport, deleteReport, getReportsByMonth, getFrequentReportTypes, getFrequentLocations, getReportsByLocation } = require('../controllers/communityController');
const upload = require('../middleware/uploader');
const authMiddleware = require('../middleware/auth');
/**
 * @swagger
 * tags:
 *   name: CommunityReports
 *   description: Community report management
 */

/**
 * @swagger
 * /community-reports:
 *   get:
 *     summary: Get all community reports
 *     tags: [CommunityReports]
 *     responses:
 *       200:
 *         description: A list of community reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   report_id:
 *                     type: integer
 *                     example: 1
 *                   report_type:
 *                     type: string
 *                     example: "Flooding"
 *                   location:
 *                     type: string
 *                     example: "Njoro"
 *                   description:
 *                     type: string
 *                     example: "Flooding near the river Njoro."
 *                   status:
 *                     type: string
 *                     example: "pending"
 *                   image_url:
 *                     type: string
 *                     example: "http://example.com/image.jpg"
 */
router.get('/', getAllReports);

/**
 * @swagger
 * /community-reports/{id}:
 *   get:
 *     summary: Get a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Report ID
 *     responses:
 *       200:
 *         description: A community report object
 *       404:
 *         description: Report not found
 */
router.get('/:id', getReportById);

/**
 * @swagger
 * /community-reports:
 *   post:
 *     summary: Create a new community report
 *     tags: [CommunityReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - report_type
 *               - location
 *             properties:
 *               report_type:
 *                 type: string
 *                 enum: ['FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding']
 *                 example: "Flooding"
 *               location:
 *                 type: string
 *                 example: "Nairobi"
 *               description:
 *                 type: string
 *                 example: "Flooding near the river."
 *               image_url:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               status:
 *                 type: string
 *                 enum: [pending, verified, rejected]
 *                 example: "pending"
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Report created successfully
 *       400:
 *         description: Bad request
 */
// router.post('/', upload.single('image'), createReport);
// router.post('/', authMiddleware, upload.single('image'), createReport);
router.post('/', authMiddleware, upload.single('image'), createReport);

/**
 * @swagger
 * /community-reports/{id}:
 *   put:
 *     summary: Update a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               report_type:
 *                 type: string
 *                 enum: ['FlashFlood', 'RiverFlood', 'CoastalFlood', 'UrbanFlood', 'ElNinoFlooding']
 *                 example: "Flooding"
 *               location:
 *                 type: stringy
 *                 example: "Nairobi"
 *               description:
 *                 type: string
 *                 example: "Updated flood warning near the river."
 *               image_url:
 *                 type: string
 *                 example: "http://example.com/updated_image.jpg"
 *               status:
 *                 type: string
 *                 enum: [pending, verified, rejected]
 *                 example: "verified"
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 */
router.put('/:id', updateReport);

/**
 * @swagger
 * /community-reports/{id}:
 *   delete:
 *     summary: Delete a community report by ID
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Report ID
 *     responses:
 *       204:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 */
router.delete('/:id', deleteReport);
/**
 * @swagger
 * /community-reports/filter/month:
 *   get:
 *     summary: Get reports by month and year
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: List of reports filtered by month
 */
router.get('/filter/month', getReportsByMonth);

/**
 * @swagger
 * /community-reports/analytics/frequent-types:
 *   get:
 *     summary: Get most frequent report types
 *     tags: [CommunityReports]
 *     responses:
 *       200:
 *         description: List of frequent report types with counts
 */
router.get('/analytics/frequent-types', getFrequentReportTypes);

/**
 * @swagger
 * /community-reports/analytics/frequent-locations:
 *   get:
 *     summary: Get most frequent report locations
 *     tags: [CommunityReports]
 *     responses:
 *       200:
 *         description: List of frequent locations with counts
 */
router.get('/analytics/frequent-locations', getFrequentLocations);

/**
 * @swagger
 * /community-reports/filter/location:
 *   get:
 *     summary: Get reports by location
 *     tags: [CommunityReports]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of reports filtered by location
 */
router.get('/filter/location', getReportsByLocation);
module.exports = router;
