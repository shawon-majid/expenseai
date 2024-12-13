"use client";

import { useState, useMemo } from "react";
import { Edit2, Trash2, X, Check, Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { Expense } from "@/lib/expense/process-expense";
import Link from "next/link";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => Promise<void>;
}

type SortField = "date" | "amount" | "category";
type SortOrder = "asc" | "desc";

const ITEMS_PER_PAGE = 3;

export function ExpenseTable({ expenses, onDelete, onUpdate }: ExpenseTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updateText, setUpdateText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleUpdate = async (id: string) => {
    if (!updateText.trim() || isUpdating) return;

    setIsUpdating(true);
    try {
      await onUpdate(id, updateText);
      setEditingId(null);
      setUpdateText("");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const filteredAndSortedExpenses = useMemo(() => {
    let result = [...expenses];

    // Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (expense) =>
          expense.description.toLowerCase().includes(query) ||
          expense.category.toLowerCase().includes(query) ||
          expense.amount.toString().includes(query) ||
          expense.date.includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "date":
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [expenses, searchQuery, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedExpenses.length / ITEMS_PER_PAGE);
  const paginatedExpenses = filteredAndSortedExpenses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Expenses</h2>
          <Link href="/analytics" className="relative inline-flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 group">
            <span className="absolute -inset-px bg-gradient-to-r from-[rgba(255,255,255,0.2)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
            Chat with your data
          </Link>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="w-full rounded-md border border-input bg-background px-4 pl-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-y bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">
                <button
                  onClick={() => handleSort("amount")}
                  className="inline-flex items-center gap-1 hover:text-primary"
                >
                  Amount
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button
                  onClick={() => handleSort("category")}
                  className="inline-flex items-center gap-1 hover:text-primary"
                >
                  Category
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">
                <button
                  onClick={() => handleSort("date")}
                  className="inline-flex items-center gap-1 hover:text-primary"
                >
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-muted/50">
                <td className="px-4 py-3">
                  {editingId === expense.id ? (
                    <input
                      type="text"
                      value={updateText}
                      onChange={(e) => setUpdateText(e.target.value)}
                      placeholder="Enter update in natural language"
                      className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                      disabled={isUpdating}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td className="px-4 py-3">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-3">{expense.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {editingId === expense.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(expense.id)}
                          disabled={isUpdating}
                          className="rounded-md p-1 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setUpdateText("");
                          }}
                          disabled={isUpdating}
                          className="rounded-md p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(expense.id);
                            setUpdateText("");
                          }}
                          className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(expense.id)}
                          className="rounded-md p-1 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filteredAndSortedExpenses.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  {searchQuery ? "No matching expenses found" : "No expenses yet. Add one using natural language above!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedExpenses.length)} of {filteredAndSortedExpenses.length} expenses
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
