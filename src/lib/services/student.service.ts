import { supabase } from "@/lib/supabase/client";

// Student interface matching the component
export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  faculty: string;
  class: string;
  status: "Active" | "Graduated" | "Suspended";
  avatar?: string;
}

// Transform Supabase row to Student interface
const transformStudent = (row: any): Student => {
  return {
    id: row.id,
    studentId: row.student_id,
    fullName: row.full_name,
    email: row.email,
    dateOfBirth: row.date_of_birth || "2002-01-01",
    gender: (row.gender as "Male" | "Female") || "Male",
    faculty: row.faculty || "Information Technology",
    class: row.class || "",
    status: (row.status as "Active" | "Graduated" | "Suspended") || "Active",
    avatar: row.avatar,
  };
};

// Transform Student interface to Supabase insert format
const transformToSupabase = (student: Omit<Student, "id">) => {
  // Note: avatar column doesn't exist in the database schema
  // Remove avatar field from insert/update operations
  return {
    student_id: student.studentId,
    full_name: student.fullName,
    email: student.email,
    date_of_birth: student.dateOfBirth,
    gender: student.gender,
    faculty: student.faculty,
    class: student.class,
    status: student.status,
    // avatar field removed - column doesn't exist in database schema
  };
};

// Get all students
// Optional: filter by date range (only show students created after a certain date)
export async function getStudents(options?: {
  startDate?: string; // ISO date string (e.g., "2024-01-01")
  endDate?: string; // ISO date string (e.g., "2024-12-31")
}): Promise<Student[]> {
  try {
    let query = supabase.from("students").select("*");

    // Apply date filters if provided
    if (options?.startDate) {
      query = query.gte("created_at", options.startDate);
    }
    if (options?.endDate) {
      query = query.lte("created_at", options.endDate);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      // Properly extract error information for logging
      const errorDetails = {
        code: error.code || "UNKNOWN",
        message: error.message || "Unknown error occurred",
        details: error.details || null,
        hint: error.hint || null,
      };
      console.error(
        "Error fetching students:",
        JSON.stringify(errorDetails, null, 2)
      );
      console.error("Full Supabase error object:", error);

      // Create a proper Error object with all details
      const errorMessage =
        error.message || error.hint || "Failed to fetch students";
      const errorObj = new Error(errorMessage);
      (errorObj as any).code = error.code;
      (errorObj as any).details = error.details;
      (errorObj as any).hint = error.hint;
      throw errorObj;
    }

    return (data || []).map(transformStudent);
  } catch (error: any) {
    // Enhanced error logging - extract all possible properties
    const errorInfo: any = {
      message: error?.message || error?.toString() || "Unknown error",
      code: error?.code || "UNKNOWN",
      details: error?.details || null,
      hint: error?.hint || null,
    };

    // Log with JSON stringify to see all properties
    try {
      console.error(
        "Error in getStudents:",
        JSON.stringify(errorInfo, null, 2)
      );
      console.error("Full error object:", error);
    } catch (e) {
      // Fallback if JSON.stringify fails
      console.error("Error in getStudents:", {
        message: errorInfo.message,
        code: errorInfo.code,
        type: typeof error,
        constructor: error?.constructor?.name,
      });
    }

    // Re-throw the error (it should already be enhanced if from Supabase)
    throw error;
  }
}

// Get a single student by ID
export async function getStudentById(id: string): Promise<Student | null> {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching student:", error);
      return null;
    }

    return data ? transformStudent(data) : null;
  } catch (error) {
    console.error("Error in getStudentById:", error);
    return null;
  }
}

// Add a new student
export async function addStudent(
  student: Omit<Student, "id">
): Promise<Student> {
  try {
    // Generate UUID v4 for the id field
    // The database expects a UUID type, not a timestamp string
    const generateUUID = (): string => {
      // Use native crypto.randomUUID() if available (modern browsers and Node.js 14.17.0+)
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback: Generate UUID v4 manually
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    };

    const id = generateUUID();

    const { data, error } = await supabase
      .from("students")
      .insert({
        id,
        ...transformToSupabase(student),
      })
      .select()
      .single();

    if (error) {
      // Properly extract error information for logging
      const errorDetails = {
        code: error.code || "UNKNOWN",
        message: error.message || "Unknown error occurred",
        details: error.details || null,
        hint: error.hint || null,
      };
      console.error(
        "Error adding student:",
        JSON.stringify(errorDetails, null, 2)
      );
      console.error("Full Supabase error object:", error);

      // Create a proper Error object with all details
      const errorMessage =
        error.message || error.hint || "Failed to add student";
      const errorObj = new Error(errorMessage);
      (errorObj as any).code = error.code;
      (errorObj as any).details = error.details;
      (errorObj as any).hint = error.hint;
      throw errorObj;
    }

    if (!data) {
      throw new Error("No data returned after insert");
    }

    return transformStudent(data);
  } catch (error: any) {
    // Enhanced error logging - extract all possible properties
    const errorInfo: any = {
      message: error?.message || error?.toString() || "Unknown error",
      code: error?.code || "UNKNOWN",
      details: error?.details || null,
      hint: error?.hint || null,
    };

    // Log with JSON stringify to see all properties
    try {
      console.error("Error in addStudent:", JSON.stringify(errorInfo, null, 2));
      console.error("Full error object:", error);
    } catch (e) {
      // Fallback if JSON.stringify fails
      console.error("Error in addStudent:", {
        message: errorInfo.message,
        code: errorInfo.code,
        type: typeof error,
        constructor: error?.constructor?.name,
      });
    }

    // Re-throw the error (it should already be enhanced if from Supabase)
    throw error;
  }
}

// Update a student
export async function updateStudent(
  id: string,
  student: Partial<Omit<Student, "id">>
): Promise<Student> {
  try {
    const updateData: any = {};

    if (student.studentId) updateData.student_id = student.studentId;
    if (student.fullName) updateData.full_name = student.fullName;
    if (student.email) updateData.email = student.email;
    if (student.dateOfBirth) updateData.date_of_birth = student.dateOfBirth;
    if (student.gender) updateData.gender = student.gender;
    if (student.faculty) updateData.faculty = student.faculty;
    if (student.class) updateData.class = student.class;
    if (student.status) updateData.status = student.status;
    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("students")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating student:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No data returned after update");
    }

    return transformStudent(data);
  } catch (error) {
    console.error("Error in updateStudent:", error);
    throw error;
  }
}

// Delete a student
export async function deleteStudent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("students").delete().eq("id", id);

    if (error) {
      console.error("Error deleting student:", error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw error;
  }
}

// Search students
export async function searchStudents(query: string): Promise<Student[]> {
  try {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(
        `full_name.ilike.%${query}%,student_id.ilike.%${query}%,email.ilike.%${query}%`
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error searching students:", error);
      throw error;
    }

    return (data || []).map(transformStudent);
  } catch (error) {
    console.error("Error in searchStudents:", error);
    throw error;
  }
}
