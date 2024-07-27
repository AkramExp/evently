"use client";

import React from "react";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { SignupSchema } from "@/lib/validation";
import AuthButton from "@/components/shared/AuthButton";
import Link from "next/link";
import { registerUser } from "@/lib/services/user";
import toast from "react-hot-toast";

const Signup = () => {
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupSchema>) {
    registerUser(values)
      .then((response) => {
        toast(response.message);
      })
      .catch((error) => toast(error.message));
  }

  return (
    <section className="bg-white p-8 rounded-md flex flex-col gap-2 shadow-lg">
      <h1 className="text-2xl font-normal">Sign in</h1>
      <p className="text-gray-700">to continue to Evently</p>
      <div className="flex flex-col md:flex-row gap-3 my-3">
        <AuthButton
          icon="/assets/icons/github-icon.svg"
          text="Continue with Github"
        />
        <AuthButton
          icon="/assets/icons/google.svg"
          text="Continue with GitHub"
        />
      </div>
      <p className="text-center text-gray-700">or</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Name</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Username</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Email</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Password</FormLabel>
                <FormControl>
                  <Input {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
      </Form>
      <p className="text-center text-gray-800 text-sm mt-2">
        Already have an account ?{" "}
        <Link href="/sign-in" className="text-blue-800">
          Sign in
        </Link>
      </p>
    </section>
  );
};

export default Signup;
