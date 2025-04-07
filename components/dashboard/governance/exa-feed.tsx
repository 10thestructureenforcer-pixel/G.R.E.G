"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  text?: string;
  image?: string;
}

const ExaFeed = () => {
  const { data, isLoading } = useQuery<NewsItem[]>({
    queryKey: ["exa-feed"],
    queryFn: async () => {
      const response = await fetch("/api/exa-feed");
      if (!response.ok) {
        throw new Error("Failed to fetch news data");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((item: NewsItem) => (
        <Card
          key={item.id}
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            {item.image && (
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title || "Exa Feed Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription>
                {item.publishedDate
                  ? format(new Date(item.publishedDate), "MMM d, yyyy")
                  : "No date"}{" "}
                • {item.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.text}
              </p>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Read more →
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ExaFeed;
