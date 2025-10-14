# Quick Guide: Update Statistics

## 🚀 How to Update "Expert Engineers" and Other Statistics

### Option 1: Using Admin Panel (Recommended)

1. **Start both servers:**
   ```powershell
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. **Login to admin:**
   - Go to: `http://localhost:3000/admin/login`
   - Use your admin credentials

3. **Navigate to Settings:**
   - Click **Settings** in sidebar
   - Or go directly to: `http://localhost:3000/admin/settings`

4. **Initialize settings (First time only):**
   - Click **"Initialize Default Settings"** button
   - Wait for success message

5. **Update Statistics:**
   - Click the **"Statistics"** tab (TrendingUp icon)
   - You'll see 6 fields:

   **Field** | **Current** | **Where It Shows**
   ---|---|---
   Projects Completed | 100 | Projects page, About page, Home page
   Years Experience | 15 | Projects page, About page
   Team Members | 50 | Projects page (Expert Engineers), About page (Expert Team Members)
   Client Satisfaction | 98 | Projects page (98% Client Satisfaction)
   Properties Valued | 100 | Home page (Properties Valued)
   Banking Partners | 3 | Home page (Banking Partners)

6. **Change the values:**
   - Example: Change "Team Members" from 50 to 10
   - Update any other statistics you need

7. **Save:**
   - Click **"Save Settings"** button
   - Wait for "Settings saved successfully" message

8. **Verify:**
   - Visit `http://localhost:3000/projects`
   - See "10+ Expert Engineers" (or whatever number you set)
   - Check About page and Home page for consistency

---

## 📊 Current Statistics Locations

### Projects Page (`/projects`)
```
┌─────────────────────────────────────┐
│      STATISTICS SECTION             │
├─────────────────────────────────────┤
│ 100+              15+               │
│ Projects          Years             │
│ Completed         Experience        │
│                                     │
│ 50+               98%               │
│ Expert            Client            │
│ Engineers         Satisfaction      │
└─────────────────────────────────────┘
```

### About Page (`/about`)
```
Our Story Section:
✓ 15+ Years Experience
✓ 100+ Projects Completed  
✓ 50+ Expert Team Members

Floating Card:
┌──────────────┐
│ 100+         │
│ Projects     │
│ Completed    │
└──────────────┘
```

### Home Page (`/`)
```
Floating Stats Card:
┌──────────────┬──────────────┐
│ 100+         │ 3+           │
│ Properties   │ Banking      │
│ Valued       │ Partners     │
└──────────────┴──────────────┘
```

---

## 🎯 Specific Answer to Your Request

### Your Request:
> "Update the information: 10+ Expert Engineers"

### Solution:
1. Go to `http://localhost:3000/admin/settings`
2. Click **"Statistics"** tab
3. Find **"Team Members"** field (currently shows: 50)
4. Change it to: **10**
5. Click **"Save Settings"**
6. Visit `http://localhost:3000/projects`
7. You'll now see **"10+ Expert Engineers"** ✅

**That's it!** The change will automatically reflect on both the projects page and about page.

---

## ⚙️ Settings Keys Reference

If you need to update via API or database directly:

```sql
-- Update team members count
UPDATE company_settings 
SET value = '10' 
WHERE key = 'stats_team_members';

-- Update other statistics
UPDATE company_settings SET value = '150' WHERE key = 'stats_projects_completed';
UPDATE company_settings SET value = '20' WHERE key = 'stats_years_experience';
UPDATE company_settings SET value = '95' WHERE key = 'stats_client_satisfaction';
UPDATE company_settings SET value = '200' WHERE key = 'stats_properties_valued';
UPDATE company_settings SET value = '5' WHERE key = 'stats_banking_partners';
```

---

## 🔧 Troubleshooting

### Statistics not showing?
1. Make sure you initialized default settings
2. Check browser console for errors
3. Refresh the page (Ctrl+F5)
4. Clear browser cache

### Can't see Statistics tab?
1. Make sure you're logged in as admin
2. Initialize default settings first
3. Refresh the settings page

### Changes not reflecting?
1. Click "Save Settings" button
2. Wait for success message
3. Hard refresh the page (Ctrl+F5)
4. Check if both backend and frontend are running

---

## 📝 Best Practices

1. **Keep it realistic**: Use actual company data
2. **Update regularly**: Keep statistics current
3. **Be consistent**: Same numbers across all pages (automatic now!)
4. **Round up**: Use "+ " for growing numbers (100+, 15+, etc.)
5. **Percentages**: Keep client satisfaction realistic (85-99%)

---

## ✅ Quick Checklist

Before going live, verify:

- [ ] All statistics reflect actual company data
- [ ] Projects page shows correct numbers
- [ ] About page matches projects page
- [ ] Home page statistics are accurate
- [ ] No "0" or empty values showing
- [ ] Numbers are professional and realistic

---

**Done! Your statistics system is now fully dynamic and easy to manage!** 🎉
