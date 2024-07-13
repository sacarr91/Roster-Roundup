-- ///////// Stanley code ////////////

/** Must add to disconnect session to this database execempt this one..
Note: this script is ONLY for psql
**/

SELECT 'Database rebuild started...';
DROP DATABASE IF EXISTS temp;
CREATE DATABASE temp;

\c temp;

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'university'
AND pid <> pg_backend_pid();

-- /////// End Stanley code //////////

DROP DATABASE IF EXISTS roster_db;

CREATE DATABASE roster_db;

\c roster_db;

CREATE TABLE
    department (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL);

CREATE TABLE
    role (
        id SERIAL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL,
        department_id INTEGER,
        FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
    );

CREATE TABLE
    employee (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INTEGER NOT NULL,
        manager_id INTEGER,
        FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL,
        FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE
    );