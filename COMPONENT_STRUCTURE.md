# 📐 Component Structure - Student Management Dashboard

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Dashboard Layout                            │
│  ┌──────────────┬─────────────────────────────────────────────┐ │
│  │              │         DashboardHeader                      │ │
│  │   Sidebar    │  ┌────────────────────────────────────────┐ │ │
│  │              │  │ 🔍 Search  |  🔔 Notifications  |  👤  │ │ │
│  │              │  │            |                    |  Logout│ │ │
│  │              │  └────────────────────────────────────────┘ │ │
│  │              ├─────────────────────────────────────────────┤ │
│  │              │          Main Content Area                  │ │
│  │   📊 Dashboard│  ┌────────────────────────────────────────┐│ │
│  │   👥 Students │  │  📄 Page Title & Description          ││ │
│  │   📚 Courses  │  └────────────────────────────────────────┘│ │
│  │   🎓 Grades   │  ┌────────────────────────────────────────┐│ │
│  │   ⚙️ Settings │  │  StudentManagementTable Component     ││ │
│  │              │  │                                        ││ │
│  │              │  │  ┌──────────────────────────────────┐ ││ │
│  │              │  │  │  Toolbar Section                 │ ││ │
│  │              │  │  │  🔍 Search | Filters | Buttons  │ ││ │
│  │              │  │  └──────────────────────────────────┘ ││ │
│  │              │  │                                        ││ │
│  │              │  │  ┌──────────────────────────────────┐ ││ │
│  │              │  │  │  Data Table                      │ ││ │
│  │              │  │  │  ┌────┬────┬────────┬─────────┐ │ ││ │
│  │              │  │  │  │ ☑️ │ #  │ ID     │ Info    │ │ ││ │
│  │              │  │  │  ├────┼────┼────────┼─────────┤ │ ││ │
│  │              │  │  │  │ ☑️ │ 1  │ SV001  │ ...     │ │ ││ │
│  │              │  │  │  │ ☑️ │ 2  │ SV002  │ ...     │ │ ││ │
│  │              │  │  │  └────┴────┴────────┴─────────┘ │ ││ │
│  │              │  │  └──────────────────────────────────┘ ││ │
│  │              │  │                                        ││ │
│  │              │  │  ┌──────────────────────────────────┐ ││ │
│  │              │  │  │  Pagination                      │ ││ │
│  │              │  │  │  « 1 2 3 4 5 »                  │ ││ │
│  │              │  │  └──────────────────────────────────┘ ││ │
│  │              │  └────────────────────────────────────────┘│ │
│  └──────────────┴─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 📦 Component Hierarchy

