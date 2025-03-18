import React, { useEffect, useState } from "react";
import FeedbackCard from "./feedback-card";
import { useFeedback } from "@/hooks/useFeedback";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import ShowFeedback from "./show-feedback";

const FeedbackPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { feedbackState, fetchFeedbacks } = useFeedback();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await fetchFeedbacks();
      } catch (err) {
        setError("Failed to fetch feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleFeedbackClick = (feedbackId: string) => {
    setSelectedFeedbackId(feedbackId);
    setIsDialogOpen(true);
  };

  if (loading && feedbackState.feedbacks.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (feedbackState.feedbacks.length === 0)
    return <p>No feedback available.</p>;

  return (
    <>
      <ResponsiveDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Feedback Details"
        className="sm:max-w-screen-md"
      >
        <ShowFeedback
          setIsOpen={setIsDialogOpen}
          selectedFeedbackId={selectedFeedbackId}
        />
      </ResponsiveDialog>

      <div>
        <h1 className="text-2xl font-bold">Feedback</h1>
        <p>Welcome to Feedback!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-4">
        {feedbackState.feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            {...feedback}
            onClick={handleFeedbackClick}
          />
        ))}
      </div>
    </>
  );
};

export default FeedbackPage;
