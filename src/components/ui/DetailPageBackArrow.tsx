import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Share } from "react-native";

import ShareArrow from "@/public/svgs/StepDetail/shareArrow.svg";

import Flex from "../layout/Flex";
import BackArrorHeader from "./BackArrowHeader";

interface DetailPageBackArrowProps {
  content: string;
  shareTitle: string;
  shareMessage: string;
  onBack?: () => void;
  isWished?: boolean;
  onWishToggle?: () => void;
}

export default function DetailPageBackArrow({
  content,
  shareTitle,
  shareMessage,
  onBack,
  isWished,
  onWishToggle,
}: DetailPageBackArrowProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        title: shareTitle,
        message: shareMessage,
      });
    } catch {
      Alert.alert("공유할 수 없어요", "잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <BackArrorHeader
      content={content}
      onPress={onBack}
      icon={
        <Flex items='center' justify='center' dir='row' gap={20}>
          <Pressable onPress={onWishToggle}>
            <Ionicons
              name={isWished ? "heart" : "heart-outline"}
              size={23}
              color={isWished ? "#ef4444" : "#4B5563"}
            />
          </Pressable>
          <Pressable
            accessibilityLabel={shareTitle}
            hitSlop={8}
            onPress={() => void handleShare()}
          >
            <ShareArrow width={20} height={20} />
          </Pressable>
        </Flex>
      }
    />
  );
}
