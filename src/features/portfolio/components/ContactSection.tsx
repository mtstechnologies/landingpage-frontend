import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SocialLink {
  label: string;
  handle: string;
  href: string;
  icon: typeof Github;
}

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@alexcarvalho",
    href: "https://github.com/alexcarvalho",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "in/alexcarvalho",
    href: "https://www.linkedin.com/in/alexcarvalho",
    icon: Linkedin,
  },
  {
    label: "E-mail",
    handle: "alex@exemplo.dev",
    href: "mailto:alex@exemplo.dev",
    icon: Mail,
  },
];

type FormStatus = "idle" | "submitting" | "success";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    // Simulação em memória — sem chamada de API.
    window.setTimeout(() => {
      setStatus("success");
      (event.target as HTMLFormElement).reset();
      window.setTimeout(() => setStatus("idle"), 4000);
    }, 600);
  }

  return (
    <section id="contato" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contato
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Vamos conversar sobre o seu próximo produto
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground">
            Envie uma mensagem ou me encontre nas redes. Costumo responder em até 48 horas úteis.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma mensagem</CardTitle>
              <CardDescription>
                Conte um pouco sobre o projeto, prazos e expectativas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-5" onSubmit={handleSubmit} noValidate={false}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Nome</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">E-mail</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="voce@empresa.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-subject">Assunto</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Sobre o que vamos falar?"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-message">Mensagem</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Descreva o desafio que você quer resolver."
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-sm text-muted-foreground"
                  >
                    {status === "success"
                      ? "Mensagem enviada! Em breve entro em contato."
                      : "Os campos marcados são obrigatórios."}
                  </p>
                  <Button type="submit" disabled={status === "submitting"} className="gap-2">
                    <Send className="h-4 w-4" />
                    {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid content-start gap-4">
            {socialLinks.map(({ label, handle, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-ring hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <span className="text-sm text-muted-foreground">{handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
