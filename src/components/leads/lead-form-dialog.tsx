"use client";

import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type { MockMember } from "@/lib/mock-data";
import {
  validateLeadCompany,
  validateLeadEmail,
  validateLeadName,
} from "@/lib/validation/lead";
import type { Lead, LeadStatus } from "@/types/lead";

import { leadStatusLabels, leadStatusOrder } from "./lead-status";

export interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: LeadStatus;
  ownerId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

const emptyValues: LeadFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  status: "novo",
  ownerId: "",
};

export function LeadFormDialog({
  open,
  onOpenChange,
  lead,
  members,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  members: MockMember[];
  onSubmit: (values: LeadFormValues) => void;
}) {
  const [values, setValues] = useState<LeadFormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setValues(
      lead
        ? {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            jobTitle: lead.jobTitle,
            status: lead.status,
            ownerId: lead.ownerId,
          }
        : { ...emptyValues, ownerId: members[0]?.id ?? "" },
    );
  }, [open, lead, members]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {
      name: validateLeadName(values.name),
      email: validateLeadEmail(values.email),
      company: validateLeadCompany(values.company),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{lead ? "Editar lead" : "Novo lead"}</DialogTitle>
          <DialogDescription>
            {lead
              ? "Atualize as informações do lead."
              : "Preencha os dados para cadastrar um novo lead."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lead-name">Nome</Label>
            <Input
              id="lead-name"
              placeholder="Nome do lead"
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-email">E-mail</Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="nome@empresa.com"
                value={values.email}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-phone">Telefone</Label>
              <Input
                id="lead-phone"
                placeholder="(00) 00000-0000"
                value={values.phone}
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, phone: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-company">Empresa</Label>
              <Input
                id="lead-company"
                placeholder="Nome da empresa"
                value={values.company}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    company: event.target.value,
                  }))
                }
                aria-invalid={Boolean(errors.company)}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-job-title">Cargo</Label>
              <Input
                id="lead-job-title"
                placeholder="Cargo do lead"
                value={values.jobTitle}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    jobTitle: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-status">Status</Label>
              <Select
                id="lead-status"
                value={values.status}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    status: event.target.value as LeadStatus,
                  }))
                }
              >
                {leadStatusOrder.map((status) => (
                  <option key={status} value={status}>
                    {leadStatusLabels[status]}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lead-owner">Responsável</Label>
              <Select
                id="lead-owner"
                value={values.ownerId}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    ownerId: event.target.value,
                  }))
                }
              >
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {lead ? "Salvar alterações" : "Cadastrar lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
