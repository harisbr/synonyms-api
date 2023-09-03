import express from 'express';
import synonymsRoutes from './synonymsRoute.js';

const router = express.Router();

router.use('/synonyms', synonymsRoutes);

export default router;
