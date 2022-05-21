import { validationResult } from 'express-validator';
export const getAllCategories = async(req,res)=>{
    try {
        const sqlStatement = `select id, name from gis_category`;
        const categoryData = await global.sequelize.query(
            sqlStatement,
            {
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(categoryData);
    } catch (error) {
        res.status(400).json(error);
    }
}
export const getAllSubCategories = async(req,res)=>{
    try {
        validationResult(req).throw();
        const sqlStatement = `select id, name from gis_subcategory where gis_category_id=:id`;
        const subCategoryData = await global.sequelize.query(
            sqlStatement,
            {
                replacements:{
                    id: req.params.id
                },
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(subCategoryData);
    } catch (error) {
        if (typeof (error) == "string")
            res.status(400).json({ msg: "Something went wrong" });
        else if(error.array())
            res.status(400).json(error.array());
        else
            res.status(400).json(error);
    }
}