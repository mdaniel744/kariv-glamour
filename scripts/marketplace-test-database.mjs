// Isolated PostgreSQL fixture, never a real inventory or set of sellers.
export async function fixtureDatabase(db, store) {
  await db.exec(`
    create role anon; create role authenticated; create role service_role;
    create table public.products(id uuid primary key,store_id uuid not null,dealer_id text,name text,slug text,
      price numeric,currency text,images jsonb,attributes jsonb,status text,stock_quantity int,created_at timestamptz default now(),updated_at timestamptz default now());
    create table public.orders(id uuid primary key default gen_random_uuid(),store_id uuid not null,buyer_user_id text,dealer_user_id text,
      products jsonb not null default '[]',escrow_status text,created_at timestamptz default now());
    create table public.dealer_reviews(id uuid primary key default gen_random_uuid(),store_id uuid not null,dealer_user_id text not null,
      buyer_user_id text not null,buyer_name text not null,order_id uuid not null references orders(id),rating smallint check(rating between 1 and 5),
      title text not null default '' check(length(title)<=120),review_text text not null check(length(review_text) between 10 and 2000),
      status text not null default 'pending' check(status in ('pending','approved','rejected')),reviewed_by text,reviewed_at timestamptz,
      created_at timestamptz default now(),updated_at timestamptz default now(),unique(store_id,order_id));
  `);
  await db.query(`insert into products(id,store_id,name,slug,price,currency,images,attributes,status,stock_quantity)
    select ('00000000-0000-4000-8000-'||lpad(n::text,12,'0'))::uuid,$1,'TEST watch '||n,'test-watch-'||n,
      1000,'EUR','[]','{}','active',1 from generate_series(1,670) n`, [store]);
}