```
/dashboard/page.tsx (Main Container)
│
├── Sidebar
│   ├── Logo Section
│   │   └── GraduationCap Icon + "EduManage"
│   ├── Navigation Menu
│   │   ├── Dashboard (LayoutDashboard icon)
│   │   ├── Students (Users icon) ← ACTIVE
│   │   ├── Courses (BookOpen icon)
│   │   ├── Grades (GraduationCap icon)
│   │   └── Settings (Settings icon)
│   └── Footer
│       └── Copyright text
│
├── DashboardHeader
│   ├── Search Bar
│   │   └── Search Icon + Input
│   ├── Notifications
│   │   └── Bell Icon + Badge
│   ├── User Profile
│   │   ├── User Name ("Admin User")
│   │   ├── Role ("Administrator")
│   │   └── Avatar Circle
│   └── Logout Button
│       └── LogOut Icon + "Logout"
│
└── Main Content
    ├── Page Title Section
    │   ├── Heading: "Student Management"
    │   └── Description text
    │
    └── StudentManagementTable
        ├── Toolbar Section
        │   ├── Search Bar
        │   │   └── Search Icon + Input (placeholder)
        │   ├── Filters Row
        │   │   ├── Faculty Filter Dropdown
        │   │   ├── Class Filter Dropdown
        │   │   └── Status Filter Dropdown
        │   └── Action Buttons
        │       ├── Add New Student (Plus icon)
        │       └── Export to Excel (FileSpreadsheet icon)
        │
        ├── Table Section
        │   ├── Table Header
        │   │   ├── Checkbox (Select All)
        │   │   ├── # (Index)
        │   │   ├── Student ID
        │   │   ├── Student Info
        │   │   ├── Date of Birth & Gender
        │   │   ├── Class/Faculty
        │   │   ├── Status
        │   │   └── Actions
        │   │
        │   └── Table Body (10 rows)
        │       └── Table Row (for each student)
        │           ├── Checkbox
        │           ├── Index Number
        │           ├── Student ID (e.g., SV001)
        │           ├── Student Info Cell
        │           │   ├── Avatar Circle (colored)
        │           │   ├── Full Name
        │           │   └── Email (Mail icon)
        │           ├── DOB & Gender Cell
        │           │   ├── Calendar Icon + Date
        │           │   └── Gender Icon (♂/♀)
        │           ├── Class/Faculty Cell
        │           │   ├── Class (e.g., IT-K15)
        │           │   └── Faculty name
        │           ├── Status Badge
        │           │   └── Colored pill (Green/Blue/Red)
        │           └── Actions Cell
        │               ├── View Button (Eye icon)
        │               ├── Edit Button (Pencil icon)
        │               └── Delete Button (Trash2 icon)
        │
        └── Pagination Section
            ├── Info Text ("Showing X to Y of Z")
            └── Navigation Buttons
                ├── Previous (ChevronLeft)
                ├── Page Numbers (1, 2, 3...)
                └── Next (ChevronRight)
```

## 🎨 Component Details

### 1. Sidebar Component

**File:** `src/components/Sidebar.tsx`

**Props:**

```typescript
interface SidebarProps {
  activeMenu?: string; // Default: 'Students'
}
```

**Features:**

- Fixed positioning (left: 0)
- Width: 256px (w-64)
- Gradient background (slate-900 → slate-800)
- Active state highlighting (blue-600)
- Hover effects on menu items

**Menu Items:**
| Icon | Label | Path | Status |
|------|-------|------|--------|
| LayoutDashboard | Dashboard | / | - |
| Users | Students | /students | **ACTIVE** |
| BookOpen | Courses | /courses | - |
| GraduationCap | Grades | /grades | - |
| Settings | Settings | /settings | - |

---

### 2. DashboardHeader Component

**File:** `src/components/DashboardHeader.tsx`

**Features:**

- Fixed positioning (top: 0, left: 264px)
- Height: 80px (h-20)
- White background with shadow
- Responsive layout

**Sections:**

1. **Left:** Global search bar
2. **Right:** Notifications + Profile + Logout

---

### 3. StudentManagementTable Component

**File:** `src/components/StudentManagementTable.tsx`

**State Management:**

```typescript
const [selectedStudents, setSelectedStudents] = useState<Set<string>>(
  new Set()
);
const [searchQuery, setSearchQuery] = useState("");
const [facultyFilter, setFacultyFilter] = useState("all");
const [classFilter, setClassFilter] = useState("all");
const [statusFilter, setStatusFilter] = useState("all");
const [currentPage, setCurrentPage] = useState(1);
```

**Key Functions:**

- `toggleSelectAll()` - Select/deselect all students
- `toggleSelect(id)` - Select/deselect individual student
- `getStatusColor(status)` - Return color class for status badge
- `getGenderIcon(gender)` - Return gender symbol
- `formatDate(dateString)` - Format date display
- `getAvatarColor(name)` - Generate consistent color for avatar

**Data Structure:**

```typescript
interface Student {
  id: string;
  studentId: string; // e.g., "SV001"
  fullName: string;
  email: string;
  dateOfBirth: string; // ISO date string
  gender: "Male" | "Female";
  faculty: string;
  class: string; // e.g., "IT-K15"
  status: "Active" | "Graduated" | "Suspended";
  avatar?: string; // Optional avatar URL
}
```

**Pagination:**

- Items per page: 10
- Total students: 10 (expandable)
- Current implementation: 1 page
- Ready for dynamic data

