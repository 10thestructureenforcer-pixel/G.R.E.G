import { Card } from "@/components/ui/card";
import { Users, FileText, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Active Users",
    value: "500+",
    description: "Immigration attorneys",
    icon: Users,
  },
  {
    title: "Cases Processed",
    value: "10,000+",
    description: "Successful outcomes",
    icon: FileText,
  },
  {
    title: "Time Saved",
    value: "50%",
    description: "Average time reduction",
    icon: Clock,
  },
  {
    title: "Success Rate",
    value: "85%",
    description: "Higher than industry average",
    icon: TrendingUp,
  },
];

const Statistics = () => {
  return (
    <section className="py-24 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="p-6 bg-background/60 backdrop-blur-sm border-border/40"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <stat.icon className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
