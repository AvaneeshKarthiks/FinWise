import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react"

// Mock blog detail data
const blogDetails = {
  1: {
    title: "5 Simple Steps to Create Your First Budget",
    content: `
      <p>Creating your first budget can feel overwhelming, but it doesn't have to be. A budget is simply a plan for your money that helps you track income and expenses while working toward your financial goals.</p>
      
      <h2>Why Budgeting Matters</h2>
      <p>Budgeting is the foundation of financial wellness. It helps you understand where your money goes, prevents overspending, and ensures you're saving for the future. Studies show that people who budget regularly are more likely to achieve their financial goals.</p>
      
      <h2>Step 1: Calculate Your Monthly Income</h2>
      <p>Start by determining your total monthly income after taxes. Include your salary, freelance work, side hustles, and any other regular income sources. If your income varies, use the average from the past 3-6 months.</p>
      
      <h2>Step 2: List All Your Expenses</h2>
      <p>Track every expense for at least a month. Categorize them into:</p>
      <ul>
        <li><strong>Fixed expenses:</strong> Rent, insurance, loan payments</li>
        <li><strong>Variable expenses:</strong> Groceries, utilities, gas</li>
        <li><strong>Discretionary expenses:</strong> Entertainment, dining out, hobbies</li>
      </ul>
      
      <h2>Step 3: Choose a Budgeting Method</h2>
      <p>Popular budgeting methods include:</p>
      <ul>
        <li><strong>50/30/20 Rule:</strong> 50% needs, 30% wants, 20% savings</li>
        <li><strong>Zero-based budgeting:</strong> Every dollar has a purpose</li>
        <li><strong>Envelope method:</strong> Cash allocated to specific categories</li>
      </ul>
      
      <h2>Step 4: Set Realistic Goals</h2>
      <p>Start with small, achievable goals like saving $50 per month or reducing dining out by 25%. As you build confidence, you can set more ambitious targets.</p>
      
      <h2>Step 5: Review and Adjust Regularly</h2>
      <p>Your budget should evolve with your life. Review it monthly and make adjustments as needed. Don't be discouraged if you overspend in some categories initially – budgeting is a skill that improves with practice.</p>
      
      <h2>Tools to Help You Succeed</h2>
      <p>Consider using budgeting apps, spreadsheets, or our budget calculator to make tracking easier. The key is finding a system you'll actually use consistently.</p>
      
      <p>Remember, the best budget is one you can stick to. Start simple, be patient with yourself, and celebrate small wins along the way.</p>
    `,
    author: {
      name: "Sarah Johnson",
      bio: "Financial advisor with 10+ years of experience helping individuals achieve financial independence.",
      avatar: "/sarah-johnson-avatar.jpg",
    },
    date: "2024-01-15",
    category: "Budgeting",
    thumbnail: "/budgeting-blog-post-hero.jpg",
    readTime: "5 min read",
    tags: ["budgeting", "personal-finance", "money-management", "financial-planning"],
  },
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = blogDetails[1] // Using mock data for demo

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge className="bg-primary text-primary-foreground">{blog.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime}
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-balance leading-tight text-foreground">{blog.title}</h1>

            {/* Author Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                  <AvatarFallback>
                    {blog.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{blog.author.name}</div>
                  <div className="text-sm text-muted-foreground">{blog.author.bio}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Hero Image */}
            <div className="aspect-video rounded-lg overflow-hidden">
              <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-balance mb-8 text-foreground">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Credit
                </Badge>
                <CardTitle className="text-lg">Understanding Credit Scores: A Complete Guide</CardTitle>
                <CardDescription>
                  Everything you need to know about credit scores and how to improve yours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Michael Chen
                  </div>
                  <span>8 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Savings
                </Badge>
                <CardTitle className="text-lg">Emergency Fund: How Much Do You Really Need?</CardTitle>
                <CardDescription>
                  Discover the right emergency fund size for your situation and how to build it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    Emily Rodriguez
                  </div>
                  <span>6 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-card rounded-lg border border-border text-center">
          <h2 className="text-2xl font-bold text-balance mb-4 text-card-foreground">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-muted-foreground mb-6 text-pretty leading-relaxed">
            Take the next step with our comprehensive courses and practical tools designed to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Courses
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline">Try Our Tools</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