---

## 🎯 Component Interactions

### User Actions Flow

```
1. User visits "/"
   ↓
2. Redirects to "/dashboard"
   ↓
3. Dashboard Page loads
   ↓
4. Components render in order:
   - Sidebar (fixed left)
   - DashboardHeader (fixed top)
   - Main Content (scrollable)
   ↓
5. StudentManagementTable loads
   ↓
6. Mock data populates table
   ↓
7. User can interact:
   - Click sidebar menu items
   - Use search/filters
   - Select students (checkbox)
   - Click action buttons (View/Edit/Delete)
   - Navigate pages
```

### Event Handlers

**Toolbar Section:**

- `onChange` on search input → Update searchQuery
- `onChange` on faculty dropdown → Update facultyFilter
- `onChange` on class dropdown → Update classFilter
- `onChange` on status dropdown → Update statusFilter
- `onClick` on Add New Student → (Ready for implementation)
- `onClick` on Export to Excel → (Ready for implementation)

**Table Section:**

- `onChange` on header checkbox → toggleSelectAll()
- `onChange` on row checkbox → toggleSelect(id)
- `onClick` on View button → (Ready for implementation)
- `onClick` on Edit button → (Ready for implementation)
- `onClick` on Delete button → (Ready for implementation)

**Pagination Section:**

- `onClick` on Previous → setCurrentPage(page - 1)
- `onClick` on page number → setCurrentPage(page)
- `onClick` on Next → setCurrentPage(page + 1)

---

## 🎨 Styling Classes

### Key Tailwind Classes Used

**Layout:**

- `fixed` - Fixed positioning
- `ml-64` - Margin left for sidebar offset
- `mt-20` - Margin top for header offset
- `flex`, `space-x-*` - Flexbox layouts

**Colors:**

- `bg-slate-900` - Dark backgrounds
- `bg-blue-600` - Primary buttons
- `text-white` - White text
- `border-slate-200` - Light borders

**Effects:**

- `shadow-md`, `shadow-lg` - Drop shadows
- `rounded-lg`, `rounded-xl` - Rounded corners
- `hover:bg-*` - Hover effects
- `transition-colors` - Smooth transitions

**Responsive:**

- Default (mobile-first)
- `sm:*` - Small screens (640px+)
- `md:*` - Medium screens (768px+)
- `lg:*` - Large screens (1024px+)

---

## 📊 Data Flow

```
Mock Data (mockStudents array)
    ↓
StudentManagementTable Component
    ↓
State Management (useState hooks)
    ↓
Filtering & Pagination Logic
    ↓
currentStudents array
    ↓
Table Rendering (.map())
    ↓
Individual Table Rows
    ↓
Display to User
```

---

## 🔄 Future Enhancements Structure

### Planned Component Additions:

1. **StudentDetailModal.tsx**

   - View full student details
   - Modal overlay

2. **StudentFormModal.tsx**

   - Add/Edit student form
   - Form validation

3. **DeleteConfirmDialog.tsx**

   - Confirmation dialog
   - Delete action

4. **ExportModal.tsx**

   - Export options
   - Format selection

5. **NotificationDropdown.tsx**

   - Notification list
   - Mark as read

6. **UserProfileDropdown.tsx**
   - Profile menu
   - Settings link
   - Logout option

---

## 🎯 Component Best Practices

✅ **Implemented:**

- Clear component separation
- TypeScript interfaces
- Reusable utility functions
- Consistent naming conventions
- Proper state management
- Clean code structure

🔜 **Recommended:**

- Extract table row to separate component
- Create custom hooks for data fetching
- Add error boundaries
- Implement loading states
- Add accessibility (ARIA labels)
- Write unit tests

---

## 📝 Notes

- All components use TypeScript for type safety
- Tailwind CSS for styling (no custom CSS files)
- Lucide React for all icons
- Components are client-side ('use client' directive)
- Ready for backend integration
- Modular and maintainable code structure

---

**Last Updated:** 2025-11-22
**Version:** 1.0.0
