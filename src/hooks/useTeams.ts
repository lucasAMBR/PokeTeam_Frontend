import { api } from "@/lib/axios";
import { Team } from "@/types/team";
import { useQuery } from "@tanstack/react-query";

export function useTeams() {
    return useQuery<Team[]>({
        queryKey: ["teams"],
        queryFn: async () => {
            const response = await api.get<Team[]>("/teams");
            return response.data;
        },
    });
}