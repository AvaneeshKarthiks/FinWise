import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CourseEnrollment } from "@/components/course-enrollment"
import { Clock, Users, Star, Play, CheckCircle, BookOpen } from "lucide-react"

// Mock course detail data
const courseDetails = {
  1: {
    title: "Personal Finance Fundamentals",
    description:
      "Learn the basics of budgeting, saving, and managing your personal finances effectively. This comprehensive course covers everything you need to know to take control of your money.",
    thumbnail: "/personal-finance-course-hero-image.jpg",
    duration: "4 weeks",
    students: 1250,
    rating: 4.8,
    level: "Beginner",
    category: "Budgeting",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    modules: [
      { title: "Introduction to Personal Finance", duration: "45 min", completed: false },
      { title: "Creating Your First Budget", duration: "60 min", completed: false },
      { title: "Understanding Income and Expenses", duration: "50 min", completed: false },
      { title: "Setting Financial Goals", duration: "40 min", completed: false },
      { title: "Building an Emergency Fund", duration: "55 min", completed: false },
      { title: "Tracking Your Progress", duration: "35 min", completed: false },
    ],
    instructor: "Sarah Johnson",
    instructorBio: "Financial advisor with 10+ years of experience helping individuals achieve financial independence.",
    learningOutcomes: [
      "Create and maintain a personal budget",
      "Track income and expenses effectively",
      "Set and achieve financial goals",
      "Build an emergency fund",
      "Understand different savings strategies",
      "Develop healthy money habits",
    ],
    prerequisites: "No prior financial knowledge required",
    courseContent: `
      <h2>Course Overview</h2>
      <p>This comprehensive course is designed for anyone who wants to take control of their personal finances. Whether you're just starting your financial journey or looking to improve your money management skills, this course provides practical, actionable strategies you can implement immediately.</p>
      
      <h2>What You'll Learn</h2>
      <p>Throughout this 4-week course, you'll master the fundamentals of personal finance through interactive lessons, real-world examples, and practical exercises. Each module builds upon the previous one, ensuring you develop a solid foundation in financial literacy.</p>
      
      <h2>Course Structure</h2>
      <p>The course is structured to accommodate busy schedules, with each module taking approximately 45-60 minutes to complete. You can learn at your own pace and revisit materials as needed.</p>
    `,
  },
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courseDetails[1] // Using mock data for demo

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-primary text-primary-foreground">{course.category}</Badge>
                <Badge variant="secondary">{course.level}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4 text-foreground">{course.title}</h1>

              <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-6">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-accent" />
                  {course.rating} rating
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="mb-8">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <iframe src={course.videoUrl} title={course.title} className="w-full h-full" allowFullScreen />
              </div>
            </div>

            {/* Course Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-balance mb-4 text-foreground">About This Course</h2>
              <div
                className="prose prose-lg max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: course.courseContent }}
              />
            </div>

            {/* Learning Outcomes */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
                <CardDescription>By the end of this course, you'll be able to:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Modules
                </CardTitle>
                <CardDescription>Complete all modules to master personal finance fundamentals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{module.title}</h3>
                          <p className="text-sm text-muted-foreground">{module.duration}</p>
                        </div>
                      </div>
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Play className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course Image */}
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Enrollment Card */}
              <CourseEnrollment courseId={params.id} />

              {/* Course Details */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Prerequisites</h4>
                    <p className="text-sm text-muted-foreground">{course.prerequisites}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Instructor</h4>
                    <p className="text-sm font-medium text-foreground">{course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Course Stats</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Students enrolled:</span>
                        <span className="font-medium">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average rating:</span>
                        <span className="font-medium">{course.rating}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
