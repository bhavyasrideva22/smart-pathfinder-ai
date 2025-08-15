import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Brain,
  Zap,
  Target,
  BookOpen,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('assessmentResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { icon: CheckCircle, color: "bg-success/10 text-success border-success/20", text: "Excellent" };
    if (score >= 60) return { icon: AlertTriangle, color: "bg-warning/10 text-warning border-warning/20", text: "Good" };
    return { icon: XCircle, color: "bg-destructive/10 text-destructive border-destructive/20", text: "Needs Work" };
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case "Strong Match": return "gradient-success";
      case "Good Potential": return "gradient-primary";
      default: return "gradient-accent";
    }
  };

  const careerRoles = [
    "Smart City Infrastructure Specialist",
    "Urban IoT Systems Engineer",
    "Digital Twin Analyst",
    "Sustainable Urban Planner",
    "Smart Mobility Expert"
  ];

  const learningPath = [
    { 
      level: "Beginner",
      courses: [
        "Intro to Smart Cities (Coursera/EdX)",
        "What is IoT? Basics of connectivity and sensors",
        "Urban Planning 101"
      ]
    },
    {
      level: "Intermediate", 
      courses: [
        "Smart Mobility, Energy & Waste Management Systems",
        "Understanding Urban Data Pipelines",
        "Working with Smart Infrastructure APIs"
      ]
    },
    {
      level: "Advanced",
      courses: [
        "Digital Twins and GIS systems",
        "Cybersecurity in Urban Networks", 
        "Public-Private Partnerships for Smart Cities"
      ]
    }
  ];

  const alternatives = [
    { role: "Environmental Data Analyst", reason: "More data-driven focus" },
    { role: "Urban UX Designer", reason: "Creative problem solving approach" },
    { role: "Civil Engineering Technologist", reason: "Hands-on with physical systems" },
    { role: "Smart Grid Technician", reason: "Energy systems specialization" }
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
              <p className="text-muted-foreground">Smart City Infrastructure Specialist Readiness</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Result */}
        <Card className={`mb-8 ${getRecommendationColor()} text-white shadow-glow`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl mb-2">
              Overall Score: {results.overallScore}%
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Recommendation: <strong>{results.recommendation}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Progress value={results.overallScore} className="max-w-md mx-auto mb-4 h-3" />
            <p className="text-white/80">
              {results.recommendation === "Strong Match" && "You show excellent alignment with smart city infrastructure roles!"}
              {results.recommendation === "Good Potential" && "You have good potential with some areas to develop."}
              {results.recommendation === "Consider Alternatives" && "Consider exploring related fields that might be a better fit."}
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Detailed Scores */}
            <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Detailed Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Psychometric Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-medium">Psychometric Fit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(results.psychometricScore)}`}>
                        {results.psychometricScore}%
                      </span>
                      <Badge className={getScoreBadge(results.psychometricScore).color}>
                        {getScoreBadge(results.psychometricScore).text}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={results.psychometricScore} className="h-2" />
                </div>

                {/* Technical Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Technical Readiness</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(results.technicalScore)}`}>
                        {results.technicalScore}%
                      </span>
                      <Badge className={getScoreBadge(results.technicalScore).color}>
                        {getScoreBadge(results.technicalScore).text}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={results.technicalScore} className="h-2" />
                </div>

                {/* WISCAR Breakdown */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-accent" />
                    WISCAR™ Framework
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {Object.entries(results.wiscarScores).map(([key, score]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="capitalize">{key === 'realWorld' ? 'Real World' : key}:</span>
                        <span className={`font-medium ${getScoreColor(score)}`}>{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Roles */}
            <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recommended Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {careerRoles.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Path */}
            <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recommended Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningPath.map((level, index) => (
                  <div key={index}>
                    <h4 className="font-medium mb-2 text-primary">{level.level}</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {level.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alternatives */}
            {results.recommendation === "Consider Alternatives" && (
              <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Alternative Career Paths
                  </CardTitle>
                  <CardDescription>
                    These roles might be a better fit based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alternatives.map((alt, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/20">
                      <h4 className="font-medium text-sm">{alt.role}</h4>
                      <p className="text-xs text-muted-foreground">{alt.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.recommendation === "Strong Match" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Ready to start your journey:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Enroll in a smart city fundamentals course</li>
                      <li>• Join civic hackathons or smart city projects</li>
                      <li>• Connect with urban tech communities</li>
                    </ul>
                  </div>
                )}
                
                {results.recommendation === "Good Potential" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Build your foundation:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Start with IoT and urban systems basics</li>
                      <li>• Practice with smart city simulation tools</li>
                      <li>• Explore open data projects in your city</li>
                    </ul>
                  </div>
                )}

                <Button className="w-full gradient-primary" onClick={() => navigate('/')}>
                  Retake Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;