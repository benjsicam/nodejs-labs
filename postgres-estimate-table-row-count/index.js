const _ = require('lodash')
const { Sequelize, QueryTypes } = require('sequelize')

const TABLE_NAME = 'my_table'

async function main () {
  const db = new Sequelize('entities', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
  })
  
  const [result] = await db.query(`SELECT n_live_tup as estimated_count FROM pg_stat_all_tables WHERE relname = '${TABLE_NAME}';`, {
    raw: true,
    type: QueryTypes.SELECT
  })

  console.log(_.get(result, 'estimated_count', 0))
  console.log(JSON.stringify(result, null, 2))
}

main()