import { BudgetSummary } from '@/lib/budget/budget-types';
import { budgetStore } from '@/lib/budget/budget-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { BudgetForm } from './budget-form';
import { useState } from 'react';

interface BudgetCardProps {
  budget: BudgetSummary;
  onUpdate?: () => void;
}

export function BudgetCard({ budget, onUpdate }: BudgetCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setIsDeleting(true);
      try {
        await budgetStore.deleteBudget(budget.id);
        onUpdate?.();
      } catch (error) {
        console.error('Failed to delete budget:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    onUpdate?.();
  };

  return (
    <Card>
      <CardHeader className="relative">
        <div className="absolute right-4 top-4 flex gap-2">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit Budget</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Budget</DialogTitle>
              </DialogHeader>
              <BudgetForm 
                onSuccess={handleEditSuccess} 
                initialData={{
                  id: budget.id,
                  amount: budget.amount,
                  category: budget.category,
                  startDate: budget.startDate,
                  endDate: budget.endDate,
                  type: budget.type
                }} 
              />
            </DialogContent>
          </Dialog>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete Budget</span>
          </Button>
        </div>
        <CardTitle>
          {budget.type === 'monthly' ? 'Monthly Budget' : `${budget.category} Budget`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Budget</span>
            <span className="font-medium">${budget.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Spent</span>
            <span className="font-medium">${budget.spent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Remaining</span>
            <span className={`font-medium ${budget.remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${budget.remaining.toFixed(2)}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{budget.progress.toFixed(1)}%</span>
            </div>
            <Progress value={budget.progress} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
