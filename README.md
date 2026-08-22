

获取数据库表类型
```bash
supabase gen types typescript --db-url postgresql://postgres:postgres@127.0.0.1:54322/postgres --schema public,rbac,system,hr,eqp,proj,app,tbm > lib/infra/supabase/database.ts
```