export const getTimeline = async(req,res)=>{
    try {
        const sqlStatement1 = `SELECT distinct time_start as s from gis.gis_values;`;
        const sqlStatement2 = `SELECT distinct time_end as e from gis.gis_values;`;
        let s = await global.sequelize.query(
            sqlStatement1,
            {
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        let e =  await global.sequelize.query(
            sqlStatement2,
            {
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        s = s.map(e=> parseInt(e['s'].split("-")[0]));
        e = e.map(e=> parseInt(e['e'].split("-")[0]));
        res.status(200).json({s,e});
    } catch (error) {
        res.status(400).json(error);
    }
}
