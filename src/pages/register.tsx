import React, { useState } from "react";
import { Link } from "react-router-dom"; // Adjust if using Next.js or other router
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form refresh
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create your account by filling out the information below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        {/* Full Name Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" required />
                        </div>
                        {/* Email Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Password Field */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Create a strong password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <Button type="submit" className="w-full">
                            Register
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign Up with GitHub
                        </Button>
                    </form>
                    {/* Footer with Link to Login */}
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default RegisterPage;
