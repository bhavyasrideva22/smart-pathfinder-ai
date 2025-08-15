import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Brain, Zap, Target } from "lucide-react";

interface Question {
  id: string;
  type: "likert" | "multiple-choice" | "yes-no";
  category: "psychometric" | "technical" | "wiscar";
  section: string;
  question: string;
  options?: string[];
  likertScale?: {
    low: string;
    high: string;
  };
}

const questions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: "psych_1",
    type: "likert",
    category: "psychometric",
    section: "Interest Scale",
    question: "I enjoy thinking about how cities and infrastructure work.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  {
    id: "psych_2",
    type: "likert",
    category: "psychometric",
    section: "Interest Scale",
    question: "I'm interested in how data can improve public services.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  {
    id: "psych_3",
    type: "likert",
    category: "psychometric",
    section: "Interest Scale",
    question: "Sustainable design and future cities fascinate me.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  {
    id: "psych_4",
    type: "likert",
    category: "psychometric",
    section: "Personality Fit",
    question: "I prefer working on long-term projects that require sustained effort.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  {
    id: "psych_5",
    type: "likert",
    category: "psychometric",
    section: "Personality Fit",
    question: "I enjoy collaborating with diverse teams on complex problems.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  {
    id: "psych_6",
    type: "likert",
    category: "psychometric",
    section: "Work Style",
    question: "I thrive when working on open-ended, exploratory projects.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  },
  
  // Technical Section
  {
    id: "tech_1",
    type: "multiple-choice",
    category: "technical",
    section: "IoT Knowledge",
    question: "What is a digital twin in urban planning?",
    options: [
      "A virtual replica of physical city infrastructure for simulation and monitoring",
      "A backup system for city databases",
      "A secondary data center for redundancy",
      "I'm not familiar with this concept"
    ]
  },
  {
    id: "tech_2",
    type: "multiple-choice",
    category: "technical",
    section: "Smart Systems",
    question: "Which of the following is a smart utility system?",
    options: [
      "Traditional water meter reading",
      "Smart grid with real-time energy monitoring",
      "Manual traffic light operation",
      "Paper-based waste collection scheduling"
    ]
  },
  {
    id: "tech_3",
    type: "multiple-choice",
    category: "technical",
    section: "IoT Protocols",
    question: "Which protocol is commonly used in IoT communications?",
    options: [
      "MQTT",
      "HTML",
      "CSS",
      "I'm not sure"
    ]
  },
  {
    id: "tech_4",
    type: "multiple-choice",
    category: "technical",
    section: "Urban Systems",
    question: "How can traffic flow be optimized in smart cities?",
    options: [
      "Using AI to analyze traffic patterns and adjust signals in real-time",
      "Installing more traffic lights",
      "Reducing the number of roads",
      "I don't know"
    ]
  },

  // WISCAR Section
  {
    id: "wiscar_1",
    type: "likert",
    category: "wiscar",
    section: "Will (Persistence)",
    question: "I stick to long-term goals despite obstacles.",
    likertScale: { low: "Never", high: "Always" }
  },
  {
    id: "wiscar_2",
    type: "likert",
    category: "wiscar",
    section: "Interest",
    question: "I find the concept of future cities fascinating.",
    likertScale: { low: "Not at all", high: "Extremely" }
  },
  {
    id: "wiscar_3",
    type: "likert",
    category: "wiscar",
    section: "Ability to Learn",
    question: "I see feedback as an opportunity to improve.",
    likertScale: { low: "Rarely", high: "Always" }
  },
  {
    id: "wiscar_4",
    type: "yes-no",
    category: "wiscar",
    section: "Real-World Alignment",
    question: "Would you enjoy coordinating a smart energy system deployment across multiple city departments?",
    options: ["Yes, that sounds exciting", "No, that seems overwhelming"]
  },
  {
    id: "wiscar_5",
    type: "likert",
    category: "wiscar",
    section: "Cognitive Readiness",
    question: "I enjoy solving complex problems that require considering multiple interconnected systems.",
    likertScale: { low: "Strongly Disagree", high: "Strongly Agree" }
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results and navigate to results page
      const results = calculateResults(answers);
      localStorage.setItem('assessmentResults', JSON.stringify(results));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = (answers: Record<string, string>) => {
    const psychometricQuestions = questions.filter(q => q.category === "psychometric");
    const technicalQuestions = questions.filter(q => q.category === "technical");
    const wiscarQuestions = questions.filter(q => q.category === "wiscar");

    // Simple scoring algorithm
    const psychometricScore = Math.round(
      (psychometricQuestions.reduce((acc, q) => {
        const answer = answers[q.id];
        if (q.type === "likert") {
          return acc + (parseInt(answer) || 3) * 20;
        }
        return acc + 60;
      }, 0) / psychometricQuestions.length)
    );

    const technicalScore = Math.round(
      (technicalQuestions.reduce((acc, q) => {
        const answer = answers[q.id];
        // Award points based on correct/best answers
        if (q.id === "tech_1" && answer?.includes("virtual replica")) return acc + 100;
        if (q.id === "tech_2" && answer?.includes("Smart grid")) return acc + 100;
        if (q.id === "tech_3" && answer === "MQTT") return acc + 100;
        if (q.id === "tech_4" && answer?.includes("AI to analyze")) return acc + 100;
        if (answer?.includes("not") || answer?.includes("don't")) return acc + 20;
        return acc + 60;
      }, 0) / technicalQuestions.length)
    );

    const wiscarScores = {
      will: Math.round((parseInt(answers["wiscar_1"]) || 3) * 20),
      interest: Math.round((parseInt(answers["wiscar_2"]) || 3) * 20),
      skill: technicalScore,
      cognitive: Math.round((parseInt(answers["wiscar_5"]) || 3) * 20),
      ability: Math.round((parseInt(answers["wiscar_3"]) || 3) * 20),
      realWorld: answers["wiscar_4"]?.includes("Yes") ? 85 : 45
    };

    const overallScore = Math.round(
      (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3
    );

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation: overallScore >= 80 ? "Strong Match" : overallScore >= 65 ? "Good Potential" : "Consider Alternatives"
    };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "psychometric": return <Brain className="h-4 w-4" />;
      case "technical": return <Zap className="h-4 w-4" />;
      case "wiscar": return <Target className="h-4 w-4" />;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "psychometric": return "bg-primary/10 text-primary border-primary/20";
      case "technical": return "bg-secondary/10 text-secondary border-secondary/20";
      case "wiscar": return "bg-accent/10 text-accent border-accent/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const isAnswered = answers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
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
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Smart City Infrastructure Assessment</h1>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(question.category)}>
                {getCategoryIcon(question.category)}
                <span className="ml-1">{question.section}</span>
              </Badge>
            </div>
            <CardTitle className="text-xl">
              {question.question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {question.type === "likert" && question.likertScale && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{question.likertScale.low}</span>
                  <span>{question.likertScale.high}</span>
                </div>
                <RadioGroup 
                  value={answers[question.id] || ""} 
                  onValueChange={handleAnswer}
                  className="flex justify-between"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                      <Label htmlFor={`option-${value}`} className="text-xs">
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {(question.type === "multiple-choice" || question.type === "yes-no") && question.options && (
              <RadioGroup value={answers[question.id] || ""} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!isAnswered}
                className="gradient-primary"
              >
                {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;