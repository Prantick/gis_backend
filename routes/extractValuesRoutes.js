import { Router } from 'express';
import { getValuesMapViewOne, getValuesMapViewTwo, getValuesMapViewThree } from '../helpers/extractValues.js';
import { timeLineValidator, categoryValidator, subCategoryValidator, districtIdValidator, blockIdValidator } from '../validator/validator.js';
import { param } from 'express-validator';


const router = Router({ mergeParams: true });

router.get(
    '/:timeStart/:timeEnd/:categoryId/:subCategoryId',
    [
        param('timeStart').notEmpty().escape().trim().isDate(),
        param('timeEnd').notEmpty().escape().trim().isDate().custom(timeLineValidator),
        param('categoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 5 }).custom(categoryValidator),
        param('subCategoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 8 }).custom(subCategoryValidator)
    ],
    getValuesMapViewOne
);
router.get(
    '/:timeStart/:timeEnd/:categoryId/:subCategoryId/:districtId',
    [
        param('timeStart').notEmpty().escape().trim().isDate(),
        param('timeEnd').notEmpty().escape().trim().isDate().custom(timeLineValidator),
        param('categoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 5 }).custom(categoryValidator),
        param('subCategoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 8 }).custom(subCategoryValidator),
        param('districtId').notEmpty().escape().trim().isNumeric().isLength({ max: 3, min: 3 }).custom(districtIdValidator)
    ],
    getValuesMapViewTwo
);
router.get(
    '/:timeStart/:timeEnd/:categoryId/:subCategoryId/:districtId/:blockId',
    [
        param('timeStart').notEmpty().escape().trim().isDate(),
        param('timeEnd').notEmpty().escape().trim().isDate().custom(timeLineValidator),
        param('categoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 5 }).custom(categoryValidator),
        param('subCategoryId').notEmpty().escape().trim().isNumeric().isLength({ max: 8 }).custom(subCategoryValidator),
        param('districtId').notEmpty().escape().trim().isNumeric().isLength({ max: 3, min: 3 }).custom(districtIdValidator),
        param('blockId').notEmpty().escape().trim().isNumeric().isLength({ max: 4, min: 4 }).custom(blockIdValidator)
    ],
    getValuesMapViewThree
);

export default router;