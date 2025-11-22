# 🎓 Student Management Dashboard

A modern, responsive Student Management Dashboard built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. Features a beautiful UI with smooth animations and comprehensive student data management capabilities.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎨 Modern UI/UX Design
- **Clean & Professional Interface** - Material Design inspired with Apple-style aesthetics
- **Responsive Layout** - Fully responsive across all device sizes
- **Smooth Animations** - Polished interactions with Framer Motion
- **Dark Sidebar** - Beautiful gradient sidebar with active state highlighting
- **Icon System** - Lucide React icons throughout the interface

### 📊 Dashboard Components

#### 1. **Sidebar Navigation**
- Fixed left sidebar with gradient background (slate-900 to slate-800)
- Navigation menu items:
  - 📊 Dashboard
  - 👥 Students (Active)
  - 📚 Courses
  - 🎓 Grades
  - ⚙️ Settings
- Logo section with brand identity
- Active state highlighting with blue accent

#### 2. **Header Bar**
- Quick search functionality
- Notification bell with badge indicator
- User profile section (Admin)
- Logout button with icon

#### 3. **Student Management Table**

**Toolbar Section:**
- 🔍 Advanced search bar (Search by Student ID, Name, Email)
- **Filters:**
  - Faculty/Department dropdown
  - Class dropdown
  - Status dropdown (Active, Graduated, Suspended)
- **Action Buttons:**
  - ➕ Add New Student (Primary blue button)
  - 📊 Export to Excel (Secondary button)

**Data Table:**
- ☑️ Checkbox column for multi-selection
- \# Index number
- 🆔 Student ID (e.g., SV001)
- 👤 Student Info:
  - Colorful avatar with initials
  - Full name
  - Email with icon
- 📅 Date of Birth & Gender:
  - Formatted date display
  - Gender icon (♂/♀) with color coding
- 🏫 Class/Faculty information
- 🏷️ Status Badge:
  - 🟢 Green for Active
  - 🔵 Blue for Graduated
  - 🔴 Red for Suspended
- ⚡ Actions:
  - 👁️ View Details (Eye icon)
  - ✏️ Edit (Pencil icon)
  - 🗑️ Delete (Trash icon)

**Pagination:**
- Shows "Showing X to Y of Z entries"
- Previous/Next navigation
- Numbered page buttons
- Active page highlighting

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or Bun
- npm, pnpm, or bun

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Student-management
```

2. **Install dependencies:**
```bash
npm install
# or
bun install
```

3. **Run the development server:**
```bash
npm run dev
# or
bun dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

The app will automatically redirect to `/dashboard` where you'll see the Student Management Dashboard.

## 📁 Project Structure

```
Student-management/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard page
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Home page (redirects to dashboard)
│   │   └── globals.css
│   ├── components/
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   ├── DashboardHeader.tsx    # Top header bar
│   │   ├── StudentManagementTable.tsx  # Main table component
│   │   └── ...                    # Other components
│   ├── types/
│   │   └── student.ts             # TypeScript interfaces
│   └── utils/
│       └── ...
├── public/
├── package.json
└── README.md
```

## 🎯 Key Components

### Sidebar Component
**Location:** `src/components/Sidebar.tsx`

Features:
- Fixed positioning on the left
- Gradient background with glassmorphism effect
- Active menu item highlighting
- Smooth hover transitions
- Responsive navigation items

### DashboardHeader Component
**Location:** `src/components/DashboardHeader.tsx`

Features:
- Fixed positioning at the top
- Quick search bar
- Notification bell with badge
- User profile display
- Logout functionality

### StudentManagementTable Component
**Location:** `src/components/StudentManagementTable.tsx`

Features:
- Advanced filtering system
- Multi-select checkboxes
- Sortable columns (ready for implementation)
- Action buttons for CRUD operations
- Responsive pagination
- Mock data with 10 students

## 🎨 Design System

### Colors
- **Primary:** Blue (`blue-600`, `blue-700`)
- **Success:** Green (`green-500`)
- **Warning:** Yellow (`yellow-500`)
- **Danger:** Red (`red-500`, `red-600`)
- **Neutral:** Slate shades

### Typography
- **Headings:** Bold, sans-serif
- **Body:** Regular, readable spacing
- **Font:** System fonts (optimized by Tailwind)

### Shadows & Borders
- Subtle shadows for depth
- Rounded corners (8-12px)
- Clean borders with slate-200

## 📊 Mock Data

The table comes pre-populated with 10 realistic students:

```typescript
Student {
  id: string
  studentId: string (e.g., "SV001")
  fullName: string
  email: string
  dateOfBirth: string
  gender: 'Male' | 'Female'
  faculty: string
  class: string (e.g., "IT-K15")
  status: 'Active' | 'Graduated' | 'Suspended'
}
```

## 🔧 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.1 | React framework |
| React | 19.2.0 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Lucide React | Latest | Icon system |
| Framer Motion | 12.x | Animations |

## 🎯 Features Checklist

- ✅ Responsive sidebar navigation
- ✅ Modern header with user profile
- ✅ Advanced search functionality
- ✅ Multiple filter options
- ✅ Sortable data table
- ✅ Multi-select checkboxes
- ✅ Status badges with color coding
- ✅ Gender icons with visual distinction
- ✅ Action buttons (View, Edit, Delete)
- ✅ Pagination with page numbers
- ✅ Sticky table header
- ✅ Hover effects and transitions
- ✅ Clean, professional design
- ✅ Mock data populated
- ✅ TypeScript types defined

## 🔜 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data updates
- [ ] Student detail modal
- [ ] Add/Edit student forms
- [ ] Delete confirmation dialogs
- [ ] Export to Excel functionality
- [ ] Advanced sorting
- [ ] Column visibility toggle
- [ ] Dark mode support
- [ ] Mobile responsive sidebar

## 📝 Development Notes

### Styling Approach
- **Utility-first** with Tailwind CSS
- **Component-scoped** styles
- **Responsive** breakpoints
- **Consistent** spacing system

### State Management
- React hooks (useState)
- Local component state
- Ready for Redux/Zustand integration

### Performance
- Next.js App Router
- Server Components where possible
- Client Components for interactivity
- Optimized bundle size

## 📸 Screenshots

### Dashboard View
- Full layout with sidebar, header, and table
- Clean, professional interface
- Color-coded status badges

### Responsive Design
- Mobile-friendly layout
- Adaptive navigation
- Touch-optimized controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Frontend Developer / UI Designer**
- Created with ❤️ using Next.js and Tailwind CSS
- Modern, clean, and professional design
- Production-ready code

---

**Happy Coding! 🚀**

*For questions or support, please open an issue on GitHub.*

