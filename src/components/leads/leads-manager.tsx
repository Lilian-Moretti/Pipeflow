"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MockMember } from "@/lib/mock-data";
import type { Lead, LeadStatus } from "@/types/lead";

import { DeleteLeadDialog } from "./delete-lead-dialog";
import type { LeadFormValues } from "./lead-form-dialog";
import { LeadFormDialog } from "./lead-form-dialog";
import { LeadStatusBadge } from "./lead-status-badge";
import { leadStatusLabels, leadStatusOrder } from "./lead-status";

export function LeadsManager({
  workspaceSlug,
  workspaceId,
  initialLeads,
  members,
}: {
  workspaceSlug: string;
  workspaceId: string;
  initialLeads: Lead[];
  members: MockMember[];
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "todos">(
    "todos",
  );
  const [ownerFilter, setOwnerFilter] = useState<string>("todos");
  const [formOpen, setFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);

  const membersById = useMemo(
    () => new Map(members.map((member) => [member.id, member])),
    [members],
  );

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return leads
      .filter((lead) => {
        const matchesSearch =
          !term ||
          lead.name.toLowerCase().includes(term) ||
          lead.company.toLowerCase().includes(term);
        const matchesStatus =
          statusFilter === "todos" || lead.status === statusFilter;
        const matchesOwner =
          ownerFilter === "todos" || lead.ownerId === ownerFilter;
        return matchesSearch && matchesStatus && matchesOwner;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }, [leads, search, statusFilter, ownerFilter]);

  function openCreateForm() {
    setEditingLead(null);
    setFormOpen(true);
  }

  function openEditForm(lead: Lead) {
    setEditingLead(lead);
    setFormOpen(true);
  }

  function handleSubmit(values: LeadFormValues) {
    if (editingLead) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingLead.id ? { ...lead, ...values } : lead,
        ),
      );
      return;
    }

    const newLead: Lead = {
      ...values,
      id: crypto.randomUUID(),
      workspaceId,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLeads((prev) => [newLead, ...prev]);
  }

  function handleDelete(lead: Lead) {
    setLeads((prev) => prev.filter((item) => item.id !== lead.id));
    setDeletingLead(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">
          Listagem, busca e cadastro de leads.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou empresa"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as LeadStatus | "todos")
            }
            className="sm:w-48"
          >
            <option value="todos">Todos os status</option>
            {leadStatusOrder.map((status) => (
              <option key={status} value={status}>
                {leadStatusLabels[status]}
              </option>
            ))}
          </Select>
          <Select
            value={ownerFilter}
            onChange={(event) => setOwnerFilter(event.target.value)}
            className="sm:w-48"
          >
            <option value="todos">Todos os responsáveis</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </Select>
        </div>
        <Button onClick={openCreateForm}>
          <Plus />
          Novo lead
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  Nenhum lead encontrado.
                </TableCell>
              </TableRow>
            )}
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Link
                    href={`/${workspaceSlug}/leads/${lead.id}`}
                    className="flex flex-col hover:underline"
                  >
                    <span className="font-medium">{lead.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {lead.email}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{lead.company}</span>
                  {lead.jobTitle && (
                    <span className="block text-xs text-muted-foreground">
                      {lead.jobTitle}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="text-sm">
                  {membersById.get(lead.ownerId)?.name ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Editar lead"
                      onClick={() => openEditForm(lead)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Excluir lead"
                      onClick={() => setDeletingLead(lead)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LeadFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        lead={editingLead}
        members={members}
        onSubmit={handleSubmit}
      />

      <DeleteLeadDialog
        lead={deletingLead}
        onOpenChange={(open) => !open && setDeletingLead(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
