import { createApplication } from "@/src/services/application/createApplication";
import { ApplicationData } from "@/src/types/models/application/ApplicationData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, ApplicationData>({
    mutationFn: createApplication,
    onSuccess: (_applicationId, application) => {
      queryClient.setQueryData(["myApplicationExist"], { isExist: true });
      queryClient.setQueryData(["isApplicationExist"], true);
      queryClient.setQueryData(["myApplication"], {
        name: application.name,
        gender:
          application.gender === "여"
            ? "FEMALE"
            : application.gender === "남"
              ? "MALE"
              : "NONE",
        phoneNumber: application.phoneNumber,
        birthDate: application.birthDate,
        availableStartDate: application.availableStartDate,
        availableDayOfWeek: application.availableDayOfWeek,
        introduction: application.selfIntroduction,
        mbti: application.mbti,
        instagramId: application.instagramId,
        styles: application.style,
        imageUrl: application.imageUrl,
      });
      queryClient.setQueryData<
        | {
            name: string;
            imageUrl: string;
            isOwner: boolean;
            inReview: boolean;
            isAdmin: boolean;
            certificateStatus: string | null;
          }
        | undefined
      >(["myInfomation"], (currentProfile) =>
        currentProfile
          ? {
              ...currentProfile,
              name: application.name,
              imageUrl: application.imageUrl,
            }
          : currentProfile,
      );

      void queryClient.invalidateQueries({ queryKey: ["myApplication"] });
      void queryClient.invalidateQueries({ queryKey: ["myApplicationExist"] });
      void queryClient.invalidateQueries({ queryKey: ["isApplicationExist"] });
      void queryClient.invalidateQueries({ queryKey: ["myInfomation"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
};
