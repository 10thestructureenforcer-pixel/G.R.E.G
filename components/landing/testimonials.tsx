import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Immigration Attorney",
    company: "Johnson & Associates",
    image: "/testimonials/sarah.jpg",
    content:
      "G.R.E.G has revolutionized how I handle immigration cases. The AI-powered research and analysis tools have saved me countless hours while improving my success rate.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Senior Partner",
    company: "Chen Legal Group",
    image: "/testimonials/michael.jpg",
    content:
      "The case management features are exceptional. I can track multiple clients, deadlines, and documents all in one place. It's like having an extra paralegal.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Solo Practitioner",
    company: "Rodriguez Law",
    image: "/testimonials/emily.jpg",
    content:
      "As a solo practitioner, G.R.E.G has been a game-changer. The AI assistance helps me compete with larger firms while maintaining high-quality service.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Trusted by Immigration Attorneys
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how G.R.E.G is transforming legal practice for immigration
            attorneys across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="p-6 bg-background/60 backdrop-blur-sm border-border/40"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
