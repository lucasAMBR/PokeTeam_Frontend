"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type DeleteTeamInfos = {
    teamId: number;
    teamName: string;
    onConfirm: (id: number) => void;
}


export function DeleteTeamDialog(infos: DeleteTeamInfos) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-600 p-2 m-1 rounded-sm text-white cursor-pointer hover:bg-red-900"><Trash /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza absoluta que gostaria de remover o time {`"${infos.teamName}"`}?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá excluir permanentemente o time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => infos.onConfirm(infos.teamId)}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
