export const timeLineValidator = (value, { req }) => {
    let s = new Date(req.params.timeStart);
    let e = new Date(value)
    if (e <= s) {
      throw new Error('Timeline error');
    }
    return true;
};
export const categoryValidator = async(value)=>{
    const sqlStatement = `select name from gis_category where id = :id`;
    const row = await global.sequelize.query(
        sqlStatement,
        {
            replacements: {
                id: value
            },
            type: global.sequelize.QueryTypes.SELECT
        }
    );
    if(row.length === 0){
        return Promise.reject("Invalid Category Id");
    }
    return true;
};
export const subCategoryValidator = async(value)=>{
    const sqlStatement = `select name from gis_subcategory where id = :id`;
    const row = await global.sequelize.query(
        sqlStatement,
        {
            replacements: {
                id: value
            },
            type: global.sequelize.QueryTypes.SELECT
        }
    );
    if(row.length === 0){
        return Promise.reject("Invalid Sub-Category Id");
    }
    return true;
};
export const districtIdValidator = async(value)=>{
    const sqlStatement = `select name from gis_district where id = :id`;
    const row = await global.sequelize.query(
        sqlStatement,
        {
            replacements: {
                id: value
            },
            type: global.sequelize.QueryTypes.SELECT
        }
    );
    if(row.length === 0){
        return Promise.reject("Invalid District Id");
    }
    return true;
};
export const blockIdValidator = async(value)=>{
    const sqlStatement = `select name from gis_block where id = :id`;
    const row = await global.sequelize.query(
        sqlStatement,
        {
            replacements: {
                id: value
            },
            type: global.sequelize.QueryTypes.SELECT
        }
    );
    if(row.length === 0){
        return Promise.reject("Invalid Block Id");
    }
    return true;
};