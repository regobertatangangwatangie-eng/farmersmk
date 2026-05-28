# PostgreSQL Binaries Folder

This folder is intended to hold the PostgreSQL command-line tools (such as psql.exe) for local project use.

## Instructions

1. **Locate your PostgreSQL installation:**
   - Default path: `C:\Program Files\PostgreSQL\<version>\bin`
   - Look for `psql.exe` and any required DLLs.

2. **Copy required files:**
   - Copy `psql.exe` (and optionally other tools like `pg_dump.exe`, `libpq.dll`, etc.) into this folder (`db-init/pgsql/bin`).

3. **Usage:**
   - You can now run database commands from your project root using the local `psql` binary:
     ```
     ./db-init/pgsql/bin/psql -U postgres -h localhost -f db-init/init.sql
     ```

4. **Note:**
   - This folder is empty by default. You must copy the binaries manually due to licensing and distribution restrictions.
   - If you prefer, add your PostgreSQL `bin` directory to your system PATH instead.

---

For more help, visit: https://www.postgresql.org/download/windows/