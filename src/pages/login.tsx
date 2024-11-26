/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
  }
  return (
    <section className="flex justify-center items-center h-screen">

      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input ref={passwordRef} id="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button onClick={handleLoginSubmit} className="w-full"> Sign in</Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{''}
              <Link to={'/auth/register'} className="underline">
                Sign in
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};


export default LoginForm;
