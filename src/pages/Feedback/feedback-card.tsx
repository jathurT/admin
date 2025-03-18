import React from "react";
import { Card } from "@/components/ui/card";
import { Feedback } from "@/types/feedback";
import StarRating from "./star-rating";
import ToggleSwitch from "./feedback-toggle-input";

interface FeedbackCardProps extends Feedback {
  onClick?: (id: string) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  id,
  name,
  rating,
  email,
  comments,
  showOnWebsite,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  // Get only the first part of the email for display
  const displayEmail = email ? email.split("@")[0] + "@..." : "";

  return (
    <Card className="w-full p-4 border rounded-lg shadow-md  hover:shadow-lg transition-shadow ">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex items-center">
          <StarRating rating={rating} />
          <span className="ml-1 text-xs text-gray-500">({rating})</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3 truncate">{displayEmail}</p>

      <div
        onClick={handleClick}
        className="bg-gray-50 dark:bg-muted p-3 rounded-md mb-3 cursor-pointer"
      >
        <p className="text-sm line-clamp-3 text-gray-700 dark:text-gray-300">
          {comments}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-muted-foreground">
        <span className="text-xs text-gray-500">Show on website:</span>
        <ToggleSwitch feedbackID={id} checked={showOnWebsite} />
      </div>
    </Card>
  );
};

export default FeedbackCard;
