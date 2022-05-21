import { validationResult } from 'express-validator';
export const getValuesMapViewOne = async (req, res) => {
    try {
        validationResult(req).throw();
        req.params.timeStart = req.params.timeStart.split("-").join("");
        req.params.timeEnd = req.params.timeEnd.split("-").join("");
        const sqlStatement = `select d.id as id, sum(f.value) as value 
            from gis_gp as g 
                inner join gis_block as b
                    on b.id = g.gis_block_id
                inner join gis_district as d
                    on d.id = b.gis_district_id
                inner join (
                    select h.gis_gp_id, v.value
                    from gis_values_has_gis_gp as h
                    inner join gis_values as v
                        on h.gis_values_id = v.id
                    where h.gis_values_id in
                    (
                        select id
                        from gis_values
                        where gis_subcategory_id = :sub_cat_id
                    )
                    and v.time_start >= :time_start and v.time_end <= :time_end
            ) as f
            on f.gis_gp_id = g.id
            group by d.id;`;
        const districtWiseData = await global.sequelize.query(
            sqlStatement,
            {
                replacements: {
                    sub_cat_id: req.params.subCategoryId,
                    time_start: req.params.timeStart,
                    time_end: req.params.timeEnd
                },
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(districtWiseData);
    } catch (error) {
        if (typeof (error) == "string")
            res.status(400).json({ msg: "Something went wrong" });
        else if(error.array())
            res.status(400).json(error.array());
        else
            res.status(400).json(error);
    }
}
export const getValuesMapViewTwo = async (req, res) => {
    try {
        validationResult(req).throw();
        req.params.timeStart = req.params.timeStart.split("-").join("");
        req.params.timeEnd = req.params.timeEnd.split("-").join("");
        const sqlStatement = `select b.id as id, sum(f.value) as value 
            from gis_gp as g 
                inner join gis_block as b
                    on b.id = g.gis_block_id
                inner join gis_district as d
                    on d.id = b.gis_district_id
                inner join (
                    select h.gis_gp_id, v.value
                    from gis_values_has_gis_gp as h
                    inner join gis_values as v
                        on h.gis_values_id = v.id
                    where h.gis_values_id in
                    (
                        select id
                        from gis_values
                        where gis_subcategory_id = :sub_cat_id
                    )
                    and v.time_start >= :time_start and v.time_end <= :time_end
                ) as f
            on f.gis_gp_id = g.id
            where d.id = :d_id
            group by b.id;`;
        const blockWiseData = await global.sequelize.query(
            sqlStatement,
            {
                replacements: {
                    sub_cat_id: req.params.subCategoryId,
                    time_start: req.params.timeStart,
                    time_end: req.params.timeEnd,
                    d_id: req.params.districtId
                },
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(blockWiseData);
    } catch (error) {
        if (typeof (error) == "string")
            res.status(400).json({ msg: "Something went wrong" });
        else if(error.array())
            res.status(400).json(error.array());
        else
            res.status(400).json(error);
    }
}
export const getValuesMapViewThree = async (req, res) => {
    try {
        validationResult(req).throw();
        req.params.timeStart = req.params.timeStart.split("-").join("");
        req.params.timeEnd = req.params.timeEnd.split("-").join("");
        const sqlStatement = `select g.id as id, sum(f.value) as value 
            from gis_gp as g 
                inner join gis_block as b
                    on b.id = g.gis_block_id
                inner join gis_district as d
                    on d.id = b.gis_district_id
                inner join (
                    select h.gis_gp_id, v.value
                    from gis_values_has_gis_gp as h
                    inner join gis_values as v
                        on h.gis_values_id = v.id
                    where h.gis_values_id in
                    (
                        select id
                        from gis_values
                        where gis_subcategory_id = :sub_cat_id
                    )
                    and v.time_start >= :time_start and v.time_end <= :time_end
                ) as f
            on f.gis_gp_id = g.id
            where d.id = :d_id and b.id=:b_id
            group by g.id;`;
        const gpWiseData = await global.sequelize.query(
            sqlStatement,
            {
                replacements: {
                    sub_cat_id: req.params.subCategoryId,
                    time_start: req.params.timeStart,
                    time_end: req.params.timeEnd,
                    d_id: req.params.districtId,
                    b_id: req.params.blockId
                },
                type: global.sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(gpWiseData);
    } catch (error) {
        if (typeof (error) == "string")
            res.status(400).json({ msg: "Something went wrong" });
        else if(error.array())
            res.status(400).json(error.array());
        else
            res.status(400).json(error);
    }
}
