# Echo — Premium Social Web App

Clean, dark, glassmorphism social platform built with **React + Vite + TypeScript + Tailwind CSS + Supabase**.

## Features

- **Auth**
  - Email + Password Sign Up (strong password rules)
  - Unique username
  - Email verification
  - Sign In
  - Forgot Password (email reset link)
  - Google Login (optional – requires setup)
- Clean UI matching the original prototype
- Home / Discover / Create / Chats / Profile / Notifications / Settings
- Live chat UI ready for real-time (Supabase Realtime)
- Protected routes

## Quick Start (iPad / Codespaces friendly)

1. Open this repo in **GitHub Codespaces** or **github.dev**
2. Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. In the Codespaces terminal:

```bash
npm install
npm run dev
```

4. Open the preview URL.

---

## Supabase Setup (Required)

### 1. Create a project
Go to [supabase.com](https://supabase.com) → New Project.

### 2. Enable Email Auth
Authentication → Providers → Email → Enable  
(Confirm email is on by default)

### 3. Create `profiles` table

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);
```

### 4. Auto-create profile on signup (Trigger)

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 5. (Optional) Google Login
1. Authentication → Providers → Google → Enable
2. Create OAuth credentials in Google Cloud Console
3. Paste Client ID & Secret into Supabase

### 6. (Later) Posts, Likes, Messages tables
You can add these when ready for full feed + real-time chat. The UI is already prepared.

---

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Add the two environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
4. Deploy

---

Built for browser + iPad workflow.
