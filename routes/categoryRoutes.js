import { Router } from 'express';
import { getAllCategories, getAllSubCategories } from '../helpers/category.js'
import { categoryValidator } from '../validator/validator.js';

import { param } from 'express-validator';

const router = Router({ mergeParams: true });

router.get(
    '/', getAllCategories
);

router.get('/:id',
    [param('id').notEmpty().escape().trim().isNumeric().custom(categoryValidator)],
    getAllSubCategories
)
export default router;