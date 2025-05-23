import { body } from 'express-validator';
import { RDUA_Groups } from '../../constants.js';


const reportValidator = [
    body('groupName')
        .notEmpty().withMessage('Group name is required')
        .isIn(RDUA_Groups).withMessage(`Group name must be one of the provided R.D.U.A. groups`),
    body('numberOfBooksDistributed')
        .notEmpty().withMessage('Number of distributed books is required')
        .isInt({ min: 0 }).withMessage('Number of distributed books must be a non-negative integer'),
    body('krishnaKathaPoints')
        .notEmpty().withMessage('Krishna katha points is required')
        .isInt({ min: 0 }).withMessage('Krishna katha points must be a non-negative integer'),
    body('sankirtanPoints')
        .notEmpty().withMessage('Sankirtan points is required')
        .isInt({ min: 0 }).withMessage('Sankirtan points must be a non-negative integer'),
    body('gaurNitaiPleasingPoints')
        .notEmpty().withMessage('Gaur Nitai pleasing points is required')
        .isInt({ min: 0 }).withMessage('Gaur Nitai pleasing points must be a non-negative integer'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().toDate().withMessage('Invalid date format')
        .custom((value) => {
            if (new Date(value) > new Date()) {
                throw new Error('Date cannot be in the future');
            }
            return true;
        })
];

const groupNameValidator = [
    body('groupName')
        .notEmpty().withMessage('Group name is required')
        .isIn(RDUA_Groups).withMessage(`Group name must be one of the provided R.D.U.A. groups`)
]

export { reportValidator, groupNameValidator };