import { Router } from 'express';
import { getTimeline } from '../helpers/timeline.js'
const router = Router({ mergeParams: true });
router.get(
    '/', getTimeline
)
export default router;