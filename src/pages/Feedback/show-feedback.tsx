import React, { useEffect, useState } from "react";
import { useFeedback } from "@/hooks/useFeedback";
import { Feedback } from "@/types/feedback";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import StarRating from "./star-rating";
interface ShowFeedbackProps {
  selectedFeedbackId: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowFeedback: React.FC<ShowFeedbackProps> = ({
  selectedFeedbackId,
  setIsOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { feedbackState } = useFeedback();

  useEffect(() => {
    if (selectedFeedbackId) {
      setLoading(true);
      // Find the selected feedback from the feedbackState
      const selectedFeedback = feedbackState.feedbacks.find(
        (item) => item.id === selectedFeedbackId
      );

      if (selectedFeedback) {
        setFeedback(selectedFeedback);
      }
      setLoading(false);
    }
  }, [selectedFeedbackId, feedbackState.feedbacks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">Feedback not found</p>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-h-[80vh] overflow-hidden flex flex-col">
      <div className="space-y-4 overflow-y-auto flex-grow">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 font-medium">Name:</div>
          <div className="col-span-2">{feedback.name}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 font-medium">Email:</div>
          <div className="col-span-2 break-words">{feedback.email}</div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 font-medium">Rating:</div>
          <div className="col-span-2">
            <StarRating rating={feedback.rating} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 font-medium">Show on Website:</div>
          <div className="col-span-2">
            {feedback.showOnWebsite ? "Yes" : "No"}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="font-medium">Comments:</div>
          <div className="bg-gray-50 dark:bg-muted p-4 rounded-md overflow-y-auto max-h-64 whitespace-pre-wrap break-words">
            {feedback.comments}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2 pt-4 border-t">
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </div>
    </div>
  );
};

export default ShowFeedback;
