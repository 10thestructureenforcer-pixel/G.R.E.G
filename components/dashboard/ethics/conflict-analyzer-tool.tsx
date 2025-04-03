"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import AnalysisResults from "./analysis-results";

const conflictForm = z.object({
  clientName: z.string().min(1, "Client name is required"),
  sponsorCompany: z.string().min(2, "Sponsor company is required"),
  opposingParty: z.string().min(2, "Opposing party is required"),
  A_number: z.string().optional(),
});

type ConflictFormValues = z.infer<typeof conflictForm>;

const ConflictAnalyzerTool = () => {
  const form = useForm<ConflictFormValues>({
    resolver: zodResolver(conflictForm),
    defaultValues: {
      clientName: "",
      sponsorCompany: "",
      opposingParty: "",
      A_number: "",
    },
  });

  const { mutate, data, error, status } = useMutation({
    mutationFn: async (values: ConflictFormValues) => {
      const response = await fetch("/api/conflict-analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to analyze conflicts");
      }
      return response.json();
    },
  });

  const handleAnalyze = () => {
    const values = form.getValues();
    mutate(values);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
            Conflict Analyzer
          </h1>
          <p className="text-sm text-muted-foreground">
            Analyze potential conflicts of interest and ethical considerations
            in your legal cases.
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Case Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter client name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sponsorCompany"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sponsor Company</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter sponsor company"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="opposingParty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opposing Party</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter opposing party"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="A_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>A-Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter A-number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Conflict Checks:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Opposing Party vs Prior Client Names</li>
                    <li>Sponsor Company vs Prior Sponsor Companies</li>
                    <li>Client Name or A-Number vs Existing Client Entries</li>
                  </ul>
                </div>

                <Button
                  type="button"
                  onClick={handleAnalyze}
                  className="flex justify-center"
                  disabled={status === "pending"}
                >
                  {status === "pending" ? "Analyzing..." : "Analyze Conflicts"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {status == "pending" ? (
              <p className="text-sm text-muted-foreground">
                Analyzing conflicts...
              </p>
            ) : error ? (
              <p className="text-sm text-red-500">Error: {error.message}</p>
            ) : data ? (
              <div>
                <AnalysisResults data={data} />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter case details above to analyze potential conflicts.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConflictAnalyzerTool;
