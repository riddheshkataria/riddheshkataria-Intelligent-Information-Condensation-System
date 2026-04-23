# Database Migration Guide: PostgreSQL to MongoDB

## Context
As discussed in the recent architectural review, we are shifting our primary application data storage from PostgreSQL to MongoDB to better handle schema-less document structures that our new user features require.

## Migration Steps
1. **Data Export**: Execute `pg_dump` on the current production shards, exporting tables to CSV formats.
2. **Data Transformation**: Run the `etl_transformer.py` Python script to convert relational CSV data into JSON document formats. 
3. **Seeding**: Use `mongoimport` to seed the staging MongoDB cluster.
4. **Validation**: Run the automated data integrity suite (`npm run test:data-integrity`) against the new staging cluster.

## Rollback Plan
If validation fails, the application proxy will automatically revert connections back to the read-only PostgreSQL instance. Ensure that no write operations are permitted during this phase until full sign-off.

## Notes
- Review index requirements on the `User` and `Document` collections. Ensure compound indexes are created before seeding to reduce the load on initial queries.
