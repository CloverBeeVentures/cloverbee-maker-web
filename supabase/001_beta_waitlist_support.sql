-- Maker public beta waitlist + support intake
create table if not exists public.beta_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  city text not null,
  platform text not null check (platform in ('android','ios')),
  business_type text not null,
  device_model text,
  status text not null default 'pending' check (status in ('pending','approved','waitlisted','rejected','activated')),
  applied_at timestamptz not null default now(),
  approved_at timestamptz,
  notes text
);
create unique index if not exists beta_waitlist_email_uq on public.beta_waitlist (lower(email));
create index if not exists beta_waitlist_status_platform_idx on public.beta_waitlist(status, platform);

create table if not exists public.support_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  auth_user_id uuid,
  beta_waitlist_id uuid references public.beta_waitlist(id) on delete set null,
  category text not null check (category in ('problem','improvement','help')),
  message text not null,
  submitted_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','reviewing','resolved'))
);
create index if not exists support_submissions_email_idx on public.support_submissions(lower(email));
create index if not exists support_submissions_status_idx on public.support_submissions(status, submitted_at desc);
alter table public.beta_waitlist enable row level security;
alter table public.support_submissions enable row level security;

create or replace function public.enforce_beta_capacity()
returns trigger language plpgsql security definer set search_path=public as $$
declare active_count integer;
begin
  if new.status in ('approved','activated') and (old.status is distinct from new.status or old.platform is distinct from new.platform) then
    select count(*) into active_count from public.beta_waitlist
    where platform=new.platform and status in ('approved','activated') and id<>new.id;
    if active_count >= 10 then
      raise exception 'Beta capacity reached for % (maximum 10 approved/active testers)', new.platform;
    end if;
    if new.approved_at is null then new.approved_at := now(); end if;
  end if;
  return new;
end $$;
drop trigger if exists trg_enforce_beta_capacity on public.beta_waitlist;
create trigger trg_enforce_beta_capacity before update of status,platform on public.beta_waitlist
for each row execute function public.enforce_beta_capacity();

create or replace function public.submit_beta_application(
  p_name text,p_email text,p_city text,p_platform text,p_business_type text,
  p_device_model text default null,p_honeypot text default null
) returns boolean language plpgsql security definer set search_path=public as $$
declare v_email text:=lower(trim(coalesce(p_email,''))); v_platform text:=lower(trim(coalesce(p_platform,'')));
begin
  if coalesce(trim(p_honeypot),'')<>'' then return true; end if;
  if length(trim(coalesce(p_name,''))) not between 1 and 120
     or length(v_email) not between 3 and 254 or position('@' in v_email)=0
     or length(trim(coalesce(p_city,''))) not between 1 and 120
     or v_platform not in ('android','ios')
     or length(trim(coalesce(p_business_type,''))) not between 1 and 240
     or length(coalesce(p_device_model,''))>120 then raise exception 'Invalid application'; end if;
  insert into public.beta_waitlist(name,email,city,platform,business_type,device_model)
  values(trim(p_name),v_email,trim(p_city),v_platform,trim(p_business_type),nullif(trim(coalesce(p_device_model,'')),''))
  on conflict ((lower(email))) do nothing;
  return true;
end $$;

create or replace function public.submit_support_request(
  p_email text,p_category text,p_message text,p_honeypot text default null
) returns boolean language plpgsql security definer set search_path=public,auth as $$
declare
  v_email text:=lower(trim(coalesce(p_email,'')));
  v_category text:=lower(trim(coalesce(p_category,'')));
  v_beta_id uuid; v_user_id uuid; v_recent integer;
begin
  if coalesce(trim(p_honeypot),'')<>'' then return true; end if;
  if length(v_email) not between 3 and 254 or position('@' in v_email)=0
     or v_category not in ('problem','improvement','help')
     or length(trim(coalesce(p_message,''))) not between 1 and 5000 then return true; end if;
  select id into v_beta_id from public.beta_waitlist where lower(email)=v_email and status in ('approved','activated') limit 1;
  if v_beta_id is null then select id into v_user_id from auth.users where lower(email)=v_email limit 1; end if;
  if v_beta_id is null and v_user_id is null then return true; end if;
  select count(*) into v_recent from public.support_submissions where lower(email)=v_email and submitted_at>now()-interval '1 hour';
  if v_recent>=5 then return true; end if;
  insert into public.support_submissions(email,auth_user_id,beta_waitlist_id,category,message)
  values(v_email,v_user_id,v_beta_id,v_category,trim(p_message));
  return true;
end $$;

revoke all on function public.submit_beta_application(text,text,text,text,text,text,text) from public;
revoke all on function public.submit_support_request(text,text,text,text) from public;
grant execute on function public.submit_beta_application(text,text,text,text,text,text,text) to anon,authenticated;
grant execute on function public.submit_support_request(text,text,text,text) to anon,authenticated;
