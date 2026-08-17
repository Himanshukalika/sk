export interface Course {
  id: string;
  slug: string;
  title: string;
  hindiTitle: string;
  category: 'fireman' | 'fire-guard' | 'operator' | 'diploma' | 'physical' | 'special';
  badge?: string;
  duration: string;
  eligibility: string;
  batchTiming: string;
  mode: 'Offline + Ground' | 'Offline' | 'Online + Ground' | 'Physical Only';
  fees?: string;
  shortDescription: string;
  description: string;
  keyFeatures: string[];
  syllabus: {
    title: string;
    topics: string[];
  }[];
  physicalRequirements?: {
    height: string;
    chest: string;
    running: string;
    weightLift?: string;
    ropeClimb?: string;
    longJump?: string;
  };
  upcomingBatchDate: string;
  totalSeats: number;
  availableSeats: number;
}

export interface AdmissionLead {
  id: string;
  fullName: string;
  fatherName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  qualification: string;
  address: string;
  state: string;
  city: string;
  selectedCourse?: string;
  hostelRequired: 'Yes' | 'No';
  marksheet10thUrl?: string;
  marksheet12thUrl?: string;
  aadharUrl?: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Rejected';
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Replied' | 'Archived';
}

export interface RecruitmentNotice {
  id: string;
  title: string;
  department: string;
  state: string;
  totalPosts: number;
  eligibility: string;
  ageLimit: string;
  salary: string;
  applicationStartDate: string;
  lastDate: string;
  status: 'Active' | 'Upcoming' | 'Closed';
  notificationUrl?: string;
  applyUrl?: string;
  brief: string;
  keyDates: {
    event: string;
    date: string;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  hindiTitle?: string;
  excerpt: string;
  content: string;
  category: 'Guide' | 'Exam Pattern' | 'Physical' | 'Salary' | 'Syllabus' | 'Results';
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  selectedIn: string;
  batchYear: string;
  feedback: string;
  rating: number;
  photoUrl?: string;
  videoUrl?: string;
  rollNo?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'govt_selection' | 'private_selection' | 'ground' | 'classroom' | 'drills' | 'celebration' | 'hostel' | string;
  section?: 'govt' | 'private' | 'training';
  imageUrl: string;
  description?: string;
  candidateName?: string;
  postOrCompany?: string;
  date?: string;
}
