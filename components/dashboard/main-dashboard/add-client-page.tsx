"use client";
import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSubmit } from "@/actions/form-submit";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const clientFormSchema = z.object({
  clientFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  clientLastName: z.string().min(2, "Last name must be at least 2 characters"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().min(5, "Address must be at least 5 characters"),
  clientPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  visaStatus: z.string().min(2, "Visa status must be at least 2 characters"),
  legalConcern: z
    .string()
    .min(10, "Legal concern must be at least 10 characters"),
  A_number: z.string().min(1, "A-Number is required"),
  sponsorCompany: z.string().min(1, "Sponsor Company is required"),
  opposingParty: z.string().min(1, "Opposing Party is required"),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const AddClientPage = () => {
  const router = useRouter();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientFirstName: "",
      clientLastName: "",
      clientEmail: "",
      clientAddress: "",
      clientPhone: "",
      dateOfBirth: "",
      nationality: "",
      visaStatus: "",
      legalConcern: "",
      A_number: "",
      sponsorCompany: "",
      opposingParty: "",
    },
  });

  async function onSubmit(data: ClientFormValues) {
    console.log(data);
    const res = await formSubmit(data);
    if (res.status == "success") {
      toast.success(res.message);
      router.push("/dashboard");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="container mx-auto py-3 px-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-16 p-1 w-10 cursor-pointer border-2"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 -mr-1 " />
        </Button>
        <h1 className="text-2xl font-bold mx-9 text-green-500">
          Add Client Information
        </h1>
      </div>

      <Card className="border border-border shadow-sm">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="clientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                      <FormLabel>A-Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter A-number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter nationality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visaStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visa Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter visa status" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sponsorCompany"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sponsor Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sponsor company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="opposingParty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opposing Party</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter opposing party" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="legalConcern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Concern</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the legal concern"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black cursor-pointer"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddClientPage;
