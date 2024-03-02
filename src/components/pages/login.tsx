// Login page component

import * as React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { loginAPI } from "@/constant/env";
import { useRouter } from "next/router";

//ui
import Layout from "@/components/layout";
import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

//icons
import { AiOutlineLoading } from "react-icons/ai";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  //--- Start Region Login Functionality ---//
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const username = values.username;
    const password = values.password;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${loginAPI}`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: err.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "An error occurred.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  //--- End Region Login Functionality ---//
  return (
    <main>
      <Layout className="flex flex-col w-[400px] p-6 shadow-lg rounded-sm max-sm:w-[350px]">
        <section>
          <Typography variant="h2">Welcome</Typography>
          <Typography variant="p">Sign in to you account</Typography>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-5"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <FormControl>
                      <PasswordInput
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Typography variant="p" className="text-secondary">
                Forgot password?
              </Typography>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </section>
      </Layout>
    </main>
  );
};

export default Login;

const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});
