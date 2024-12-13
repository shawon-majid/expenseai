import Link from "next/link";
import Image from "next/image";
import { AuthIllustration } from "@/components/auth/auth-illustration";

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <AuthIllustration />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="Expense AI Logo"
              width={32}
              height={32}
              className="w-8 h-8 text-white"
            />
            <span>Expense AI</span>
          </Link>
        </div>

        <div className="relative z-20 mt-auto flex flex-col gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-xl bg-gradient-to-r from-white/80 to-white bg-clip-text text-transparent">
              Welcome Back!
            </h3>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                <span className="text-white/80">Track expenses effortlessly</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                <span className="text-white/80">Get AI-powered insights</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                <span className="text-white/80">Make smarter financial decisions</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
            <blockquote className="space-y-2">
              <p className="relative text-lg">
                <span className="absolute -left-2 -top-2 text-white/20 text-4xl">&ldquo;</span>
                Since using Expense AI, I've saved over 20% on my monthly expenses. The insights are incredible!
                <span className="absolute -bottom-4 right-0 text-white/20 text-4xl">&rdquo;</span>
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold">
                  AK
                </div>
                <div>
                  <div className="font-semibold">Alex Kim</div>
                  <div className="text-sm text-white/60">Business Owner</div>
                </div>
              </div>
            </blockquote>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/40">
            <div className="h-px flex-1 bg-white/10" />
            Your financial data is secure with us
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <div className="grid gap-6">
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/90">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    autoCorrect="off"
                  />
                </div>

                <Link href={"/dashboard"} passHref>
                  <button className="w-full h-10 flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    Sign In
                  </button>
                </Link>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Image
                src="/google.svg"
                alt="Google"
                width={16}
                height={16}
                className="mr-2 h-4 w-4"
              />
              Google
            </button>
            <p className="px-8 text-center text-sm text-muted-foreground">
              New to Expense AI?{" "}
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
