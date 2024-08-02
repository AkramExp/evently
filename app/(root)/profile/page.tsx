"use client";

import React, { useEffect, useState } from "react";
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
import { ProfileValidation } from "@/lib/validation";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCurrentUser, updateUser } from "@/lib/services/user";
import { ProfileUploader } from "@/components/shared/ProfileUploader";

const ProfileForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    photo: "",
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      photo: user?.photo || "",
    });

    console.log(user.photo);
  }, [user]);

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setUser(response);
      })
      .catch((error) => toast(error.message));
  }, []);

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      photo: user?.photo || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    try {
      console.log(values);

      let uploadedImgUrl = values.photo;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);

        if (!uploadedImages) {
          return;
        }

        uploadedImgUrl = uploadedImages[0].url;
      }

      const data = {
        name: values.name,
        username: values.username,
        email: values.email,
        photo: uploadedImgUrl,
      };

      updateUser(data)
        .then((response) => toast(response.message))
        .catch((error) => toast(error.message));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 sm:w-[70%] lg:w-[50%] mx-auto my-10 bg-dotted-pattern p-5"
      >
        <h3 className="h3-bold text-center mb-4">Update Profile</h3>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input
                  disabled
                  placeholder="Your Username"
                  {...field}
                  className="profile-input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  {...field}
                  className="profile-input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled
                  placeholder="Your Email"
                  {...field}
                  className="profile-input"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem className="w-full">
              {/* <FormLabel className="text-lg">Avatar</FormLabel> */}
              <FormControl className="h-10">
                <ProfileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="buttonn col-span-2 w-full disabled:cursor-not-allowed"
        >
          {form.formState.isSubmitting ? "Updating" : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
