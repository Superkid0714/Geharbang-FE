import { stepApply } from "@/src/services/stepApply/stepApply";
import { Answer } from "@/src/types/models/stepApply";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useStepApply(recruitmentId: number) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Answer[]>({
    mutationFn: (answers) => stepApply(recruitmentId, answers),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["myApplicationStatus"] });
      void queryClient.invalidateQueries({
        queryKey: ["applicationList", String(recruitmentId)],
      });
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
}
