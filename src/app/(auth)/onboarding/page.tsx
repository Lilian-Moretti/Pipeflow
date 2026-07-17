"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

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
import { slugify, validateWorkspaceName } from "@/lib/validation/auth";

export default function OnboardingPage() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextError = validateWorkspaceName(workspaceName);
    setError(nextError);

    if (nextError) return;

    setIsLoading(true);
    setTimeout(() => {
      const slug = slugify(workspaceName);
      router.push(`/${slug}/dashboard`);
    }, 800);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Crie seu workspace</CardTitle>
        <CardDescription>
          Dê um nome para a empresa ou time que vai usar o PipeFlow CRM.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="workspaceName">Nome do workspace</Label>
            <Input
              id="workspaceName"
              placeholder="Acme Vendas"
              value={workspaceName}
              onChange={(event) => setWorkspaceName(event.target.value)}
              disabled={isLoading}
              aria-invalid={Boolean(error)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Continuar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
