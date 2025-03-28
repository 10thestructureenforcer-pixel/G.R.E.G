"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import React from "react";
import { formSubmit } from "@/actions/form-submit";
import { useRouter } from "next/navigation";
import ViewClients from "./view-clients";
import toast from "react-hot-toast";

const clientFormSchema = z.object({
  clientFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),
  clientLastName: z.string().min(2, "Last name must be at least 2 characters"),
  clientEmail: z.string().email("Invalid email address"),
  clientAddress: z.string().min(5, "Address must be at least 5 characters"),
  nationality: z.string().min(2, "Nationality must be at least 2 characters"),
  visaStatus: z.string().min(2, "Visa status must be at least 2 characters"),
  legalConcern: z
    .string()
    .min(10, "Legal concern must be at least 10 characters"),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

const ClientInfoButton = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientFirstName: "",
      clientLastName: "",
      clientEmail: "",
      clientAddress: "",
      nationality: "",
      visaStatus: "",
      legalConcern: "",
    },
  });

  async function onSubmit(data: ClientFormValues) {
    console.log(data);
    const res = await formSubmit(data);
    if (res.status == "success") {
      toast.success(res.message);
      setOpen(false);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-2 w-full sm:w-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black transition-colors duration-200 w-full sm:w-auto cursor-pointer">
            Add Client
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 dark:text-black"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ViewClients />
    </div>
  );
};

export default ClientInfoButton;
