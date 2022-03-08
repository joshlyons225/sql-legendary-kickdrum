const express = require('express');
const router = express.Router();

router.use(require('./api/deptRoutes'));
router.use(require('./api/empRoutes'));
router.use(require('./api/roleRoutes'));

module.exports = router;