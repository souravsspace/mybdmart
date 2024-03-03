"use client";

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  type TContactFormValidator,
  ContactFormValidator,
} from "@/types/contact-form-validator";
import { Textarea } from "./ui/textarea";
import { contactFormTopic } from "@/constant";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const form = useForm<TContactFormValidator>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      topic: "",
      message: "",
    },
    resolver: zodResolver(ContactFormValidator),
  });

  const { mutate, isLoading: mutateLoading } =
    api.contactForm.submitForm.useMutation({
      onError: (error) => {
        if (error.data?.code === "BAD_REQUEST") {
          toast.error("All fields are required.");
        }

        toast.error("Something went wrong. Please try again later.");
      },
      onSuccess: () => {
        toast.success("Your message has been sent!");
        form.reset();
      },
    });

  const onSubmit = (data: TContactFormValidator) => {
    mutate(data);
  };

  const isLoading =
    mutateLoading ||
    form.formState.isSubmitting ||
    form.formState.isLoading ||
    form.formState.isValidating;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="grid gap-y-4 sm:gap-y-6 md:grid-cols-2 md:gap-4 md:gap-y-0">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-y-4 sm:gap-y-6 md:grid-cols-2 md:gap-4 md:gap-y-0">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="number"
                    placeholder="Without +"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a topic</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one.." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactFormTopic.map((topic) => (
                    <SelectItem key={topic.value} value={topic.value}>
                      {topic.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help you?</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  rows={8}
                  placeholder="Type your message."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
