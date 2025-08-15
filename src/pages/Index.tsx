import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Zap, Brain, Globe, CheckCircle, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Evaluate your personality fit and cognitive alignment with smart city roles"
    },
    {
      icon: Zap,
      title: "Technical Readiness",
      description: "Assess your knowledge of IoT, urban systems, and data infrastructure"
    },
    {
      icon: BarChart3,
      title: "WISCAR™ Framework",
      description: "Comprehensive evaluation of Will, Interest, Skill, Cognitive ability, and Real-world alignment"
    },
    {
      icon: Globe,
      title: "Personalized Roadmap",
      description: "Get tailored learning paths and career guidance based on your results"
    }
  ];

  const careerRoles = [
    "Smart City Infrastructure Specialist",
    "Urban IoT Systems Engineer", 
    "Digital Twin Analyst",
    "Sustainable Urban Planner",
    "Smart Mobility Expert",
    "Urban Systems Integration Engineer"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            🏙️ Smart City Infrastructure Assessment
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Should I Learn Smart City Infrastructure?
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover if you're ready for a career building the cities of tomorrow. Get a comprehensive assessment of your fit, readiness, and potential in smart city development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="gradient-primary shadow-glow hover:scale-105 transition-smooth px-8 py-6 text-lg font-semibold"
              onClick={handleStartAssessment}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Start Assessment
            </Button>
            <p className="text-muted-foreground text-sm">
              ⏱️ Takes 20-30 minutes • 📊 Instant results
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-smooth shadow-card">
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Explore These Career Paths
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {careerRoles.map((role, index) => (
              <Card key={index} className="bg-card/30 backdrop-blur border-border/50 hover:bg-card/50 transition-smooth">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-5 w-5 text-success mx-auto mb-2" />
                  <p className="font-medium">{role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-card/50 backdrop-blur border-border/50 shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">
                Comprehensive Assessment Framework
              </CardTitle>
              <CardDescription className="text-lg">
                Our assessment evaluates multiple dimensions to give you the most accurate career guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Psychometric Fit</h3>
                  <p className="text-sm text-muted-foreground">Personality traits, interests, and work style preferences</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <h3 className="font-semibold text-secondary mb-2">Technical Readiness</h3>
                  <p className="text-sm text-muted-foreground">Knowledge of IoT, urban systems, and smart technologies</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h3 className="font-semibold text-accent mb-2">Learning Path</h3>
                  <p className="text-sm text-muted-foreground">Personalized recommendations and next steps</p>
                </div>
              </div>
              
              <div className="text-center pt-6">
                <Button 
                  size="lg" 
                  className="gradient-accent shadow-glow hover:scale-105 transition-smooth px-8 py-4"
                  onClick={handleStartAssessment}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Begin Your Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;