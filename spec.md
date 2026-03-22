# Ex-Servicemen Public Higher Secondary School Portal

## Current State
New project. No existing application logic.

## Requested Changes (Diff)

### Add
- Landing page with school branding (logo, photos, school info)
- Parent-facing student portal: login via roll number + class/section + email
- Parent dashboard showing: academic results, pending fees, student bio, leave records, applications, school news
- Discipline section on dashboard
- Sports section (sport name, level played: school/district/state/national)
- "Dear Parent" strengths section (subjects/skills the student excels at)
- Admin panel: manage students, enter results, fees, discipline records, leave, sports, strengths, news
- Role-based access: admin vs parent/student

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Student records (bio, class, roll number, section), results, fees, discipline, leave, sports (with level), strengths, news. Admin CRUD for all. Auth with two roles: admin and parent.
2. Frontend: Landing page with hero using school photos, logo, school stats (est. 1999, 1200 students). Login page. Parent dashboard with tabs: Overview, Results, Fees, Discipline, Sports, Strengths, Leave, News. Admin panel with management tables for each data category.
