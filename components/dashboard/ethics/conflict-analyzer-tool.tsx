"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import AnalysisResults from "./analysis-results";
import { ConflictAnalyze } from "@prisma/client";
import { AnalysisData, Conflict, Matches } from "@/lib/types";
import { saveConflictData } from "@/actions/save-conflict-data";
import { getRecentConflicts } from "@/actions/get-recent-conflicts";
import {
  History,
  Loader2,
  User,
  Building2,
  Scale,
  Calendar,
  AlertCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const conflictForm = z.object({
  clientName: z.string().min(1, "Client name is required"),
  sponsorCompany: z.string().min(2, "Sponsor company is required"),
  opposingParty: z.string().min(2, "Opposing party is required"),
  A_number: z.string().optional(),
});

type ConflictFormValues = z.infer<typeof conflictForm>;

const ConflictAnalyzerTool = () => {
  const [showRecentConflicts, setShowRecentConflicts] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<ConflictFormValues>({
    resolver: zodResolver(conflictForm),
    defaultValues: {
      clientName: "",
      sponsorCompany: "",
      opposingParty: "",
      A_number: "",
    },
  });

  const { data: recentConflicts, isLoading: isLoadingConflicts } = useQuery({
    queryKey: ["recent-conflicts"],
    queryFn: async () => {
      const response = await getRecentConflicts();
      if (response.status === "error") {
        throw new Error(response.message);
      }
      return response.data;
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
    onSuccess: async (ans: AnalysisData) => {
      if (ans.conflicts.length > 0) {
        const { type } = ans.conflicts[0];

        const { clientName, sponsorCompany, opposingParty, A_number } =
          form.getValues();

        const conflictData: Matches = {
          A_number: A_number || "",
          clientName,
          sponsorCompany,
          opposingParty,
          type,
        };

        await saveConflictData(conflictData);
        queryClient.invalidateQueries({ queryKey: ["recent-conflicts"] });
      }
    },
  });

  const handleAnalyze = () => {
    const values = form.getValues();
    mutate(values);
  };

  const handleLoadRecentConflict = (conflict: ConflictAnalyze) => {
    form.setValue("clientName", conflict.conflictClientName || "");
    form.setValue("sponsorCompany", conflict.conflictSponsorCompanyName || "");
    form.setValue("opposingParty", conflict.conflictOpposingParty || "");
    form.setValue("A_number", conflict.conflictANumber || "");
    setShowRecentConflicts(false);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          {/* Form Card */}
          <Card className="w-full ">
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
                      <li>
                        Client Name or A-Number vs Existing Client Entries
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAnalyze}
                    className="flex justify-center"
                    disabled={status === "pending"}
                  >
                    {status === "pending"
                      ? "Analyzing..."
                      : "Analyze Conflicts"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Recent Conflicts Card */}
          <Card className="w-full max-w-full">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b px-4 py-3">
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400 text-base sm:text-lg">
                <History className="h-5 w-5" />
                Recent Conflicts
                {recentConflicts && recentConflicts.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                    {recentConflicts.length}
                  </span>
                )}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRecentConflicts(!showRecentConflicts)}
                className="flex items-center gap-2 sm:hidden"
              >
                <History className="h-4 w-4" />
                {showRecentConflicts ? "Hide Recent" : "Show Recent"}
              </Button>
            </CardHeader>

            <CardContent className="p-4">
              {isLoadingConflicts ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-green-600 dark:text-green-400" />
                </div>
              ) : recentConflicts && recentConflicts.length > 0 ? (
                <div className="max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                  <div className="flex flex-col gap-4 w-full">
                    {recentConflicts.map((conflict) => (
                      <div
                        key={conflict.id}
                        onClick={() => handleLoadRecentConflict(conflict)}
                        className={cn(
                          "flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-colors border shadow-sm w-full",
                          conflict.conflictType === "opposingParty"
                            ? "hover:bg-red-100 dark:hover:bg-red-900/30 border-red-300 dark:border-red-800"
                            : "hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border-yellow-300 dark:border-yellow-800"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {conflict.conflictType === "opposingParty" ? (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                          )}
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              conflict.conflictType === "opposingParty"
                                ? "text-red-600 dark:text-red-400"
                                : "text-yellow-600 dark:text-yellow-400"
                            )}
                          >
                            {conflict.conflictType === "opposingParty"
                              ? "Direct Conflict"
                              : "Potential Conflict"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span className="overflow-ellipsis overflow-hidden">
                            {conflict.conflictClientName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground dark:text-gray-400">
                  <History className="h-8 w-8 mb-3" />
                  <p className="text-sm">No recent conflicts found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results Card */}
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
